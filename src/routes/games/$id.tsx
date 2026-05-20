import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { games } from '../../games'

export const Route = createFileRoute('/games/$id')({
  loader: ({ params }) => {
    const game = games.find((g) => g.id === parseInt(params.id))
    return { game }
  },
  component: Game,
})

function Game() {
  const { game } = Route.useLoaderData()
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="flex flex-col justify-center items-center w-3/4 text-center">
      <h1 className="text-3xl font-LuckiestGuy mt-5">{game?.title}</h1>

      <div className="relative w-full h-[25rem] md:h-[45rem] mt-10">
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900 rounded-2xl">
            <div className="h-16 w-16 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
          </div>
        )}
        <iframe
          className="w-full h-full"
          src={game?.links[0].url}
          allowFullScreen
          loading="lazy"
          onLoad={() => setLoaded(true)}
        />
      </div>

      <h1 className="bg-black p-2 rounded-2xl mt-5">
        All of the games are embedded from different websites
      </h1>
      <h1 className="bg-orange-800 p-4 rounded-2xl mt-2">
        Right click/long press {"=>"} Enter Full Screen to play with full screen
      </h1>
    </div>
  )
}
