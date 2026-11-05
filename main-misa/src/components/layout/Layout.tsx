import { Outlet, ScrollRestoration, useLocation } from 'react-router'
import { useScrollReveal } from '../../hooks/useScrollReveal.ts'
import Navbar from './Navbar.tsx'
import Footer from './Footer.tsx'

export default function Layout() {
  const { pathname } = useLocation()
  useScrollReveal(pathname)

  return (
    <>
      <Navbar />
      {/* Keyed so each page fades in when navigated to */}
      <main className="page" key={pathname}>
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </>
  )
}
