import { createFileRoute, Link } from '@tanstack/react-router'
import { blogPosts } from '../../data/blog'
import { useIsMobile } from '../../hooks/useIsMobile'

export const Route = createFileRoute('/blog/')({
  component: BlogIndexPage,
})

function BlogIndexPage() {
  const isMobile = useIsMobile()

  return (
    <div className="px-4 py-8 md:px-8 md:py-10">
      <div className="mx-auto w-full max-w-6xl">
        <header
          className="mb-8 rounded-lg p-5 md:p-8"
          style={{
            background: 'rgba(255,107,157,0.05)',
            border: '1px solid rgba(255,107,157,0.15)',
          }}
        >
          <p
            style={{
              fontFamily: '"Press Start 2P"',
              fontSize: isMobile ? '8px' : '10px',
              color: '#c44dff',
              letterSpacing: '0.12em',
              marginBottom: '12px',
            }}
          >
            ANCIENT GAMER ARCHIVES
          </p>
          <h1
            style={{
              fontFamily: '"Press Start 2P"',
              fontSize: isMobile ? '13px' : '18px',
              color: '#ffffff',
              lineHeight: 1.8,
            }}
          >
            Retro Blog and Browser Gaming Articles
          </h1>
          <p
            className="mt-4"
            style={{
              fontSize: isMobile ? '11px' : '14px',
              color: 'rgba(255,255,255,0.75)',
              lineHeight: 1.8,
            }}
          >
            Deep reads on Flash history, legendary web titles, and the portal culture that
            shaped a generation of players.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="h-full rounded-lg p-5 transition-colors hover:border-pink-400/60"
              style={{
                background: 'rgba(255,107,157,0.04)',
                border: '1px solid rgba(255,107,157,0.18)',
              }}
            >
              <p
                style={{
                  fontFamily: '"Press Start 2P"',
                  fontSize: isMobile ? '7px' : '9px',
                  color: 'rgba(255,255,255,0.45)',
                  marginBottom: '10px',
                }}
              >
                {post.date}
              </p>
              <h2
                style={{
                  fontFamily: '"Press Start 2P"',
                  fontSize: isMobile ? '9px' : '11px',
                  color: '#ffffff',
                  lineHeight: 1.9,
                  marginBottom: '12px',
                }}
              >
                {post.title}
              </h2>
              <p
                style={{
                  fontSize: isMobile ? '11px' : '13px',
                  color: 'rgba(255,255,255,0.75)',
                  lineHeight: 1.8,
                }}
              >
                {post.excerpt}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontFamily: '"Press Start 2P"',
                      fontSize: isMobile ? '7px' : '8px',
                      color: '#ff6b9d',
                      border: '1px solid rgba(255,107,157,0.3)',
                      borderRadius: '3px',
                      padding: '4px 6px',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-6">
                <Link
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  preload="intent"
                  style={{
                    fontFamily: '"Press Start 2P"',
                    fontSize: isMobile ? '8px' : '9px',
                    color: '#0d0020',
                    background: '#ff6b9d',
                    borderRadius: '4px',
                    padding: '8px 10px',
                    textDecoration: 'none',
                    display: 'inline-block',
                  }}
                >
                  READ ARTICLE
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
