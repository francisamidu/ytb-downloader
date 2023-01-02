import React, { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [links, setLinks] = useState([
    {
      active: false,
      text: "YouTube Downloader",
      link: "/",
    },
    {
      active: false,
      text: "Playlist Downloader",
      link: "/playlist",
    },
    {
      active: false,
      text: "Mp3 Downloader",
      link: "/mp3-downloader",
    },
  ]);
  return (
    <nav className="bg-white px-2 sm:px-4 py-2 w-full border-b border-slate-200">
      <div className="container flex flex-wrap items-center justify-between md:max-w-screen-md mx-auto">
        <span className="self-center text-sm uppercase font-bold whitespace-nowrap text-[#3d348b]">
          Ytb-Downloader
        </span>

        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 mt-4 border border-slate-100 rounded-lg bg-slate-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white">
            {links.map(({ active, link, text }, index) => {
              return (
                <li key={index}>
                  <Link
                    href={link}
                    className={`block py-2 pl-3 pr-4 ${
                      active ? "text-[#3d348b]" : "text-slate-700"
                    } rounded hover:bg-slate-100 md:hover:bg-transparent
                md:hover:text-[#3d348b] md:p-0 md:dark:hover:bg-transparent`}
                  >
                    {text}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
