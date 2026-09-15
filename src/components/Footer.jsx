import { Link } from 'react-router-dom'
import { Github, Linkedin, Mail } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="footer-brand-mark">HN</span>
          <p>Building premium digital experiences for modern brands and ambitious teams.</p>
          <div className="social-row">
            <a href="https://github.com/hassannoor230" target="_blank" rel="noreferrer" data-cursor="GitHub"><Github size={16} /></a>
            <a href="https://www.linkedin.com/in/hassan-noor-509794325/" target="_blank" rel="noreferrer" data-cursor="LinkedIn"><Linkedin size={16} /></a>
            <a href="mailto:hassannoor2309@gmail.com" data-cursor="Email"><Mail size={16} /></a>
          </div>
        </div>

        <div className="footer-links-wrap">
          <div>
            <h4>Navigation</h4>
            <div className="footer-links">
              <Link to="/works">Work</Link>
              <Link to="/about">About</Link>
              <Link to="/skills">Skills</Link>
              <Link to="/contact">Contact</Link>
            </div>
          </div>

          <div>
            <h4>Connect</h4>
            <div className="footer-links">
              <Link to="/admin/login">Admin</Link>
              <Link to="/blog">Blog</Link>
              <Link to="/testimonials">Testimonials</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© {year} Hassan Noor.</span>
        <Link to="/contact">Start a project</Link>
      </div>
    </footer>
  )
}
