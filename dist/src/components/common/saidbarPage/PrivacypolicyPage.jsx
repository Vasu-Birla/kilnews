import { useEffect, useRef } from "react";

const sections = [
  {
    number: "1",
    title: "Registration & User Information",
    content: `To access certain services available on emsindia.com, users may be required to provide personal information, including but not limited to:`,
    list: ["Full Name", "Email Address", "Gender", "Age", "Postal / PIN Code", "Payment Information (Credit/Debit Card Details)", "Occupation", "Interests and Preferences", "Username and Password"],
    extra: `Additional information may be requested depending on the nature of the service. This information helps us improve our services and provide users with a better experience.\n\nAny information that is publicly available, accessible under applicable laws, or voluntarily shared by the user may not be considered sensitive personal information.`,
  },
  {
    number: "2",
    title: "Cookies & Automatic Data Collection",
    content: `Our website may use cookies and similar technologies to enhance user experience. Cookies may be used for:`,
    list: ["Remembering user preferences", "Saving login sessions", "Delivering personalized advertisements", "Measuring website traffic and analytics", "Improving site performance"],
    extra: `When you visit emsindia.com, our servers may automatically collect certain technical data such as IP Address, Browser Type, Device Information, Date & Time of Visit, and Pages Visited.\n\nThird-party advertisers may also place cookies on your device if you interact with advertisements displayed on the Site.`,
  },
  {
    number: "3",
    title: "Third-Party Links",
    content: `Our website may contain links to third-party websites. Once you leave emsindia.com, the privacy practices of those external websites apply. We are not responsible for the content, policies, or practices of third-party sites. Users are encouraged to review their privacy policies independently.`,
    list: [],
    extra: "",
  },
  {
    number: "4",
    title: "Sharing of Information",
    content: `Express Media Service may disclose personal information in the following circumstances:`,
    subsections: [
      { label: "a. Legal Compliance", text: "Where disclosure is required by law, court order, government authority, or regulatory body for purposes such as identity verification, prevention of fraud, investigation of cyber incidents, or prosecution of offenses." },
      { label: "b. Business Transfers", text: "If Express Media Service or any part of its operations is merged, acquired, sold, or transferred, user information may be transferred as part of that transaction." },
      { label: "c. Internal Processing", text: "Information may be shared with employees, officers, affiliates, and trusted service providers strictly for business operations and service delivery, subject to confidentiality obligations." },
      { label: "d. Advertising & Analytics", text: "We may share aggregated or non-personal data with advertisers or partners to help them understand audience interests and advertising effectiveness." },
    ],
    list: [],
    extra: "",
  },
  {
    number: "5",
    title: "Communications",
    content: `We may use your information to send:`,
    list: ["Newsletters", "Promotional Messages", "Marketing Offers", "Service Notifications", "Important Account Updates"],
    extra: "Users may opt out of promotional communications where applicable.",
  },
  {
    number: "6",
    title: "Access, Correction & Deletion of Information",
    content: `Users may request access to their personal data and ask for corrections, updates, or deletion where feasible and legally permissible.\n\nWe may require verification of identity before processing such requests. Certain information may be retained where required by law, legitimate business needs, or backup systems.`,
    list: [],
    extra: "",
  },
  {
    number: "7",
    title: "Data Security",
    content: `We take reasonable technical and organizational measures to protect personal data against unauthorized access, misuse, alteration, or disclosure. These measures include:`,
    list: ["Secure servers", "Firewalls", "Password-protected systems", "Restricted access controls", "Encryption where appropriate"],
    extra: "However, no online system is completely secure. We cannot guarantee absolute security of information transmitted over the internet.",
  },
  {
    number: "8",
    title: "Advertising",
    content: `We may use third-party advertising companies to display ads when you visit emsindia.com. These companies may use non-personally identifiable information about your visits to this and other websites in order to provide advertisements relevant to your interests.`,
    list: [],
    extra: "",
  },
];

const contestSections = [
  { number: "1", title: "Original Content", text: "The participant represents and warrants that any submitted content is original, owned by the participant, and does not infringe the rights of any third party, including copyrights, trademarks, privacy rights, or intellectual property rights." },
  { number: "2", title: "Prohibited Content", text: "Entries must not contain obscene, defamatory, offensive, sexually explicit, misleading, unlawful, or inappropriate material." },
  { number: "3", title: "Governing Law", text: "All contests shall be governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts located in Madhya Pradesh, India." },
  { number: "4", title: "Winner Decisions", text: "All decisions made by judges or organizers shall be final and binding." },
  { number: "5", title: "Use of Winner Content", text: "If selected as a winner, participants agree that Express Media Service may use their name, photograph, likeness, submitted content, or voice for publicity, promotional, print, or online purposes without additional compensation, unless prohibited by law." },
  { number: "6", title: "Taxes & Charges", text: "Any taxes, fees, duties, or charges associated with prizes shall be the sole responsibility of the winner." },
  { number: "7", title: "Prize Claim Period", text: "If a selected winner cannot be contacted, fails to respond within ten (10) days, or refuses the prize, the prize may be forfeited and awarded to another eligible participant." },
  { number: "8", title: "Verification & Disqualification", text: "We reserve the right to verify the identity and eligibility of any participant and disqualify entries that violate these terms or involve fraud or tampering." },
  { number: "9", title: "Content Rights", text: "Express Media Service may reuse, republish, modify, distribute, or monetize content submitted by participants in print, digital, or promotional formats." },
];

function FadeIn({ children, delay = 0 }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
        obs.unobserve(el);
      }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return <div ref={ref}>{children}</div>;
}

export default function PrivacyPolicyPage() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", background: "#fff", minHeight: "100vh" }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .pp-wrap { padding: 30px 70px 60px 90px; max-width: 1200px; margin: 0 auto; }
        .pp-page-title { font-size: 24px; font-weight: 700; color: #0a2463; margin-bottom: 12px; }
        .pp-intro { font-size: 14px; color: #444; line-height: 1.7; margin-bottom: 24px; }
        .pp-divider { border: none; border-top: 2px solid #c0392b; margin-bottom: 28px; }
        .pp-section-heading { font-size: 17px; font-weight: 700; color: #0a2463; border-left: 4px solid #c0392b; padding-left: 10px; margin: 28px 0 16px; }
        .pp-item { margin-bottom: 22px; }
        .pp-item-title { font-size: 14.5px; font-weight: 700; color: #c0392b; margin-bottom: 7px; display: inline-block; transition: color 0.2s; cursor: default; }
        .pp-item:hover .pp-item-title { color: #0a2463; }
        .pp-text { font-size: 14px; color: #333; line-height: 1.8; white-space: pre-line; }
        .pp-list { list-style: none; margin: 8px 0; padding: 0; }
        .pp-list li { font-size: 14px; color: #333; line-height: 1.75; padding-left: 14px; position: relative; }
        .pp-list li::before { content: "•"; color: #333; position: absolute; left: 0; }
        .pp-sub-item { margin: 8px 0 8px 14px; }
        .pp-sub-label { font-size: 14px; font-weight: 700; color: #333; }
        .pp-sub-text { font-size: 14px; color: #333; line-height: 1.75; }
        .pp-contact-section { margin-top: 28px; }
        .pp-contact-title { font-size: 17px; font-weight: 700; color: #0a2463; border-left: 4px solid #c0392b; padding-left: 10px; margin-bottom: 14px; }
        .pp-contact-row { margin-bottom: 10px; }
        .pp-contact-label { font-size: 13px; font-weight: 700; color: #333; }
        .pp-contact-val { font-size: 14px; color: #444; line-height: 1.6; }
      `}</style>

      <div className="pp-wrap">

        <FadeIn delay={0}>
          <h1 className="pp-page-title">Privacy Policy</h1>
          <p className="pp-intro">
            At Express Media Service, we respect your privacy and are committed to protecting your personal information. By accessing or using the services provided through emsindia.com, you agree to the collection, storage, and use of your information in accordance with this Privacy Policy.
          </p>
          <hr className="pp-divider" />
        </FadeIn>

        <FadeIn delay={80}>
          <div className="pp-section-heading">Privacy Policy</div>
        </FadeIn>
<p>Express Media Service is a business unit of Express Group.</p>

        {sections.map((sec, i) => (
          <FadeIn key={sec.number} delay={100 + i * 60}>
            <div className="pp-item">
              <div className="pp-item-title">{sec.number}. {sec.title}</div>
              {sec.content && <p className="pp-text">{sec.content}</p>}
              {sec.list?.length > 0 && (
                <ul className="pp-list">
                  {sec.list.map((item, j) => <li key={j}>{item}</li>)}
                </ul>
              )}
              {sec.subsections?.map((sub, j) => (
                <div className="pp-sub-item" key={j}>
                  <div className="pp-sub-label">{sub.label}</div>
                  <div className="pp-sub-text">{sub.text}</div>
                </div>
              ))}
              {sec.extra && <p className="pp-text" style={{ marginTop: 8 }}>{sec.extra}</p>}
            </div>
          </FadeIn>
        ))}

        <FadeIn delay={80}>
          <div className="pp-section-heading">Terms and Conditions for Contests</div>
          <p className="pp-text" style={{ marginBottom: 16 }}>
            By participating in any contest conducted by Express Media Service, participants agree to the following terms:
          </p>
        </FadeIn>

        {contestSections.map((cs, i) => (
          <FadeIn key={cs.number} delay={80 + i * 50}>
            <div className="pp-item">
              <div className="pp-item-title">{cs.number}. {cs.title}</div>
              <p className="pp-text">{cs.text}</p>
            </div>
          </FadeIn>
        ))}

        <FadeIn delay={80}>
          <div className="pp-item">
            <div className="pp-item-title">Right to Cancel or Suspend Contest</div>
            <p className="pp-text">
              If any contest cannot proceed fairly due to viruses, technical failures, fraud, unauthorized intervention, cyberattacks, or any cause beyond our control, Express Media Service reserves the right to cancel, modify, suspend, or terminate the contest at its sole discretion.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={80}>
          <div className="pp-item">
            <div className="pp-item-title">Data Privacy for Contest Participants</div>
            <p className="pp-text">
              Participants agree that personal data such as name, address, contact details, and submitted information may be processed and used for contest administration, winner verification, communication, and related promotional purposes.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={80}>
          <div className="pp-item">
            <div className="pp-item-title">Changes to This Privacy Policy</div>
            <p className="pp-text">
              {`This Privacy Policy is effective from the date mentioned above and may be updated from time to time. Any changes will become effective immediately upon posting on this page. Continued use of emsindia.com after updates constitutes acceptance of the revised policy.\n\nWhere material changes are made, we may notify users through email or a prominent notice on the website.`}
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={80}>
          <div className="pp-contact-section">
            <div className="pp-contact-title">Contact Us</div>
            <p className="pp-text" style={{ marginBottom: 12 }}>
              If you have any questions, concerns, or requests regarding this Privacy Policy or our practices, please contact:
            </p>
            <div className="pp-contact-row">
              <div className="pp-contact-label">Website</div>
              <div className="pp-contact-val">emsindia.com</div>
            </div>
            <div className="pp-contact-row">
              <div className="pp-contact-label">Email</div>
              <div className="pp-contact-val">emsems6@gmail.com</div>
            </div>
            <div className="pp-contact-row">
              <div className="pp-contact-label">Address</div>
              <div className="pp-contact-val">Hall no 7, Commercial Chittod Complex, Zone 1, MP Nagar, Bhopal, Madhya Pradesh</div>
            </div>
          </div>
        </FadeIn>

      </div>
    </div>
  );
}