import type { Metadata } from "next";
import { InstallerNetworkPageClient } from "@/components/InstallerNetworkPageClient";

export const metadata: Metadata = {
  title: "Glass Railing Installers Ontario | 2205 Spigots",
  description:
    "Find trusted glass and aluminum railing installers across Ontario. Serving Toronto, GTA, and surrounding regions. Get connected today."
};

export default function InstallerNetworkPage() {
  return <InstallerNetworkPageClient />;
}
