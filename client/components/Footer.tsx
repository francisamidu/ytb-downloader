import React, { useState } from "react";

const Footer = () => {
  const [date, _] = useState(new Date().getFullYear());
  return (
    <div className="p-3 self-end">
      <footer className="md:max-w-screen-lg md:mx-auto">
        <p className="flex fles-row items-center justify-center">
          <span className="mr-1.5">Copyright &copy;{date}</span>
          <span className="ml-1.5">Ytb Downloader</span>
        </p>
      </footer>
    </div>
  );
};

export default Footer;
