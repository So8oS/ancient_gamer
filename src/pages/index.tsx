/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { videos } from "./../games";
import { useState } from "react";
import { ImMobile } from "react-icons/im";
import { GrInstagram } from "react-icons/gr";
import { FaTiktok } from "react-icons/fa";
import { BsYoutube } from "react-icons/bs";

export default function Home() {
  const [view, setView] = useState("all");
  const filteredVideos = view === "phone" ? videos.filter((video) => video.playableOnPhone) : videos;

  return (
    <div className="flex flex-col justify-center items-center p-3 text-gray-100 ">
      {/* Navbar */}
      <div className="flex justify-between items-center gap-1  w-full h-16  bg-slate-700 rounded-3xl px-4 ">
        <div className="flex justify-center items-center ">
          <h1 className="font-LuckiestGuy text-2xl ">Ancient Gamer</h1>
          <img className="w-14" src="/logo.png" alt="logo" />
        </div>

        <div className="flex justify-center items-center gap-2">
          <Link href={"https://www.instagram.com/ancient_gamer23/"} target="_blank" className="">
            <GrInstagram className="h-5 w-5" />
          </Link>
          <Link href={"https://www.tiktok.com/@ancient_gamer23?is_from_webapp=1&sender_device=pc"} target="_blank" className="">
            <FaTiktok className="h-5 w-5" />
          </Link>
          <Link href={"https://www.youtube.com/@entube6637/shorts"} target="_blank" className="">
            <BsYoutube className="h-5 w-5" />
          </Link>
        </div>
      </div>

      <div className="flex gap-3 mt-10">
        <button
          onClick={() => setView("all")}
          className={`${view === "all" ? "bg-blue-700" : "bg-blue-500"} hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-3xl border border-blue-500 shadow-2xl`}
        >
          All Games
        </button>
        <button
          onClick={() => setView("phone")}
          className={`${view === "phone" ? "bg-blue-700" : "bg-blue-500"} hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-3xl border border-blue-500 shadow-2xl`}
        >
          Playble On Phone
        </button>
      </div>

      {/* Card List */}
      <div className="flex flex-wrap justify-center gap-8 mt-10">
        {filteredVideos.map((video) => (
          <div key={video.url} className="flex flex-col items-center border-b pb-3 ">
            <iframe
              className="h-96 md:w-96 rounded-lg mt-3 shadow"
              src={video.url}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
            <div className="flex justify-center items-center ">
              <h1 className="text-xl font-LuckiestGuy mt-2">{video.title}</h1>
              {video.playableOnPhone && <ImMobile className="h-6 w-6 pt-1 " />}
            </div>
            <h1 className=" font-LuckiestGuy  mt-2 bg-red-700 p-2 rounded-lg">{video.platform}</h1>
            {video.available &&
              video.links.map((link) => (
                <Link key={link.id} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mt-3 shadow" target="_blank" href={`./games/${video.id}`} rel="noreferrer">
                  Play Now
                </Link>
              ))}
          </div>
        ))}
      </div>

      <div className="w-full h-16  bg-slate-700 flex justify-center items-center mt-5 gap-2 rounded-3xl">
        <Link className="font-LuckiestGuy " href={"/privacy"}>
          Privacy Policy
        </Link>
        <Link className="font-LuckiestGuy " href={"/privacy"}>
          Contact Us
        </Link>
      </div>
    </div>
  );
}
