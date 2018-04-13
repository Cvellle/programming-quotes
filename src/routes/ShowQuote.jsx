import React from 'react'
import {connect} from 'react-redux'

import ImageQuote from './../components/main/ImageQuote'
import './ShowQuote.css'

const ShowQuote = props => {
  const id = props.match.params.id
  const { allQuotes } = props
  const quote = allQuotes.find(q => q._id === id)
  if (!quote) return null

  return (
    <ImageQuote quote={quote} cssClass="big-quote" />
  )
}

const mapStateToProps = state => {
  return {
    allQuotes : state.allQuotes
  }
}

export default connect(mapStateToProps)(ShowQuote)
