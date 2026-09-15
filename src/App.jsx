import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import CustomCursor from './components/CustomCursor'
import PageLoader from './components/Loader'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Works from './pages/Works'
import Project from './pages/Project'
import Skills from './pages/Skills'
import Experience from './pages/Experience'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Testimonials from './pages/Testimonials'
import Contact from './pages/Contact'
import Resume from './pages/Resume'
import AdminApp from './admin/App'

function MainLayout({ children }) {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)
  const location = useLocation()

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2400)
    return () => clearTimeout(t)
  }, [])

  const isAdmin = location.pathname.startsWith('/admin')

  return (
    <>
      <AnimatePresence>
        {loading && !isAdmin && <PageLoader key="loader" />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.8 }}
      >
        <Routes>
          <Route path="/admin/*" element={<AdminApp />} />
          <Route path="/" element={<MainLayout><Home /></MainLayout>} />
          <Route path="/about" element={<MainLayout><About /></MainLayout>} />
          <Route path="/works" element={<MainLayout><Works /></MainLayout>} />
          <Route path="/projects/:slug" element={<MainLayout><Project /></MainLayout>} />
          <Route path="/skills" element={<MainLayout><Skills /></MainLayout>} />
          <Route path="/experience" element={<MainLayout><Experience /></MainLayout>} />
          <Route path="/blog" element={<MainLayout><Blog /></MainLayout>} />
          <Route path="/blog/:slug" element={<MainLayout><BlogPost /></MainLayout>} />
          <Route path="/testimonials" element={<MainLayout><Testimonials /></MainLayout>} />
          <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />
          <Route path="/resume" element={<MainLayout><Resume /></MainLayout>} />
        </Routes>
      </motion.div>
    </>
  )
}
