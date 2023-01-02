import Head from "next/head";
import React, { PropsWithChildren } from "react";
import { Footer, Navbar } from ".";

interface LayoutProps extends Partial<PropsWithChildren> {
  page: string;
}
const Layout = ({ children, page }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{page} | Ytb Downloader</title>
        <meta name="title" content={`${page} | Ytb Downloader`}></meta>
        <meta name="description" content="Youtube Downloader"></meta>
      </Head>
      <main className="flex flex-col justify-between min-h-[95vh]">
        <Navbar />
        {children}
        <Footer />
      </main>
    </>
  );
};

export default Layout;
