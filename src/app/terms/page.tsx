import type { Metadata } from "next";
import LegalPage from "@/components/ui/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms governing enrolment, fees, attendance and placement assistance at techcadd Mohali.",
};

export default function Terms() {
  return (
    <LegalPage
      title="Terms & Conditions"
      updated="1 September 2026"
      sections={[
        {
          heading: "Enrolment",
          body: [
            "Admission to any programme is confirmed only once the registration formalities are completed and the applicable fee instalment is paid. Seats in a batch are limited and allotted in order of confirmation.",
          ],
        },
        {
          heading: "Fees and instalments",
          body: [
            "Fees, instalment schedules and any EMI arrangements are communicated at the time of counselling and form part of your enrolment record. Fees once paid are non-transferable to another person.",
            "Refunds, where applicable, follow the refund terms shared with you at enrolment.",
          ],
        },
        {
          heading: "Attendance and conduct",
          body: [
            "Students are expected to maintain the attendance required for certification and to conduct themselves professionally in classrooms, labs and project teams.",
            "Access to labs, recordings and the student portal is personal to you and may not be shared.",
          ],
        },
        {
          heading: "Course content",
          body: [
            "Curriculum, trainers, tools and batch schedules may be revised to keep programmes current with industry practice. Material provided during a course is for your personal learning and may not be redistributed.",
          ],
        },
        {
          heading: "Placement assistance",
          body: [
            "Placement assistance means active support — profile preparation, interview practice and introductions to hiring partners. It is not a guarantee of employment, and outcomes depend on your performance in the programme and in interviews.",
          ],
        },
        {
          heading: "Contact",
          body: [
            `Questions about these terms can be sent to ${site.email} or raised at ${site.legalName}, ${site.address.line2}, ${site.address.line3}.`,
          ],
        },
      ]}
    />
  );
}
