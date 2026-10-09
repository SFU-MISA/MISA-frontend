import { Link } from 'react-router'
import { FOOTER_LINKS } from '../../config/links.ts'
import logo from '../../assets/logo-white.svg'
import byte from '../../assets/byte-footer.svg'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <img className="footer__logo" src={logo} alt="MISA" />
        <p className="footer__name">
          Management Information
          <br />
          Systems Association
        </p>
        <address className="footer__address">
          8888 University Drive
          <br />
          Burnaby, BC
          <br />
          V5A 1S6
        </address>

        <nav className="footer__links" aria-label="Footer">
          {FOOTER_LINKS.map(({ to, label }) => (
            <Link key={to} to={to}>
              {label}
            </Link>
          ))}
        </nav>

        <p className="footer__legal">MISA © {new Date().getFullYear()}</p>
      </div>

      <img className="footer__byte" src={byte} alt="" aria-hidden="true" />
    </footer>
  )
}
