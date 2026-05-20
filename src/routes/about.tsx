import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return (
    <div className="flex justify-center px-4 py-12">
      <div
        className="flex flex-col items-center gap-10 w-full"
        style={{
          maxWidth: '800px',
          background: 'rgba(255,107,157,0.05)',
          border: '1px solid rgba(255,107,157,0.15)',
          borderRadius: '10px',
          padding: '48px',
        }}
      >
        <img className="w-32" src="/logo.png" alt="logo" />
        <div
          className="flex flex-col gap-8"
          style={{
            fontFamily: '"Press Start 2P"',
            fontSize: '12px',
            color: 'rgba(255,255,255,0.7)',
            lineHeight: 2.4,
          }}
        >
          <p>
            Welcome to Ancient Gamer – your gateway to treasured gaming memories! Step into a world
            where flash games and vintage classics reign supreme, reigniting the spark of nostalgia
            in every pixel.
          </p>
          <p>
            Through captivating short-form videos on YouTube, TikTok, and Instagram, we transport
            you back to the enchantment of these timeless gems. Our focus? Flash games and
            old-school favorites that once captured our hearts and imaginations. But Ancient Gamer is
            more than just a nostalgia trip – it's a bridge between eras.
          </p>
          <p>
            On our website, immerse yourself in curated collections of these beloved games, ready
            for you to relive in bite-sized bursts. Join a passionate community of enthusiasts who
            share your love for retro gaming. Together, we honor the legacy of these games, ensuring
            that the magic lives on. Welcome to Ancient Gamer, where nostalgia finds its modern home
            and every pixel has a story to tell.
          </p>
        </div>
      </div>
    </div>
  )
}
