import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router'
import { NAV_LINKS, TICKETING_PORTAL_URL } from '../../config/links.ts'
import logo from '../../assets/logo-blue.svg'
import './Navbar.css'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)
  const tucked = useTuckOnScroll() && !menuOpen

  return (
    <header className={`navbar${tucked ? ' is-tucked' : ''}`}>
      <div className={`navbar__pill${menuOpen ? ' is-open' : ''}`}>
        <Link to="/" className="navbar__brand" onClick={closeMenu}>
          <img src={logo} alt="MISA home" />
        </Link>

        {/* Ticketing portal: always visible, even with the mobile menu closed */}
        <a className="navbar__cta" href={TICKETING_PORTAL_URL} onClick={closeMenu}>
          Get Tickets
        </a>

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

// How far down the page before the bar starts tucking away, and how far the
// page must move before it changes, so small scroll jitters are ignored
const TUCK_AFTER = 200
const TUCK_THRESHOLD = 8

/** True while scrolling down the page; false again as soon as the user scrolls up */
function useTuckOnScroll() {
  const [tucked, setTucked] = useState(false)

  useEffect(() => {
    let lastY = window.scrollY
    let frame = 0

    const update = () => {
      frame = 0
      const y = window.scrollY
      if (y < TUCK_AFTER) {
        setTucked(false)
        lastY = y
      } else if (Math.abs(y - lastY) > TUCK_THRESHOLD) {
        setTucked(y > lastY)
        lastY = y
      }
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  return tucked
}
