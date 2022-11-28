import { registerSidebarTool } from "@whiteboards-io/plugins";
import {useEffect} from "react";

export function Root() {
  useEffect(() => {
    const baseUrl = window.location.origin + window.location.pathname.replace(/^\/$/, '');

    registerSidebarTool({
      id: "plugin-shortcut",
      icon: baseUrl + "icon.jpeg",
      tooltip: "Shortcut",
      contentUrl: baseUrl + "?sidebar"
    })
  }, []);

  return null;
}

