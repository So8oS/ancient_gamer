import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { useAtom } from 'jotai'
import { ImMobile } from 'react-icons/im'
import { FaPlay } from 'react-icons/fa'
import { videosAtom, type Game } from '../games'
import { useIsMobile } from '../hooks/useIsMobile'

export const Route = createFileRoute('/')({
  component: Home,
})

function getYouTubeId(embedUrl: string): string {
  return embedUrl.split('/embed/')[1]?.split('?')[0] ?? ''
}

function platformBadgeStyle(platform: string): React.CSSProperties {
  if (platform === 'Flash Game') {
    return { background: 'rgba(196,77,255,0.2)', color: '#c44dff', border: '1px solid rgba(196,77,255,0.3)' }
  }
  return { background: 'rgba(55,138,221,0.2)', color: '#7eb8f7', border: '1px solid rgba(55,138,221,0.3)' }
}

function GameCard({ video, isFeatured }: { video: Game; isFeatured?: boolean }) {
  const [playing, setPlaying] = useState(false)
  const [hovered, setHovered] = useState(false)
  const isMobile = useIsMobile()
  const videoId = getYouTubeId(video.url)

  const borderColor = hovered
    ? 'rgba(255,107,157,0.4)'
    : isFeatured
      ? 'rgba(255,107,157,0.5)'
      : 'rgba(255,107,157,0.15)'

  const titleSz  = isMobile ? '8px'  : '10px'
  const badgeSz  = isMobile ? '7px'  : '9px'
  const btnSz    = isMobile ? '7px'  : '9px'
  const playCircle = isMobile ? '36px' : '45px'
  const playIcon   = isMobile ? 12 : 15

  return (
    <div
      style={{ background: isFeatured ? 'rgba(255,107,157,0.08)' : 'rgba(255,107,157,0.05)', border: `1px solid ${borderColor}`, borderRadius: '10px', overflow: 'hidden', transition: 'border-color 0.2s' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ width: '100%', aspectRatio: '16/10', background: '#1a0a2e', position: 'relative', overflow: 'hidden' }}>
        {playing ? (
          <iframe
            className="w-full h-full"
            src={`${video.url}?autoplay=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <button className="relative w-full h-full block" onClick={() => setPlaying(true)} aria-label={`Play ${video.title}`}>
            <img className="w-full h-full object-cover" src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`} alt={video.title} loading="lazy" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex items-center justify-center rounded-full"
                style={{ width: playCircle, height: playCircle, background: 'rgba(255,107,157,0.9)', color: '#fff' }}>
                <FaPlay size={playIcon} />
              </div>
            </div>
          </button>
        )}
      </div>

      <div style={{ padding: isMobile ? '8px' : '12px' }}>
        <p className="mb-2" style={{ fontFamily: '"Press Start 2P"', fontSize: titleSz, color: '#fff', lineHeight: 1.8 }}>
          {video.title}
        </p>
        <div className="flex items-center justify-between">
          <span style={{ fontFamily: '"Press Start 2P"', fontSize: badgeSz, padding: '3px 6px', borderRadius: '3px', ...platformBadgeStyle(video.platform) }}>
            {video.platform}
          </span>
          <div className="flex items-center gap-2">
            {video.playableOnPhone && <ImMobile style={{ color: '#ff6b9d', fontSize: isMobile ? '13px' : '16px' }} />}
            {video.available && (
              <Link to="/games/$id" params={{ id: String(video.id) }} preload="intent"
                style={{ fontFamily: '"Press Start 2P"', fontSize: btnSz, padding: '4px 8px', borderRadius: '3px', background: '#ff6b9d', color: '#0d0020', border: 'none', textDecoration: 'none', whiteSpace: 'nowrap' }}>
                PLAY NOW
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function Home() {
  const [view, setView] = useState('all')
  const [videos] = useAtom(videosAtom)
  const [sliceValue, setSliceValue] = useState(8)
  const isMobile = useIsMobile()

  useEffect(() => { setSliceValue(8) }, [view])

  const filteredVideos = view === 'phone' ? videos.filter((v) => v.playableOnPhone) : videos

  const dotGrid: React.CSSProperties = {
    backgroundImage: 'radial-gradient(circle, rgba(255,107,157,0.15) 1px, transparent 1px)',
    backgroundSize: '24px 24px',
  }

  const eyebrowSz  = isMobile ? '7px'  : '11px'
  const titleSz    = isMobile ? '14px' : '23px'
  const subtitleSz = isMobile ? '7px'  : '11px'
  const filterSz   = isMobile ? '8px'  : '11px'
  const filterPad  = isMobile ? '9px 14px' : '13px 25px'
  const showMoreSz = isMobile ? '8px'  : '11px'

  const filterBtnStyle = (active: boolean): React.CSSProperties => ({
    fontFamily: '"Press Start 2P"',
    fontSize: filterSz,
    padding: filterPad,
    borderRadius: '4px',
    letterSpacing: '0.05em',
    cursor: 'pointer',
    transition: 'all 0.15s',
    background: active ? '#ff6b9d' : 'transparent',
    color: active ? '#0d0020' : '#ff6b9d',
    border: active ? 'none' : '1px solid rgba(255,107,157,0.4)',
  })

  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center text-center" style={{ ...dotGrid, padding: isMobile ? '32px 16px 24px' : '48px 24px 40px' }}>
        <p style={{ fontFamily: '"Press Start 2P"', fontSize: eyebrowSz, color: '#c44dff', letterSpacing: '0.15em', marginBottom: '16px' }}>
          — EST. 2003 —
        </p>
        <h1 style={{ fontFamily: '"Press Start 2P"', fontSize: titleSz, lineHeight: 2 }}>
          <span style={{ color: '#fff' }}>LET'S GET A BIT</span>
          <br />
          <span style={{ color: '#ff6b9d' }}>NOSTALGIC</span>
          <span style={{ color: '#fff' }}> EH?</span>
        </h1>
        <div style={{ width: '40px', height: '2px', background: '#ff6b9d', borderRadius: '1px', margin: '16px auto' }} />
        <p style={{ fontFamily: '"Press Start 2P"', fontSize: subtitleSz, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.05em' }}>
          CLASSIC FLASH GAMES · PLAYABLE IN YOUR BROWSER
        </p>
      </div>

      <div className="flex justify-center gap-3" style={{ marginBottom: '28px' }}>
        <button onClick={() => setView('all')} style={filterBtnStyle(view === 'all')}>ALL GAMES</button>
        <button onClick={() => setView('phone')} style={filterBtnStyle(view === 'phone')}>PLAYABLE ON PHONE</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4" style={{ gap: '12px', padding: isMobile ? '0 12px 28px' : '0 20px 36px' }}>
        {[...filteredVideos].reverse().slice(0, sliceValue).map((video, i) => (
          <GameCard key={video.url} video={video} isFeatured={i === 0} />
        ))}
      </div>

      {sliceValue < filteredVideos.length && (
        <div className="flex justify-center" style={{ margin: '0 16px 36px' }}>
          <button onClick={() => setSliceValue((v) => v + 8)}
            style={{ fontFamily: '"Press Start 2P"', fontSize: showMoreSz, padding: isMobile ? '10px 20px' : '14px 28px', borderRadius: '4px', letterSpacing: '0.05em', background: 'transparent', color: '#ff6b9d', border: '1px solid rgba(255,107,157,0.4)', cursor: 'pointer' }}>
            SHOW MORE
          </button>
        </div>
      )}

      <div style={{ width: '60%', height: '1px', background: 'rgba(255,107,157,0.15)', margin: '0 auto 36px' }} />
    </div>
  )
}
