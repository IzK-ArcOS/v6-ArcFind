import { DefaultIcon } from "$ts/images/apps";
import { Runtime } from "./runtime";
import AppSvelte from "../App.svelte";
import { App } from "$types/app";
import { ArcFindIcon } from "$ts/images/general";
import { SafeMode } from "$state/Desktop/ts/store";

export const ArcFind: App = {
  metadata: {
    name: "ArcFind",
    description: "Search through ArcOS",
    author: "The ArcOS Team",
    version: "2.0.0",
    icon: ArcFindIcon,
    hidden: true,
    appGroup: "internal",
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
