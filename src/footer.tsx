import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="w-full h-16  bg-slate-700 flex justify-center items-center mt-5 gap-2 rounded-3xl">
      <Link className="font-LuckiestGuy " href={"/privacy"}>
        Privacy Policy
      </Link>
      <Link className="font-LuckiestGuy " href={"/privacy"}>
        Contact Us
      </Link>
    </div>
  );
};

export default Footer;
