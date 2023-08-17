/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import { GrInstagram } from "react-icons/gr";
import { FaTiktok } from "react-icons/fa";
import { BsYoutube } from "react-icons/bs";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center gap-1  w-full h-16  bg-slate-700 rounded-3xl px-4 ">
      <div
        className="flex justify-center items-center cursor-pointer  "
        onClick={() => {
          window.location.href = "/";
        }}
      >
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
  );
};

export default Navbar;
