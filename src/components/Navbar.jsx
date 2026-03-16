import { useState } from "react"
import { Link } from "react-router-dom"
import logo from "../assets/logo.png"
import "./Navbar.css"

function Navbar() {

  const [menu, setMenu] = useState(null)

  const toggleMenu = (name) => {
    setMenu(menu === name ? null : name)
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

      {/* Menu */}
      <ul className="menu">

        <li><Link to="/">Home</Link></li>

        {/* About */}
        <li
          onMouseEnter={() => setMenu("about")}
          onMouseLeave={() => setMenu(null)}
        >
          About
          {menu === "about" && (
            <ul className="dropdown">
              <li><Link to="/history">History</Link></li>
              <li><Link to="/custodian">Custodian</Link></li>
            </ul>
          )}
        </li>

        {/* Media */}
        <li
          onMouseEnter={() => setMenu("media")}
          onMouseLeave={() => setMenu(null)}
        >
          Media
          {menu === "media" && (
            <ul className="dropdown">
              <li><Link to="/articles">Articles</Link></li>
              <li><Link to="/press">Press Coverage</Link></li>
              <li><Link to="/pictures">Pictures</Link></li>
              <li><Link to="/broadcast">Broadcast</Link></li>
            </ul>
          )}
        </li>

        <li><Link to="/contact">Contact</Link></li>

        <li><Link to="/career">Career</Link></li>

      </ul>

    </nav>
  )
}

export default Navbar
