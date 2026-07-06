import type { Metadata } from "next";
import AskDoubt from "@/components/website/AskDoubt";

export const metadata: Metadata = {
  title: "Ask Doubts | Disha Arts Classes",
  description: "Have a arts doubt? Ask the expert teachers at Disha Arts Classes. We provide quick and accurate solutions for Bihar Board Arts students.",
  alternates: {
    canonical: "https://www.dishaonlineartsclasses.com/ask-doubt",
  },
};

export default function AskDoubtPage() {
  return <AskDoubt />;
}
