import React from 'react'
import AuthorImage from './AuthorImage'
import Quote from './Quote'

const ImageQuote = props => (
  <div className="quote-box">
    <AuthorImage author={props.quote.author} />
    <Quote quote={props.quote} cssClass="big-quote" />
  </div>
)

export default ImageQuote
