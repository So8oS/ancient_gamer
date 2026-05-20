import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useRef, useMemo, useEffect } from 'react'
import { games } from '../../games'
import RufflePlayer from '../../components/RufflePlayer'
import { MdFullscreen, MdRefresh } from 'react-icons/md'
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi'
import { FiInfo } from 'react-icons/fi'
import { useIsMobile } from '../../hooks/useIsMobile'

export const Route = createFileRoute('/games/$id')({
  loader: ({ params }) => {
    const game = games.find((g) => g.id === parseInt(params.id))
    return { game }
  },
  component: Game,
})

type Status = 'loading' | 'loaded' | 'error'

interface RuffleExtended extends HTMLElement {
  volume: number
  reload(): void
}

function platformBadgeStyle(platform: string): React.CSSProperties {
  if (platform === 'Flash Game') {
    return {
      background: 'rgba(196,77,255,0.2)',
      color: '#c44dff',
      border: '1px solid rgba(196,77,255,0.3)',
    }
  }
  return {
    background: 'rgba(55,138,221,0.2)',
    color: '#7eb8f7',
    border: '1px solid rgba(55,138,221,0.3)',
  }
}

const dotGrid: React.CSSProperties = {
  backgroundImage: 'radial-gradient(circle, rgba(255,107,157,0.15) 1px, transparent 1px)',
  backgroundSize: '24px 24px',
}

function MoreGamesSection({ moreGames, isMobile }: { moreGames: typeof games; isMobile: boolean }) {
  const labelSz = isMobile ? '8px' : '10px'
  const titleSz = isMobile ? '7px' : '9px'
  const badgeSz = isMobile ? '7px' : '9px'

  return (
    <div style={{ padding: '16px', borderBottom: '1px solid rgba(255,107,157,0.08)' }}>
      <span style={{
        fontFamily: '"Press Start 2P"',
        fontSize: labelSz,
        color: 'rgba(255,107,157,0.6)',
        letterSpacing: '0.1em',
        marginBottom: '14px',
        display: 'block',
      }}>MORE GAMES</span>
      <div className="flex flex-col gap-1.5">
        {moreGames.map((g) => (
          <Link
            key={g.id}
            to="/games/$id"
            params={{ id: String(g.id) }}
            className="flex items-center gap-2 rounded"
            style={{ padding: '5px', cursor: 'pointer', textDecoration: 'none' }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = 'rgba(255,107,157,0.05)')
            }
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            <div
              style={{
                width: '50px',
                height: '34px',
                borderRadius: '3px',
                background: '#1a0a2e',
                flexShrink: 0,
              }}
            />
            <div className="flex flex-col gap-1 min-w-0">
              <span
                style={{
                  fontFamily: '"Press Start 2P"',
                  fontSize: titleSz,
                  color: 'rgba(255,255,255,0.7)',
                  lineHeight: 1.8,
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                }}
              >
                {g.title}
              </span>
              <span
                style={{
                  fontFamily: '"Press Start 2P"',
                  fontSize: badgeSz,
                  padding: '2px 5px',
                  borderRadius: '3px',
                  alignSelf: 'flex-start',
                  ...platformBadgeStyle(g.platform),
                }}
              >
                {g.platform}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

function TipBox({ isMobile }: { isMobile: boolean }) {
  return (
    <div style={{ margin: '0 16px 16px' }}>
      <div
        className="flex gap-2 items-start"
        style={{
          background: 'rgba(255,107,157,0.06)',
          border: '1px solid rgba(255,107,157,0.15)',
          borderRadius: '6px',
          padding: '12px 14px',
        }}
      >
        <FiInfo style={{ color: '#ff6b9d', fontSize: isMobile ? '16px' : '20px', flexShrink: 0, marginTop: '1px' }} />
        <p
          style={{
            fontFamily: '"Press Start 2P"',
            fontSize: isMobile ? '7px' : '9px',
            color: 'rgba(255,255,255,0.4)',
            lineHeight: 2,
          }}
        >
          RIGHT CLICK THE GAME → ENTER FULL SCREEN FOR BEST EXPERIENCE
        </p>
      </div>
    </div>
  )
}

function Game() {
  const { game } = Route.useLoaderData()
  const [status, setStatus] = useState<Status>('loading')
  const [muted, setMuted] = useState(false)
  const gameAreaRef = useRef<HTMLDivElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const isMobile = useIsMobile()

  const useRuffle = game?.useRuffle === true && !!game?.swf

  const moreGames = useMemo(() => {
    const others = games.filter((g) => g.id !== game?.id && g.platform !== 'PS2')
    return [...others].sort(() => Math.random() - 0.5).slice(0, 4)
  }, [game?.id])

  // Stop iframe audio on navigation (Ruffle is handled inside RufflePlayer cleanup)
  useEffect(() => {
    return () => {
      if (iframeRef.current) {
        iframeRef.current.src = ''
      }
    }
  }, [])

  const getRufflePlayer = (): RuffleExtended | null => {
    const el = gameAreaRef.current?.querySelector('ruffle-player')
    return el ? (el as unknown as RuffleExtended) : null
  }

  const handleFullscreen = () => {
    gameAreaRef.current?.requestFullscreen()
  }

  const handleSound = () => {
    const newMuted = !muted
    setMuted(newMuted)
    if (useRuffle) {
      const player = getRufflePlayer()
      if (player) player.volume = newMuted ? 0 : 1
    }
  }

  const handleRestart = () => {
    if (useRuffle) {
      const player = getRufflePlayer()
      if (player) player.reload()
    } else if (iframeRef.current) {
      const src = iframeRef.current.src
      iframeRef.current.src = ''
      setTimeout(() => {
        if (iframeRef.current) iframeRef.current.src = src
      }, 50)
    }
  }

  const titleSz    = isMobile ? '10px' : '14px'
  const badgeSz    = isMobile ? '7px'  : '9px'
  const toolSz     = isMobile ? '7px'  : '9px'
  const toolPad    = isMobile ? '5px 8px' : '7px 13px'
  const toolIconSz = isMobile ? 14 : 20

  const toolbarBtnBase: React.CSSProperties = {
    fontFamily: '"Press Start 2P"',
    fontSize: toolSz,
    padding: toolPad,
    borderRadius: '3px',
    background: 'transparent',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  }

  return (
    <div className="flex flex-col h-full">
      {/* Title bar */}
      <div
        className="flex items-center justify-between"
        style={{
          flexShrink: 0,
          padding: isMobile ? '10px 14px' : '14px 24px',
          background: 'rgba(10,0,28,0.8)',
          borderBottom: '1px solid rgba(255,107,157,0.15)',
        }}
      >
        <div className="flex items-center gap-4">
          <Link
            to="/"
            style={{ fontFamily: '"Press Start 2P"', fontSize: isMobile ? '7px' : '10px', color: 'rgba(255,107,157,0.7)', whiteSpace: 'nowrap', textDecoration: 'none' }}
          >
            ← BACK
          </Link>
          <h1 style={{ fontFamily: '"Press Start 2P"', fontSize: titleSz, color: '#fff' }}>
            {game?.title}
          </h1>
        </div>
        {game && (
          <span
            style={{
              fontFamily: '"Press Start 2P"',
              fontSize: badgeSz,
              padding: '4px 8px',
              borderRadius: '3px',
              ...platformBadgeStyle(game.platform),
            }}
          >
            {game.platform}
          </span>
        )}
      </div>

      {/* Two-column layout */}
      <div
        className="flex flex-col md:flex-row"
        style={{ flex: 1, minHeight: 0 }}
      >
        {/* Left: canvas + toolbar */}
        <div className="flex-1 flex flex-col" style={{ minHeight: 0 }}>

          {/* Canvas area */}
          <div
            className="flex items-center justify-center"
            style={{
              flex: 1,
              minHeight: 0,
              overflow: 'hidden',
              background: '#060010',
              ...dotGrid,
            }}
          >
            <div
              ref={gameAreaRef}
              className="relative"
              style={{ width: '100%', aspectRatio: '4/3', maxHeight: '100%' }}
            >
              {status === 'loading' && (
                <div
                  className="absolute inset-0 z-10 flex items-center justify-center"
                  style={{ background: 'rgba(6,0,16,0.85)' }}
                >
                  <div
                    className="rounded-full border-2 animate-spin"
                    style={{
                      width: '56px',
                      height: '56px',
                      borderColor: '#ff6b9d',
                      borderTopColor: 'transparent',
                    }}
                  />
                </div>
              )}
              {status === 'error' && (
                <div
                  className="absolute inset-0 z-10 flex items-center justify-center px-6 text-center"
                  style={{ background: 'rgba(6,0,16,0.9)' }}
                >
                  <p
                    style={{
                      fontFamily: '"Press Start 2P"',
                      fontSize: '11px',
                      color: 'rgba(255,255,255,0.5)',
                      lineHeight: 2,
                    }}
                  >
                    This game isn't available yet — check back soon.
                  </p>
                </div>
              )}

              {useRuffle ? (
                <RufflePlayer
                  swfUrl={game!.swf!}
                  onLoad={() => setStatus('loaded')}
                  onError={() => setStatus('error')}
                />
              ) : (
                <iframe
                  ref={iframeRef}
                  className="w-full h-full"
                  style={{ border: 'none' }}
                  src={game?.links?.[0]?.url}
                  allowFullScreen
                  loading="lazy"
                  onLoad={() => setStatus('loaded')}
                />
              )}
            </div>
          </div>

          {/* Toolbar */}
          <div
            className="flex items-center justify-between"
            style={{
              flexShrink: 0,
              padding: isMobile ? '8px 14px' : '12px 24px',
              background: 'rgba(10,0,28,0.95)',
              borderTop: '1px solid rgba(255,107,157,0.1)',
            }}
          >
            <div className="flex items-center gap-3">
              <button
                onClick={handleFullscreen}
                style={{
                  ...toolbarBtnBase,
                  color: '#ff6b9d',
                  border: '1px solid rgba(255,107,157,0.3)',
                }}
              >
                <MdFullscreen size={toolIconSz} />
                {!isMobile && 'FULLSCREEN'}
              </button>
              <button
                onClick={handleSound}
                style={{
                  ...toolbarBtnBase,
                  color: 'rgba(255,255,255,0.35)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                {muted ? <HiVolumeOff size={toolIconSz} /> : <HiVolumeUp size={toolIconSz} />}
                {!isMobile && (muted ? 'UNMUTE' : 'SOUND')}
              </button>
              <button
                onClick={handleRestart}
                style={{
                  ...toolbarBtnBase,
                  color: 'rgba(255,255,255,0.35)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <MdRefresh size={toolIconSz} />
                {!isMobile && 'RESTART'}
              </button>
            </div>
          </div>

          {/* Mobile-only: more games + tip */}
          <div className="md:hidden">
            <MoreGamesSection moreGames={moreGames} isMobile={isMobile} />
          </div>
        </div>

        {/* Sidebar (desktop only) */}
        <div
          className="hidden md:flex flex-col"
          style={{
            width: '260px',
            flexShrink: 0,
            background: 'rgba(10,0,28,0.6)',
            borderLeft: '1px solid rgba(255,107,157,0.1)',
            overflowY: 'auto',
          }}
        >
          <MoreGamesSection moreGames={moreGames} isMobile={false} />
          <div style={{ flex: 1 }} />
          {/* <TipBox isMobile={false} /> */}
        </div>
      </div>
    </div>
  )
}
