import { Link } from 'react-router'
import Seo from '../components/Seo.tsx'

export default function NotFound() {
  return (
    <div className="container page-top">
      <Seo
        title="Page not found · MISA SFU"
        description="This page doesn't exist on misasfu.com."
        path="/404"
      />
      <h1>Page not found</h1>
      <Link to="/">Back to home</Link>
    </div>
  )
}
