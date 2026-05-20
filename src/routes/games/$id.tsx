import { createFileRoute } from '@tanstack/react-router'
import { useAtom } from 'jotai'
import { videosAtom } from '../../games'

export const Route = createFileRoute('/games/$id')({
  component: Game,
})

function Game() {
  const { id } = Route.useParams()
  const [videos] = useAtom(videosAtom)
  const game = videos.find((g) => g.id === parseInt(id))

  return (
    <div className="flex flex-col justify-center items-center w-3/4 text-center">
      <h1 className="text-3xl font-LuckiestGuy mt-5">{game?.title}</h1>
      <iframe
        className="w-full h-[25rem] md:h-[45rem] mt-10"
        src={game?.links[0].url}
        allowFullScreen
      />
      <h1 className="bg-black p-2 rounded-2xl mt-5">
        All of the games are embedded from different websites
      </h1>
      <h1 className="bg-orange-800 p-4 rounded-2xl mt-2">
        Right click/long press {"=>"} Enter Full Screen to play with full screen
      </h1>
    </div>
  )
}
