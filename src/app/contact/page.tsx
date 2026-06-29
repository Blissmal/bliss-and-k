import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ContactPageClient from "@/components/contact/ContactPageClient";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project with Bliss & K Developers. Fill in your details and we'll reply within 2–4 hours with a clear scope and quote.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        badge="Let's talk"
        title="Get in"
        titleAccent="touch."
        description="Tell us about your project. We'll review it and reply with clarity on scope, timeline, and cost — usually within a few hours."
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />
      <ContactPageClient />
    </>
  );
}
