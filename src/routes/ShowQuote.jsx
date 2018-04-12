import React from 'react'
import {connect} from 'react-redux'

import ImageQuote from './../components/main/ImageQuote'
import './ShowQuote.css'

const ShowQuote = props => {
  const id = props.match.params.id
  const { language, allQuotes, token, admin } = props
  const quote = allQuotes.find(q => q._id === id)
  if (!quote) return null

  return (
    <ImageQuote quote={quote} allImages= {props.allImages} language={language} token={token} admin={admin} cssClass="big-quote" />
  )
}

const mapStateToProps = state => {
  return {
    language: state.language,
    allQuotes : state.allQuotes,
    allImages : state.allImages,
    token : state.token,
    admin : state.admin
  }
}

export default connect(mapStateToProps)(ShowQuote)
