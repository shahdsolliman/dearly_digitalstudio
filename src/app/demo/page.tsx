import type { Metadata } from "next";
import WeddingInvitation from "@/components/wedding-invitation";

export const metadata: Metadata = {
  title: "Mohamed & Farah | Wedding Invitation",
  description: "A little invitation to celebrate Mohamed and Farah.",
};

export default function DemoPage() {
  return <WeddingInvitation />;
}