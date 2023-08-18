/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import React from "react";

const About = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="flex flex-col justify-center items-center gap-10 w-full md:w-[60rem] bg-orange-800 md:p-20 rounded-2xl text-xl font-LuckiestGuy text-slate-200">
        <img className="w-32 " src="logo.png" alt="logo" />
        <div className="flex flex-col justify-center items-center gap-5">
          <p>
            Welcome to Ancient Gamer – your gateway to treasured gaming memories! Step into a world where flash games and vintage classics reign supreme, reigniting the spark of nostalgia in every
            pixel.
          </p>
          <p>
            Through captivating short-form videos on YouTube, TikTok, and Instagram, we transport you back to the enchantment of these timeless gems. Our focus? Flash games and old-school favorites
            that once captured our hearts and imaginations. But Ancient Gamer is more than just a nostalgia trip – it's a bridge between eras.
          </p>
          <p>
            On our website, immerse yourself in curated collections of these beloved games, ready for you to relive in bite-sized bursts. Join a passionate community of enthusiasts who share your love
            for retro gaming. Together, we honor the legacy of these games, ensuring that the magic lives on. Welcome to Ancient Gamer, where nostalgia finds its modern home and every pixel has a
            story to tell.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
