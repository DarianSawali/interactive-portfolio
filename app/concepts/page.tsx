import type { Metadata } from "next";
import ConceptsPreview from "./ConceptsPreview";

export const metadata: Metadata = {
  title: "Portfolio Design Concepts",
  robots: { index: false, follow: false },
};

export default function ConceptsPage() {
  return <ConceptsPreview />;
}
