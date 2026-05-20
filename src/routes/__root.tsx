import { createRootRoute, Outlet, Link } from '@tanstack/react-router'
import { GrInstagram } from 'react-icons/gr'
import { FaTiktok } from 'react-icons/fa'
import { BsYoutube } from 'react-icons/bs'
import { Analytics } from '@vercel/analytics/react'

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  return (
    <div className="flex flex-col justify-center items-center p-3 text-gray-100 bg-[url('/wp.jpg')] min-h-screen">
      {/* Navbar */}
      <div className="flex justify-between items-center gap-1 w-full h-16 bg-slate-700 rounded-3xl px-4 md:px-8">
        <Link to="/" className="flex justify-center items-center cursor-pointer">
          <h1 className="font-LuckiestGuy text-xl md:text-2xl">Ancient Gamer</h1>
          <img className="w-12" src="/logo.png" alt="logo" />
        </Link>
        <div className="flex justify-center items-center gap-2">
          <a
            href="https://www.instagram.com/ancient_gamer23/"
            target="_blank"
            rel="noreferrer"
          >
            <GrInstagram className="h-5 w-5" />
          </a>
          <a
            href="https://www.tiktok.com/@ancient_gamer23?is_from_webapp=1&sender_device=pc"
            target="_blank"
            rel="noreferrer"
          >
            <FaTiktok className="h-5 w-5" />
          </a>
          <a
            href="https://www.youtube.com/@entube6637/shorts"
            target="_blank"
            rel="noreferrer"
          >
            <BsYoutube className="h-5 w-5" />
          </a>
        </div>
      </div>

      <Outlet />

      {/* Footer */}
      <div className="w-full h-16 bg-slate-700 flex justify-center items-center mt-5 gap-2 rounded-3xl">
        <Link className="font-LuckiestGuy" to="/about">
          About
        </Link>
        <Link className="font-LuckiestGuy" to="/privacy">
          Privacy Policy
        </Link>
        <Link className="font-LuckiestGuy" to="/contact">
          Contact Us
        </Link>
      </div>

      <Analytics />
    </div>
  )
}
