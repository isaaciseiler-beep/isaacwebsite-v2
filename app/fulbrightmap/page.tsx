import type { Metadata } from "next";

import FulbrightMapApp from "./FulbrightMapApp";

export const metadata: Metadata = {
  title: "New Taipei Favorite Spots",
  description: "An interactive community map of favorite spots in New Taipei.",
  alternates: {
    canonical: "/fulbrightmap",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function FulbrightMapPage() {
  return <FulbrightMapApp />;
}
