import Head from "next/head";
import React, { PropsWithChildren } from "react";
import { Navbar } from ".";

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
      <Navbar />
      {children}
    </>
  );
};

export default Layout;
