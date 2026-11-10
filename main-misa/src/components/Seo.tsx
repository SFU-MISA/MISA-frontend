import { useEffect } from 'react'

const SITE_URL = 'https://misasfu.com'

type SeoProps = {
  title: string
  description: string
  /** Route path, e.g. "/about". Used for the canonical and og:url. */
  path: string
}

// Updates the tags index.html already defines, rather than adding new ones,
// so each page has exactly one title, description and canonical.
function setAttr(selector: string, attr: string, value: string) {
  document.head.querySelector(selector)?.setAttribute(attr, value)
}

export default function Seo({ title, description, path }: SeoProps) {
  useEffect(() => {
    const url = SITE_URL + path
    document.title = title
    setAttr('meta[name="description"]', 'content', description)
    setAttr('meta[property="og:title"]', 'content', title)
    setAttr('meta[property="og:description"]', 'content', description)
    setAttr('meta[property="og:url"]', 'content', url)
    setAttr('link[rel="canonical"]', 'href', url)
  }, [title, description, path])

  return null
}
