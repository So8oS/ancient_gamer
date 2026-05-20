import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { games } from '../../games'
import RufflePlayer from '../../components/RufflePlayer'

export const Route = createFileRoute('/games/$id')({
  loader: ({ params }) => {
    const game = games.find((g) => g.id === parseInt(params.id))
    return { game }
  },
  component: Game,
})

type Status = 'loading' | 'loaded' | 'error'

function Game() {
  const { game } = Route.useLoaderData()
  const [status, setStatus] = useState<Status>('loading')

  const useRuffle = game?.useRuffle === true && !!game?.swf

  return (
    <div className="flex flex-col justify-center items-center w-3/4 text-center">
      <h1 className="text-3xl font-LuckiestGuy mt-5">{game?.title}</h1>

      <div className="relative w-full h-[25rem] md:h-[45rem] mt-10">
        {status === 'loading' && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-900 rounded-2xl">
            <div className="h-16 w-16 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
          </div>
        )}

        {status === 'error' && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-900 rounded-2xl px-6">
            <p className="text-gray-100 font-LuckiestGuy text-lg">
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
            className="w-full h-full"
            src={game?.links?.[0]?.url}
            allowFullScreen
            loading="lazy"
            onLoad={() => setStatus('loaded')}
          />
        )}
      </div>

      {useRuffle && status !== 'error' && (
        <p className="text-gray-400 text-xs mt-2">Powered by Ruffle</p>
      )}

      <h1 className="bg-black p-2 rounded-2xl mt-5">
        All of the games are embedded from different websites
      </h1>
      <h1 className="bg-orange-800 p-4 rounded-2xl mt-2">
        Right click/long press {"=>"} Enter Full Screen to play with full screen
      </h1>
    </div>
  )
}
