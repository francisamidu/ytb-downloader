import { ReactNode } from "react";
import { Home, Layout } from "../components";

const Mp3Downloader = () => {
  return (
    <>
      <Home page="mp3-downloader" />
    </>
  );
};

Mp3Downloader.getLayout = (page: ReactNode) => {
  return <Layout page="Home">{page}</Layout>;
};

export default Mp3Downloader;
