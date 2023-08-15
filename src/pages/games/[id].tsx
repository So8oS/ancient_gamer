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
    <div className=" flex flex-col justify-center items-center min-h-screen">
      {/* @ts-ignore */}
      <iframe className="w-full h-[45rem]" src={game?.links[0].url} frameBorder="no" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" scrolling="no"></iframe>
    </div>
  );
};

export default Game;
