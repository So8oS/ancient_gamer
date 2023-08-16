/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { videos } from "./../games";
import { useState } from "react";

export default function Home() {
  const [view, setView] = useState("all");
  const filteredVideos = view === "phone" ? videos.filter((video) => video.playableOnPhone) : videos;

  return (
    <div className="flex flex-col justify-center items-center p-3">
      {/* Navbar */}
      <div className="flex items-center gap-1 text-3xl font-bold">
        <h1 className="font-LuckiestGuy">Ancient Gamer</h1>
        <img className="w-14" src="/logo.png" alt="logo" />
      </div>

      <div className="flex gap-3 mt-10">
        <button onClick={() => setView("all")} className={`${view === "all" ? "bg-blue-700" : "bg-blue-500"} hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-3xl border border-blue-500`}>
          All Games
        </button>
        <button onClick={() => setView("phone")} className={`${view === "phone" ? "bg-blue-700" : "bg-blue-500"} hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-3xl border border-blue-500`}>
          Playble On Phone
        </button>
      </div>

      {/* Card List */}
      <div className="flex flex-wrap justify-center gap-8 mt-10">
        {filteredVideos.map((video) => (
          <div key={video.url} className="flex flex-col items-center border-b pb-3 ">
            <iframe
              className="h-96 md:w-96 rounded-lg mt-3"
              src={video.url}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
            <h1 className="text-xl font-LuckiestGuy mt-2">{video.title}</h1>
            {video.available &&
              video.links.map((link) => (
                <Link key={link.id} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3" target="_blank" href={`./games/${video.id}`} rel="noreferrer">
                  Play Now
                </Link>
              ))}
            {video.playableOnPhone && view === "all" && <p className="text-green-500 text-lg">Playable on Phone !!</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
