import { NextPage } from "next/types";
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
const Layout: NextPage = (props) => {
  return (
    <div>
      <Header />
      <div>{props.children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
