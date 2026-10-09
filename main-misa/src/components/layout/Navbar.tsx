import { useState } from 'react'
import { Link, NavLink } from 'react-router'
import { NAV_LINKS } from '../../config/links.ts'
import logo from '../../assets/logo-blue.svg'
import './Navbar.css'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="navbar">
      <div className={`navbar__pill${menuOpen ? ' is-open' : ''}`}>
        <Link to="/" className="navbar__brand" onClick={closeMenu}>
          <img src={logo} alt="MISA home" />
        </Link>

        <button
          type="button"
          className="navbar__toggle"
          aria-expanded={menuOpen}
          aria-controls="primary-nav"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav id="primary-nav" className="navbar__links">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink key={to} to={to} onClick={closeMenu}>
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
