import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = { title: "Terms of Service" };

const SECTIONS = [
  {
    title: "1. Services",
    body: "Bliss & K Developers provides software development, web design, and related digital services as defined in written project proposals or contracts. The scope of work, deliverables, timelines, and pricing are agreed in writing before any work commences.",
  },
  {
    title: "2. Payment terms",
    body: "A 50% deposit is required before work begins. The remaining 50% is due upon project completion, before handover of source code and deliverables. For larger projects (above KES 100,000), milestone-based payment structures may be agreed in writing. We accept M-Pesa and bank transfers.",
  },
  {
    title: "3. Revisions",
    body: "Each project includes an agreed number of revision rounds (typically 3), as stated in the project proposal. Revisions must fall within the originally agreed scope. Out-of-scope changes or additional revision rounds will be separately quoted and agreed before being carried out.",
  },
  {
    title: "4. Timelines",
    body: "Project timelines are established in writing in the proposal. Delays caused by the client — including late provision of content, feedback, or required approvals — may extend project timelines proportionally without any penalty to us.",
  },
  {
    title: "5. Intellectual property",
    body: "Upon receipt of full payment, the client receives full and exclusive ownership of all custom code, design assets, and files created specifically for their project. We retain the right to feature the work in our portfolio and marketing materials unless the client explicitly requests otherwise in writing.",
  },
  {
    title: "6. Client responsibilities",
    body: "The client is responsible for providing accurate and complete project requirements, timely feedback at agreed milestones, all necessary content (text, images, brand assets), and access credentials where required. Inaccurate, incomplete, or changing requirements may affect both timeline and cost.",
  },
  {
    title: "7. Confidentiality",
    body: "We treat all client project details as strictly confidential. We are willing to sign a Non-Disclosure Agreement (NDA) before project discussions. Clients must not share unauthorised third-party information, proprietary data, or access credentials belonging to others.",
  },
  {
    title: "8. Code warranty",
    body: "We provide a 30-day bug fix warranty on all delivered code. This covers defects that arise directly from our own implementation and does not cover issues caused by third-party services, client-managed hosting environments, or changes made to the code after handover.",
  },
  {
    title: "9. Limitation of liability",
    body: "Our total liability for any claim arising from a specific engagement is limited to the amount paid for that engagement. We are not liable for indirect, incidental, consequential, or special damages of any kind arising from the use, inability to use, or performance of delivered software.",
  },
  {
    title: "10. Third-party services",
    body: "We may integrate third-party services (e.g. M-Pesa Daraja API, Cloudinary, Resend, Vercel) on behalf of the client. We are not responsible for the availability, pricing changes, or policy changes of any third-party services.",
  },
  {
    title: "11. Governing law",
    body: "These Terms of Service are governed by and construed in accordance with the laws of the Republic of Kenya. Any disputes that cannot be resolved through good-faith negotiation between the parties may be submitted to binding arbitration.",
  },
  {
    title: "12. Changes to these terms",
    body: "We reserve the right to update these terms at any time. Material changes will be communicated to active clients. Continued engagement with our services after any update constitutes acceptance of the revised terms.",
  },
];

const INTRO = "These Terms of Service govern all project engagements between Bliss & K Developers and its clients. By commissioning our services — whether verbally, in writing, or by paying a deposit — you agree to be bound by these terms.";

export default function TermsPage() {
  return (
    <>
      <PageHeader
        badge="Legal"
        title="Terms of"
        titleAccent="Service"
        description="Last updated: June 2026"
        crumbs={[{ label: "Home", href: "/" }, { label: "Terms of service" }]}
      />
      <LegalLayout intro={INTRO} sections={SECTIONS} />
    </>
  );
}
