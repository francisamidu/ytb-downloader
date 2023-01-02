import React, { useState } from "react";

const Footer = () => {
  const [date, _] = useState(new Date().getFullYear());
  return (
    <div className="h-full p-3 border-t border-gray-200 flex flex-col justify-center ">
      <footer className="md:max-w-screen-lg md:mx-auto">
        <p className="flex flex-row items-center justify-center">
          <span className="mr-1.5">Copyright &copy;{date}</span>
          <span className="ml-1.5">Ytb Downloader</span>
        </p>
      </footer>
    </div>
  );
};

export default Footer;
