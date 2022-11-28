import React from "react";
import { Sidebar } from "./sidebar"
import { Root } from "./root"

export function App(){
  if (window.location.search === "?sidebar") {
    return <Sidebar />
  } else if  (window.location.search === "") {
    return <Root />
  } else {
    return null;
  }
}