import type { Metadata } from "next";
import ArabicWeddingInvitation from "@/components/arabic-wedding-invitation";

export const metadata: Metadata = {
  title: "دعوة زفاف أحمد ومريم",
  description: "دعوة زفاف أحمد ومريم، ليلة الخميس ١١ مارس ٢٠٢٧.",
};

export default function ArabicDemoPage() {
  return <ArabicWeddingInvitation />;
}