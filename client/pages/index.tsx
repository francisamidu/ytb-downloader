import { ReactNode } from "react";
import { Home, Layout } from "../components";

const App = () => {
  return (
    <>
      <Home page="home" />
    </>
  );
};

App.getLayout = (page: ReactNode) => {
  return <Layout page="Home">{page}</Layout>;
};

export default App;
