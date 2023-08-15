/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { videos } from "./../games";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center p-3">
      {/* Navbar */}
      <div className="flex items-center gap-1 text-3xl font-bold">
        <h1 className="font-LuckiestGuy">Ancient Gamer</h1>
        <img className="w-14" src="/logo.png" alt="logo" />
      </div>

      {/* Card List */}
      {
        <div className="flex flex-wrap justify-center items-center gap-8 mt-10">
          {videos?.map((video) => (
            <div key={video.url} className="flex flex-col justify-center items-center border-b pb-3 ">
              {/* <img className="md:w-96 rounded-lg" src={video.image} alt="image" /> */}
              <iframe
                className=" h-96 md:w-96 rounded-lg mt-3"
                src={video.url}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
              {video.links.map((link) => (
                <Link key={link.id} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3" href={`./games/${video.id}`} rel="noreferrer">
                  Play Now
                </Link>
              ))}
            </div>
          ))}
        </div>
      }

      <div></div>
    </div>
  );
}
