import { ReactNode } from "react";
import { Home, Layout } from "../components";

const Playlist = () => {
  return (
    <>
      <Home page="playlist" />
    </>
  );
};

Playlist.getLayout = (page: ReactNode) => {
  return <Layout page="Home">{page}</Layout>;
};

export default Playlist;
