import { Outlet, ScrollRestoration } from 'react-router'
import Navbar from './Navbar.tsx'
import Footer from './Footer.tsx'

export default function Layout() {
  return (
    <>
      <Navbar />
      <main className="page">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </>
  )
}
