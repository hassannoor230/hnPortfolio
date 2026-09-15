import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function SEO({ title, description, image, noindex = false }) {
  const location = useLocation()
  const defaultTitle = 'Hassan Noor — MERN Stack Developer'
  const defaultDescription = 'Portfolio of Hassan Noor, a MERN Stack Developer building premium, high-performance web applications.'
  const defaultImage = '/Me.png'

  const finalTitle = title || defaultTitle
  const finalDescription = description || defaultDescription
  const finalImage = image || defaultImage
  const url = `${window.location.origin}${location.pathname}`

  useEffect(() => {
    document.title = finalTitle

    let metaDesc = document.querySelector('meta[name="description"]')
    if (!metaDesc) {
      metaDesc = document.createElement('meta')
      metaDesc.name = 'description'
      document.head.appendChild(metaDesc)
    }
    metaDesc.content = finalDescription

    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = url

    const setOg = (property, content) => {
      let tag = document.querySelector(`meta[property="${property}"]`)
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('property', property)
        document.head.appendChild(tag)
      }
      tag.content = content
    }
    setOg('og:title', finalTitle)
    setOg('og:description', finalDescription)
    setOg('og:image', `${window.location.origin}${finalImage}`)
    setOg('og:url', url)
    setOg('og:type', 'website')
    setOg('twitter:card', 'summary_large_image')
    setOg('twitter:title', finalTitle)
    setOg('twitter:description', finalDescription)
    setOg('twitter:image', `${window.location.origin}${finalImage}`)

    if (noindex) {
      let robots = document.querySelector('meta[name="robots"]')
      if (!robots) {
        robots = document.createElement('meta')
        robots.name = 'robots'
        document.head.appendChild(robots)
      }
      robots.content = 'noindex, nofollow'
    } else {
      let robots = document.querySelector('meta[name="robots"]')
      if (robots) robots.content = 'index, follow'
    }
  }, [finalTitle, finalDescription, finalImage, url, noindex])

  return null
}

export default SEO
