import type { Metadata } from "next";
import { ServicesShowcase } from "@/components/ServicesShowcase";
import { WritersNote } from "@/components/WritersNote";

export const metadata: Metadata = {
  title: "Services",
  description: "Research papers, CVs and cover letters, proposals and business plans, written by Tanzanian writers who know your reader.",
};

export default function ServicesPage() {
  return (
    <>
      <ServicesShowcase />
      <WritersNote />
    </>
  );
}
