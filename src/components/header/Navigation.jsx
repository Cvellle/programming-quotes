import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import Github from './Github'
import translate from '../../shared/translate'
import {setLanguage} from '../../state/actions'
import './Navigation.css'

const Navigation = ({language, setLanguage, token, admin}) => (
  <header>
    <Github repoUrl="https://github.com/skolakoda/programming-quotes" />
    <nav>
      <Link to="/" replace={true}>{translate('DAILY_QUOTE')}</Link>
      <Link to="/all-quotes">{translate('ALL_QUOTES')}</Link>
      {admin && <Link to="/add-quote">{translate('ADD_QUOTE')}</Link>}
      {token
        ? <Link to="/profile">{translate('PROFILE')}</Link>
        : <Link to="/login">{translate('LOGIN')}</Link>
      }
      <div>
        <button
          onClick={() => setLanguage('en')}
          className={language === 'en' ? 'active' : ''}>ENG</button>
        <button
          onClick={() => setLanguage('sr')}
          className={language === 'sr' ? 'active' : ''}>SRB</button>
      </div>
    </nav>
  </header>
)

const mapStateToProps = ({language, token, admin}) => {
  return {
    language,
    token,
    admin
  }
}

const mapDispatchToProps = {
  setLanguage
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)
