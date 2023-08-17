import { useRouter } from "next/router";
import React from "react";
import { videos } from "./../../games";

const Game = () => {
  const router = useRouter();
  // @ts-ignore
  const id = parseInt(router.query.id);
  const game = videos.find((game) => game.id === id);
  console.log(id);
  return (
    <div className=" flex flex-col  justify-center items-center w-3/4  ">
      <h1 className="text-3xl text-center font-LuckiestGuy mt-5">{game?.title}</h1>
      {/* @ts-ignore */}
      <iframe className="w-full h-[45rem] mt-10 " src={game?.links[0].url} frameBorder="no" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" scrolling="no"></iframe>
      <h1 className="bg-orange-800 p-10 rounded-2xl">Right click/long press {"=>"} Enter Full Screen to play with full screen </h1>
    </div>
  );
};

export default Game;
