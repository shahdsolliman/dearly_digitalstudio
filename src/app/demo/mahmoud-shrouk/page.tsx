import type { Metadata } from "next";
import MahmoudWeddingInvitation from "@/components/mahmoud-wedding-invitation";

export const metadata: Metadata = {
  title: "The Storybook Edit — Wedding Invitation",
  description: "A story-led wedding invitation with handwritten romantic details.",
};

export default function MahmoudShroukPage() {
  return <MahmoudWeddingInvitation />;
}