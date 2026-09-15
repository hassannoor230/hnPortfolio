import { useEffect, useState, Suspense, lazy } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Works from './pages/Works'
import Project from './pages/Project'
import About from './pages/About'
import Experience from './pages/Experience'
import Skills from './pages/Skills'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Testimonials from './pages/Testimonials'
import Contact from './pages/Contact'
import Resume from './pages/Resume'
import AdminApp from './admin/App'

const NotFound = () => (
  <div className="container" style={{ paddingTop: '6rem', paddingBottom: '6rem', textAlign: 'center' }}>
    <h1 className="display-strong">404</h1>
    <p className="body text-dim">Page not found.</p>
  </div>
)

function AppContent() {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')

  return (
    <Routes>
      <Route path="/admin/*" element={<AdminApp />} />
      <Route path="/" element={<Home />} />
      <Route path="/works" element={<Works />} />
      <Route path="/projects/:slug" element={<Project />} />
      <Route path="/about" element={<About />} />
      <Route path="/skills" element={<Skills />} />
      <Route path="/experience" element={<Experience />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
      <Route path="/testimonials" element={<Testimonials />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/resume" element={<Resume />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <AppContent />
      </main>
      <Footer />
    </>
  )
}
