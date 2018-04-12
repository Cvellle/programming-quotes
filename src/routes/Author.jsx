import React from 'react'
import {connect} from 'react-redux'

import Quotes from '../components/main/Quotes'
import AuthorBox from '../components/main/AuthorBox'
import translate from '../shared/translate'

const Author = props => {
  const author = props.match.params.name.replace(/_/g, ' ')
  const { language, allQuotes, token, phrase, admin } = props
  const filtered = allQuotes
    .filter(q => q.author === author)
    .filter(quote => quote[language] && quote[language].toLowerCase().includes(phrase.toLowerCase()))

  return (
    <main>
      <h1>{author}</h1>
      <AuthorBox author={author} allImages={props.allImages} />
      {phrase && <small>{translate('SHOWING_RESULTS')} "{phrase}":</small>}
      <Quotes language={language} loaded={allQuotes.length} currentQuotes={filtered} token={token} admin={admin} />
    </main>
  )
}

const mapStateToProps = state => {
  return {
    language: state.language,
    allQuotes : state.allQuotes,
    allImages : state.allImages,
    phrase : state.phrase,
    token : state.token,
    admin : state.admin
  }
}

export default connect(mapStateToProps)(Author)
