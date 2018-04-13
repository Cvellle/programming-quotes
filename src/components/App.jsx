import React, {Component} from 'react'

import {store} from '../state/reducer'
import {setQuotes, setAuthors, setImages, setUser} from '../state/actions'
import {getallImages, checkToken} from '../shared/helpers'
import {API, domain} from '../config/api'
import {LS} from '../config/localstorage'
import Navigation from './header/Navigation'
import Sidebar from './sidebar/Sidebar'
import Router from './Router'
import cachedQuotes from '../data/quotes.json'
import './App.css'

// TODO: ukinuti bespotrebno prosledjivanje
// proveriti store.subscribe(this.render)
// BUG: profile logout ne re-renderuje

const {dispatch} = store

class App extends Component {
  constructor() {
    super()
    store.subscribe(this.render)
  }

  componentDidMount() {
    this.initState(cachedQuotes)
    this.loadQuotes(API.read)
    if (store.getState().token) this.checkToken()
  }

  setUser(token, admin = false) {
    dispatch(setUser(token, admin))
  }

  checkToken() {
    const service = localStorage.getItem(LS.service)
    const token = store.getState().token
    checkToken(`${domain}/auth/${service}/${token}`, token, this.setUser)
  }

  loadQuotes(url) {
    const http = new XMLHttpRequest()
    http.open('GET', url)
    http.send()
    http.onload = () => {
      const dbQuotes = JSON.parse(http.responseText)
      this.initState(dbQuotes.length ? dbQuotes : cachedQuotes)
    }
    http.onerror = () => this.initState(cachedQuotes)
  }

  initState = allQuotes => {
    const allAuthors = new Set(allQuotes.map(quote => quote.author).sort())
    dispatch(setQuotes(allQuotes))
    dispatch(setAuthors(allAuthors))
    this.getAuthorThumbs(allAuthors)
  }

  getAuthorThumbs(allAuthors) {
    const wikiApiLimit = 50
    const promises = []
    for (let i = 0; i < [...allAuthors].length; i += wikiApiLimit)
      promises.push(getallImages([...allAuthors].slice(i, i + wikiApiLimit)))
    Promise.all(promises).then(data =>
      dispatch(setImages(data.reduce((a, b) => new Map([...a, ...b]))))
    )
  }

  render = () => {
    return (
      <div className="App">
        <section className="right-section">
          <Navigation />
          <Router />
        </section>
        <Sidebar />
      </div>
    )
  }
}

export default App
