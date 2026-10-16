import { Link } from 'react-router'
import ByteArt from '../ui/ByteArt.tsx'
import { usePlayOnView } from '../../hooks/usePlayOnView.ts'
import { FOOTER_LINKS } from '../../config/links.ts'
import logo from '../../assets/logo-white.svg'
import byte from '../../assets/byte-footer.svg?raw'
import './Footer.css'

// Figma layer name of Byte's eye (only one shows from this angle)
const BYTE_EYES = ['Vector 158']

export default function Footer() {
  const footerRef = usePlayOnView<HTMLElement>(0.5)

  return (
    <footer className="footer" ref={footerRef}>
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

      <ByteArt className="footer__byte" svg={byte} eyes={BYTE_EYES} reach={6} />
    </footer>
  )
}
