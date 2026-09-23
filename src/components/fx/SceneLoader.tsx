"use client";

import dynamic from "next/dynamic";

const OrbScene = dynamic(() => import("./OrbScene"), { ssr: false });

export default function SceneLoader() {
  return <OrbScene />;
}
