import React, {Component} from 'react'
import { Switch, Route } from 'react-router-dom'

import {store} from '../state/reducer'
import {setQuotes, setAuthors, setImages, setLanguage, setToken, setAdmin} from '../state/action-creators'
import translate from '../shared/translate'
import {getallImages, checkToken} from '../shared/helpers'
import {API, domain} from '../config/api'
import {LS} from '../config/localstorage'
import Navigation from './header/Navigation'
import Sidebar from './sidebar/Sidebar'
import AllQuotes from '../routes/AllQuotes'
import Author from '../routes/Author'
import EditQuote from '../routes/EditQuote'
import ShowQuote from '../routes/ShowQuote'
import RandomQuote from '../routes/RandomQuote'
import Login from '../routes/Login'
import Profile from '../routes/Profile'
import Auth from '../routes/Auth'
import cachedQuotes from '../data/quotes.json'
import './App.css'

const {dispatch} = store

const setLang = language => {
  dispatch(setLanguage(language))
  translate.setLanguage(language)
}

const setUser = (token, admin = false) => {
  dispatch(setToken(token))
  dispatch(setAdmin(admin))
}

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

  checkToken() {
    const service = localStorage.getItem(LS.service)
    const token = store.getState().token
    checkToken(`${domain}/auth/${service}/${token}`, token, setUser)
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
          <Navigation
            language={store.getState().language}
            setLang={setLang}
            token={store.getState().token}
            admin={store.getState().admin}
          />

          <Switch>
            <Route path='/add-quote' component={EditQuote} />
            <Route path='/edit-quote/:id' component={EditQuote} />
            <Route path='/quote/:id' component={ShowQuote} />
            <Route path='/login' component={Login} />
            <Route path='/profile' component={() => (
              <Profile setUser={setUser} />
            )} />
            <Route path='/auth/:service/:token' render={props => (
              <Auth {...props} setUser={setUser} />
            )} />
            <Route path='/author/:name' component={Author} />
            <Route path='/all-quotes' render={() => <AllQuotes/>} />
            <Route path='/' component={RandomQuote} />
          </Switch>
        </section>

        <Sidebar />
      </div>
    )
  }
}

export default App
