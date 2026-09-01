import type { Metadata } from "next";
import LegalPage from "@/components/ui/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How techcadd Mohali collects, uses and protects the information you share with us.",
};

export default function PrivacyPolicy() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="1 September 2026"
      sections={[
        {
          heading: "What we collect",
          body: [
            "When you submit an enquiry, book a demo class or call the centre, we collect the details you give us — typically your name, phone number, email address, the course you are interested in and any message you write.",
            "Our website may also collect basic technical information such as browser type and pages visited, used only to understand how the site is performing.",
          ],
        },
        {
          heading: "How we use it",
          body: [
            "Your details are used to respond to your enquiry, arrange counselling or a demo class, and share information about batches, fees and schedules that you have asked about.",
            "If you enrol, we use your information to administer your course, issue certificates and, with your consent, share your profile with hiring partners as part of placement assistance.",
          ],
        },
        {
          heading: "Who we share it with",
          body: [
            "We do not sell your information. We share it only with our own staff, and — for enrolled students who opt into placement support — with hiring partner companies.",
            "We may disclose information where required by law.",
          ],
        },
        {
          heading: "How long we keep it",
          body: [
            "Enquiry records are retained for as long as needed to follow up, and student records for as long as required to support certification and placement services.",
          ],
        },
        {
          heading: "Your choices",
          body: [
            `You can ask us to correct or delete your information at any time by writing to ${site.email} or calling ${site.phone}. You can also ask to stop receiving batch and course updates.`,
          ],
        },
        {
          heading: "Contact",
          body: [
            `${site.legalName}, ${site.address.line1}, ${site.address.line2}, ${site.address.line3}. Email ${site.email} · Phone ${site.phone}.`,
          ],
        },
      ]}
    />
  );
}
