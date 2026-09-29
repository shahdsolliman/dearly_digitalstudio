import type { Metadata } from "next";
import SilverWeddingInvitation from "@/components/silver-wedding-invitation";

export const metadata: Metadata = {
  title: "Mohamed & Farah | Silver Wedding Invitation",
  description: "An elegant silver invitation to celebrate Mohamed and Farah.",
};

export default function SilverDemoPage() {
  return <SilverWeddingInvitation />;
}