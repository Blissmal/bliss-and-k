import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import FaqPageClient from "@/components/faq/FaqPageClient";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about Bliss & K Developers — pricing, timelines, M-Pesa integration, project process, and more.",
};

export default function FaqPage() {
  return (
    <>
      <PageHeader
        badge="Help centre"
        title="Frequently asked"
        titleAccent="questions."
        description="Everything you need to know before starting a project with us."
        crumbs={[{ label: "Home", href: "/" }, { label: "FAQ" }]}
      />
      <FaqPageClient />
    </>
  );
}
