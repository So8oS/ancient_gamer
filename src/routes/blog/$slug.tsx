import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { blogPostsBySlug } from '../../data/blog'
import { useIsMobile } from '../../hooks/useIsMobile'

export const Route = createFileRoute('/blog/$slug')({
  loader: ({ params }) => {
    const post = blogPostsBySlug[params.slug]
    if (!post) {
      throw notFound()
    }
    return { post }
  },
  component: BlogPostPage,
})

function BlogPostPage() {
  const { post } = Route.useLoaderData()
  const isMobile = useIsMobile()
  const lines = post.content.split('\n').map((line) => line.trim())

  return (
    <div className="px-4 py-8 md:px-8 md:py-10">
      <article
        className="mx-auto w-full max-w-3xl rounded-lg p-5 md:p-8"
        style={{
          background: 'rgba(255,107,157,0.05)',
          border: '1px solid rgba(255,107,157,0.16)',
        }}
      >
        <Link
          to="/blog"
          style={{
            fontFamily: '"Press Start 2P"',
            fontSize: isMobile ? '7px' : '9px',
            color: 'rgba(255,107,157,0.8)',
            textDecoration: 'none',
          }}
        >
          ← BACK TO BLOG
        </Link>

        <header className="mt-4 mb-6">
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
          <h1
            style={{
              fontFamily: '"Press Start 2P"',
              fontSize: isMobile ? '11px' : '15px',
              color: '#fff',
              lineHeight: 1.9,
            }}
          >
            {post.title}
          </h1>
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: '"Press Start 2P"',
                  fontSize: isMobile ? '7px' : '8px',
                  color: '#c44dff',
                  border: '1px solid rgba(196,77,255,0.35)',
                  borderRadius: '3px',
                  padding: '4px 6px',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className="flex flex-col gap-4">
          {lines.map((line, index) => {
            if (!line) {
              return null
            }

            if (line.startsWith('## ')) {
              return (
                <h2
                  key={`${line}-${index}`}
                  className="mt-2"
                  style={{
                    fontFamily: '"Press Start 2P"',
                    fontSize: isMobile ? '9px' : '11px',
                    color: '#ff6b9d',
                    lineHeight: 1.9,
                  }}
                >
                  {line.slice(3)}
                </h2>
              )
            }

            return (
              <p
                key={`${line}-${index}`}
                style={{
                  fontSize: isMobile ? '11px' : '14px',
                  color: 'rgba(255,255,255,0.86)',
                  lineHeight: 1.9,
                }}
              >
                {line}
              </p>
            )
          })}
        </div>
      </article>
    </div>
  )
}
