import { NextPage } from "next/types";
import React from "react";
import Header from "./Header";

const Layout: NextPage = (props) => {
  return (
    <div>
      <Header />
      <div>{props.children}</div>
    </div>
  );
};

export default Layout;
