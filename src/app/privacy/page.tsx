import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = { title: "Privacy Policy" };

const SECTIONS = [
  {
    title: "1. Information we collect",
    body: "When you contact us through this website or by phone, we may collect your name, email address, phone number, and project details you choose to share. We do not collect payment information through this website.",
  },
  {
    title: "2. How we use your information",
    body: "We use your information solely to respond to your enquiries, prepare quotes and proposals, communicate about your project, and send project-related updates. We will not use your data for marketing purposes without your explicit consent.",
  },
  {
    title: "3. Information sharing",
    body: "We do not sell, rent, or share your personal information with any third parties. All project details are kept strictly confidential. We are happy to sign a Non-Disclosure Agreement (NDA) before discussing sensitive project information.",
  },
  {
    title: "4. Data retention",
    body: "We retain your contact information only as long as necessary to fulfil the purpose for which it was collected, or as required by applicable law. You may request deletion of your data at any time by contacting us.",
  },
  {
    title: "5. Security",
    body: "We take reasonable and appropriate measures to protect the information you share with us. No method of electronic transmission or storage is 100% secure. We will notify you promptly if we become aware of any breach affecting your personal data.",
  },
  {
    title: "6. Your rights",
    body: "You have the right to access, correct, or request deletion of any personal information we hold about you. To exercise any of these rights, please contact us on 0743 942 007 (call or WhatsApp).",
  },
  {
    title: "7. Cookies",
    body: "This website may use essential cookies for basic functionality. We do not use tracking cookies, advertising cookies, or analytics that identify you personally without your consent.",
  },
  {
    title: "8. Changes to this policy",
    body: "We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date. Your continued use of our services following any such changes constitutes your acceptance of the updated policy.",
  },
  {
    title: "9. Contact us",
    body: "If you have questions about this Privacy Policy or how we handle your personal data, please reach us on 0743 942 007 (call or WhatsApp), Monday to Saturday, 8am–8pm EAT.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        badge="Legal"
        title="Privacy"
        titleAccent="Policy"
        description="Last updated: June 2026"
        crumbs={[{ label: "Home", href: "/" }, { label: "Privacy policy" }]}
      />

      <section className="relative z-10 px-6 lg:px-12 pb-28">
        <div className="max-w-3xl mx-auto">
          <div
            className="rounded-2xl p-8 md:p-10"
            style={{
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            {/* Intro */}
            <div
              className="mb-10 pl-5 py-1"
              style={{ borderLeft: "3px solid #3C50E0" }}
            >
              <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                Bliss & K Developers ("we", "us", "our") is committed to protecting your personal information and your right to privacy. This policy explains how we collect, use, and safeguard data when you engage with our services or contact us.
              </p>
            </div>

            {/* Sections */}
            <div className="space-y-8">
              {SECTIONS.map((s, i) => (
                <div key={i}>
                  <h2
                    className="text-base font-bold mb-3"
                    style={{ color: "rgba(255,255,255,0.9)" }}
                  >
                    {s.title}
                  </h2>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                  >
                    {s.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
