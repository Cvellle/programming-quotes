import React from 'react'
import {connect} from 'react-redux'

import translate from '../shared/translate'
import Quotes from '../components/main/Quotes'

const AllQuotes = ({ language, allQuotes, phrase, token, admin }) => {
  const filtered = allQuotes
    .filter(quote => quote[language] && quote[language].toLowerCase().includes(phrase.toLowerCase()))

  return (
    <main>
      <h1>{translate('PROGRAMMING_QUOTES')}</h1>
      {phrase && <small>{translate('SHOWING_RESULTS')} "{phrase}":</small>}
      <Quotes language={language} loaded={allQuotes.length} currentQuotes={filtered} token={token} admin={admin} />
    </main>
  )
}

const mapStateToProps = state => {
  return {
    language : state.language,
    allQuotes : state.allQuotes,
    phrase : state.phrase,
    token : state.token,
    admin : state.admin
  }
}

export default connect(mapStateToProps)(AllQuotes)
