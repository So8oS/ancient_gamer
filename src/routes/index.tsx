import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { useAtom } from 'jotai'
import { ImMobile } from 'react-icons/im'
import { videosAtom } from '../games'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const [view, setView] = useState('all')
  const [videos] = useAtom(videosAtom)
  const [sliceValue, setSliceValue] = useState(8)

  useEffect(() => {
    setSliceValue(8)
  }, [view])

  const filteredVideos =
    view === 'phone' ? videos.filter((v) => v.playableOnPhone) : videos

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center p-10 w-10/12 md:w-[45rem] mt-5 text-center md:rounded-none rounded-lg bg-[url('/cage3.png')] bg-orange-800 font-LuckiestGuy">
        <h1 className="text-4xl">Let's Get a bit Nostalgic Eh?</h1>
      </div>

      <div className="flex gap-3 mt-10">
        <button
          onClick={() => setView('all')}
          className={`${
            view === 'all' ? 'bg-blue-700' : 'bg-blue-500'
          } hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-3xl border border-blue-500 shadow-2xl`}
        >
          All Games
        </button>
        <button
          onClick={() => setView('phone')}
          className={`${
            view === 'phone' ? 'bg-blue-700' : 'bg-blue-500'
          } hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-3xl border border-blue-500 shadow-2xl`}
        >
          Playble On Phone
        </button>
      </div>

      {/* Card grid */}
      <div className="flex flex-wrap justify-center gap-8 mt-10">
        {[...filteredVideos]
          .reverse()
          .slice(0, sliceValue)
          .map((video) => (
            <div key={video.url} className="flex flex-col items-center border-b pb-3">
              <iframe
                className="h-96 md:w-96 rounded-lg mt-3 shadow"
                src={video.url}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
              <div className="flex justify-center items-center">
                <h1 className="md:text-xl text-lg font-LuckiestGuy mt-2">{video.title}</h1>
                {video.playableOnPhone && <ImMobile className="h-6 w-6 pt-1" />}
              </div>
              <h1 className="font-LuckiestGuy mt-2 bg-red-700 p-2 rounded-lg">
                {video.platform}
              </h1>
              {video.available && (
                <Link
                  to="/games/$id"
                  params={{ id: String(video.id) }}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mt-3 shadow"
                >
                  Play Now
                </Link>
              )}
            </div>
          ))}
      </div>

      {sliceValue < filteredVideos.length && (
        <button
          onClick={() => setSliceValue((v) => v + 8)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-3xl border border-blue-500 shadow-2xl mt-5"
        >
          Show More
        </button>
      )}
    </div>
  )
}
