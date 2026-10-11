import type { ReactNode } from 'react'
import { Link } from 'react-router'
import './Button.css'

type ButtonProps = {
  children: ReactNode
  /** Internal route (e.g. "/about") or external URL (e.g. the ticketing portal) */
  to: string
  /** "light" = white button for use on blue backgrounds */
  variant?: 'primary' | 'light'
  className?: string
  /** File name to save as, for download links (e.g. an .ics calendar file) */
  download?: string
}

/** Shared call-to-action button (Figma "Learn More Button"). Lifts on hover. */
export default function Button({
  children,
  to,
  variant = 'primary',
  className = '',
  download,
}: ButtonProps) {
  const classes =
    `button${variant === 'light' ? ' button--light' : ''} ${className}`.trim()

  if (/^(https?:\/\/|data:)/.test(to)) {
    return (
      <a className={classes} href={to} download={download}>
        {children}
      </a>
    )
  }

  return (
    <Link className={classes} to={to}>
      {children}
    </Link>
  )
}
