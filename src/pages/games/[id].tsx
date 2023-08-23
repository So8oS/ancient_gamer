import { useRouter } from "next/router";
import React from "react";
import { videosAtom } from "./../../games";
import { useAtom } from "jotai";

const Game = () => {
  const router = useRouter();
  // @ts-ignore
  const id = parseInt(router.query.id);
  const [videos] = useAtom(videosAtom);
  const game = videos.find((game) => game.id === id);
  console.log(id);
  return (
    <div className=" flex flex-col  justify-center items-center w-3/4 text-center  ">
      <h1 className="text-3xl  font-LuckiestGuy mt-5">{game?.title}</h1>
      {/* @ts-ignore */}
      <iframe
        className="w-full h-[25rem] md:h-[45rem] mt-10 "
        src={game?.links[0].url}
        frameBorder="no"
        // @ts-ignore
        allowfullscreen="true"
        webkitallowfullscreen="true"
        mozallowfullscreen="true"
        scrolling="no"
      ></iframe>

      <h1 className="bg-black p-2 rounded-2xl mt-5 ">All of the games are embedded from different websites  </h1>


      <h1 className="bg-orange-800 p-4 rounded-2xl mt-2 ">Right click/long press {"=>"} Enter Full Screen to play with full screen </h1>
    </div>
  );
};

export default Game;
