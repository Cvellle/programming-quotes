import React, { Component } from "react";
import AuthorImage from "./AuthorImage";
import Quote from "./Quote";

export default class ImageQuote extends Component {
  render() {
    const { quote, language, allImages, token, admin } = this.props;

    return (
      <div className="quote-box">
        <AuthorImage author={quote.author} allImages={allImages} />
        <Quote
          language={language}
          quote={quote}
          token={token}
          admin={admin}
          cssClass="big-quote"
        />
      </div>
    );
  }
}
