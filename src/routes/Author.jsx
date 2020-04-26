import React, { Component } from "react";
import Quotes from "../components/main/Quotes";
import AuthorBox from "../components/main/AuthorBox";
import translate from "../shared/translate";

export default class Author extends Component {
  render() {
    const author = this.props.match.params.name.replace(/_/g, " ");
    const { language, allQuotes, token, phrase, admin } = this.props;
    const filtered = allQuotes
      .filter((q) => q.author === author)
      .filter(
        (quote) =>
          quote[language] &&
          quote[language].toLowerCase().includes(phrase.toLowerCase())
      );

    return (
      <main className="spec-author">
        <div>
          <h1>{author}</h1>
          <AuthorBox author={author} allImages={this.props.allImages} />
          {phrase && (
            <small>
              {translate("SHOWING_RESULTS")} "{phrase}":
            </small>
          )}
          <Quotes
            language={language}
            loaded={allQuotes.length}
            currentQuotes={filtered}
            token={token}
            admin={admin}
          />
        </div>
      </main>
    );
  }
}
