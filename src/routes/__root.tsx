import { createRootRoute, Outlet, Link } from '@tanstack/react-router'
import { FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa'
import { Analytics } from '@vercel/analytics/react'
import { useIsMobile } from '../hooks/useIsMobile'

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  const isMobile = useIsMobile()

  const navH    = isMobile ? '48px' : '60px'
  const logoSz  = isMobile ? '11px' : '16px'
  const logoImg = isMobile ? '26px' : '40px'
  const iconBox = isMobile ? '30px' : '40px'
  const iconSz  = isMobile ? 13 : 18
  const footSz  = isMobile ? '7px' : '10px'

  return (
    <div className="flex flex-col h-screen bg-[#0d0020] text-white">
      <nav
        className="flex items-center justify-between px-4 sticky top-0 z-50"
        style={{
          height: navH,
          flexShrink: 0,
          background: 'rgba(10,0,28,0.95)',
          borderBottom: '1px solid rgba(255,107,157,0.2)',
        }}
      >
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2">
            <span style={{ fontFamily: '"Press Start 2P"', fontSize: logoSz, whiteSpace: 'nowrap' }}>
              <span className="text-white">ANCIENT </span>
              <span style={{ color: '#ff6b9d' }}>GAMER</span>
            </span>
            <img src="/logo.png" alt="logo" style={{ height: logoImg, width: 'auto' }} />
          </Link>
          <Link
            to="/blog"
            style={{
              fontFamily: '"Press Start 2P"',
              fontSize: isMobile ? '8px' : '10px',
              color: 'rgba(255,107,157,0.85)',
              textDecoration: 'none',
            }}
          >
            BLOG
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <a href="https://www.instagram.com/ancient_gamer23/" target="_blank" rel="noreferrer"
            className="flex items-center justify-center rounded-full hover:opacity-80 transition-opacity"
            style={{ width: iconBox, height: iconBox, border: '1px solid rgba(255,107,157,0.3)', color: '#ff6b9d' }}>
            <FaInstagram size={iconSz} />
          </a>
          <a href="https://www.tiktok.com/@ancient_gamer23?is_from_webapp=1&sender_device=pc" target="_blank" rel="noreferrer"
            className="flex items-center justify-center rounded-full hover:opacity-80 transition-opacity"
            style={{ width: iconBox, height: iconBox, border: '1px solid rgba(255,107,157,0.3)', color: '#ff6b9d' }}>
            <FaTiktok size={iconSz} />
          </a>
          <a href="https://www.youtube.com/@entube6637/shorts" target="_blank" rel="noreferrer"
            className="flex items-center justify-center rounded-full hover:opacity-80 transition-opacity"
            style={{ width: iconBox, height: iconBox, border: '1px solid rgba(255,107,157,0.3)', color: '#ff6b9d' }}>
            <FaYoutube size={iconSz} />
          </a>
        </div>
      </nav>

      <main className="flex-1 min-h-0 overflow-y-auto">
        <Outlet />
      </main>

      <footer
        className="flex items-center justify-between"
        style={{
          padding: isMobile ? '10px 16px' : '16px 24px',
          flexShrink: 0,
          background: 'rgba(10,0,28,0.95)',
          borderTop: '1px solid rgba(255,107,157,0.15)',
        }}
      >
        <div className="flex items-center gap-4">
          <Link to="/about" className="hover:opacity-100 transition-opacity"
            style={{ fontFamily: '"Press Start 2P"', fontSize: footSz, color: 'rgba(255,255,255,0.3)' }}>
            ABOUT
          </Link>
          <Link to="/privacy" className="hover:opacity-100 transition-opacity"
            style={{ fontFamily: '"Press Start 2P"', fontSize: footSz, color: 'rgba(255,255,255,0.3)' }}>
            PRIVACY
          </Link>
          <Link to="/contact" className="hover:opacity-100 transition-opacity"
            style={{ fontFamily: '"Press Start 2P"', fontSize: footSz, color: 'rgba(255,255,255,0.3)' }}>
            CONTACT
          </Link>
          <Link to="/blog" className="hover:opacity-100 transition-opacity"
            style={{ fontFamily: '"Press Start 2P"', fontSize: footSz, color: 'rgba(255,255,255,0.3)' }}>
            BLOG
          </Link>
        </div>
        <span style={{ fontFamily: '"Press Start 2P"', fontSize: footSz, color: 'rgba(255,255,255,0.15)' }}>
          © 2024 ANCIENT GAMER
        </span>
      </footer>

      <Analytics />
    </div>
  )
}
