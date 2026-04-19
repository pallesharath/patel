import { useState } from "react"
import { Link } from "react-router-dom"
import { useTranslation } from 'react-i18next'
import logo from "../assets/logo.png"
import "./navbar.css"

function Navbar() {
  const { t, i18n } = useTranslation()
  const [menu, setMenu] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  const toggleMenu = (name) => {
    setMenu(menu === name ? null : name)
  }

  const handleMenuClick = (name) => {
    if (window.innerWidth <= 768) {
      toggleMenu(name)
    }
  }

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
    setMenu(null)
  }

  const toggleMobileMenu = () => {
    setMobileOpen(!mobileOpen)
    setMenu(null)
  }

  const closeMobileMenu = () => {
    if (window.innerWidth <= 768) {
      setMobileOpen(false)
      setMenu(null)
    }
  }

  return (
    <nav className="navbar">

      {/* Logo + Website Name */}
      <div className="logo">
        <Link to="/" className="logo-link">
          <img src={logo} alt="logo" />
          <h2 className="site-name">Vedha Pudami</h2>
        </Link>
      </div>

      <button className="mobile-toggle" onClick={toggleMobileMenu} aria-label="Toggle navigation">
        <span />
        <span />
        <span />
      </button>

      {/* Menu */}
      <ul className={`menu ${mobileOpen ? 'open' : ''}`}>

        <li><Link to="/" onClick={closeMobileMenu}>{t('nav.home')}</Link></li>

        {/* About */}
        <li
          onMouseEnter={() => setMenu("about")}
          onMouseLeave={() => setMenu(null)}
          onClick={() => handleMenuClick("about")}
        >
          {t('nav.about')}
          {menu === "about" && (
            <ul className="dropdown">
              <li><Link to="/history" onClick={closeMobileMenu}>{t('nav.history')}</Link></li>
              <li><Link to="/custodian" onClick={closeMobileMenu}>{t('nav.custodian')}</Link></li>
            </ul>
          )}
        </li>

        {/* Media */}
        <li
          onMouseEnter={() => setMenu("media")}
          onMouseLeave={() => setMenu(null)}
          onClick={() => handleMenuClick("media")}
        >
          {t('nav.media')}
          {menu === "media" && (
            <ul className="dropdown">
              <li><Link to="/articles" onClick={closeMobileMenu}>{t('nav.articles')}</Link></li>
              <li><Link to="/press" onClick={closeMobileMenu}>{t('nav.press')}</Link></li>
              <li><Link to="/pictures" onClick={closeMobileMenu}>{t('nav.pictures')}</Link></li>
              <li><Link to="/broadcast" onClick={closeMobileMenu}>{t('nav.broadcast')}</Link></li>
            </ul>
          )}
        </li>

        <li><Link to="/contact" onClick={closeMobileMenu}>{t('nav.contact')}</Link></li>

        <li><Link to="/career" onClick={closeMobileMenu}>{t('nav.career')}</Link></li>

        <li
          onMouseEnter={() => setMenu("language")}
          onMouseLeave={() => setMenu(null)}
          onClick={() => handleMenuClick("language")}
        >
          {t('nav.language')}
          {menu === "language" && (
            <ul className="dropdown">
              <li>
                <button type="button" onClick={() => changeLanguage('en')}>
                  {t('language.english')}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => changeLanguage('te')}>
                  {t('language.telugu')}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => changeLanguage('hi')}>
                  {t('language.hindi')}
                </button>
              </li>
            </ul>
          )}
        </li>

      </ul>

    </nav>
  )
}

export default Navbar
