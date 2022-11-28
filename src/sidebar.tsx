import React from "react";
import { createCards } from "@whiteboards-io/plugins";

export function Sidebar() {
  const createShortcut = () => {
    createCards([
      {
        height: 100,
        width: 100,
        x: 0,
        y: 0,
        props: {}
      }
    ]);
  };

  return (
    <>
      <h1>Working coooool</h1>
      <button onClick={createShortcut}>Spawn shortcut card</button>
    </>
);
}
