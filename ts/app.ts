import { SafeMode } from "$state/Desktop/ts/store";
import { ArcFindIcon } from "$ts/images/general";
import { App } from "$types/app";
import AppSvelte from "../App.svelte";
import { Runtime } from "./runtime";

// Application metadata
export const ArcFind: App = {
  metadata: {
    name: "ArcFind",
    description: "Search through ArcOS",
    author: "The ArcOS Team",
    version: "2.0.0",
    icon: ArcFindIcon,
    hidden: true,
    appGroup: "internal",
    dependendsOn: ["ArcShell"],
  },
  runtime: Runtime,
  content: AppSvelte,
  id: "ArcFind",
  size: { w: 600, h: 500 },
  minSize: { w: 600, h: 500 },
  maxSize: { w: 600, h: 500 },
  pos: { x: 0, y: 0 },
  state: {
    minimized: false,
    maximized: false,
    headless: true,
    fullscreen: false,
    resizable: false,
  },
  controls: {
    minimize: false,
    maximize: false,
    close: false,
  },
  singleInstance: true,
  isOverlay: true,
  loadCondition: () => !SafeMode.get(),
};
