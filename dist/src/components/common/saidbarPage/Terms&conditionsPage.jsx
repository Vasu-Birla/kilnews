import { useEffect, useRef } from "react";

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

export default function TermsAndConditionsPage() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", background: "#fff", minHeight: "100vh" }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .tc-wrap { padding: 30px 70px 60px 90px; max-width: 1200px; margin: 0 auto; }
        .tc-page-title { font-size: 24px; font-weight: 700; color: #0a2463; margin-bottom: 4px; }
        .tc-page-subtitle { font-size: 14px; color: #888; margin-bottom: 12px; }
        .tc-intro { font-size: 14px; color: #444; line-height: 1.7; margin-bottom: 24px; }
        .tc-divider { border: none; border-top: 2px solid #c0392b; margin-bottom: 28px; }
        .tc-section-heading { font-size: 17px; font-weight: 700; color: #0a2463; border-left: 4px solid #c0392b; padding-left: 10px; margin: 28px 0 16px; }
        .tc-item { margin-bottom: 22px; }
        .tc-item-title { font-size: 14.5px; font-weight: 700; color: #c0392b; margin-bottom: 7px; display: inline-block; transition: color 0.2s; cursor: default; }
        .tc-item:hover .tc-item-title { color: #0a2463; }
        .tc-text { font-size: 14px; color: #333; line-height: 1.8; white-space: pre-line; }
        .tc-list { list-style: none; margin: 8px 0; padding: 0; }
        .tc-list li { font-size: 14px; color: #333; line-height: 1.75; padding-left: 14px; position: relative; }
        .tc-list li::before { content: "•"; color: #333; position: absolute; left: 0; }
        .tc-contact-section { margin-top: 28px; }
        .tc-contact-title { font-size: 17px; font-weight: 700; color: #0a2463; border-left: 4px solid #c0392b; padding-left: 10px; margin-bottom: 14px; }
        .tc-contact-row { margin-bottom: 10px; }
        .tc-contact-label { font-size: 13px; font-weight: 700; color: #333; }
        .tc-contact-val { font-size: 14px; color: #444; line-height: 1.6; }
      `}</style>

      <div className="tc-wrap">

        <FadeIn delay={0}>
          <h1 className="tc-page-title">Terms & Conditions</h1>
          <div className="tc-page-subtitle">नियम एवं शर्ते</div>
          <hr className="tc-divider" />
        </FadeIn>

        <FadeIn delay={60}>
          <div className="tc-section-heading">Welcome to EMSIndia.com</div>
          <p>Express Media Service is a business unit of Express Group.</p>
          
          <p className="tc-text">
            Welcome to the digital information network of Express Group. EMSIndia.com ("EMSIndia.com", "we", "our", or "the Site") is owned and operated by Express Media Service, together with its subsidiaries, affiliates, associates, and related entities (collectively referred to as "Express Group").
          </p>
          <p className="tc-text" style={{ marginTop: 10 }}>
            By accessing or using EMSIndia.com, you acknowledge that you have read, understood, and agreed to be bound by these Terms of Use and our Privacy Policy. This agreement is electronic in nature and does not require physical signatures.
          </p>
        </FadeIn>

        <FadeIn delay={80}>
          <div className="tc-item" style={{ marginTop: 22 }}>
            <div className="tc-item-title">Acceptance of Terms</div>
            <p className="tc-text">
              Thank you for visiting EMSIndia.com. Access to and use of this Site is offered subject to your acceptance of these Terms of Use. Please read them carefully. By accessing, browsing, registering, or using this Site, you agree to comply with these Terms.
            </p>
            <p className="tc-text" style={{ marginTop: 8 }}>
              If you do not agree with any part of these Terms, please discontinue use of the Site immediately.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={80}>
          <div className="tc-item">
            <div className="tc-item-title">Information on the Site</div>
            <p className="tc-text">We strive to provide accurate, updated, and reliable information. However, all content on EMSIndia.com is provided on an "as is" basis.</p>
            <p className="tc-text" style={{ marginTop: 8 }}>We do not guarantee that:</p>
            <ul className="tc-list" style={{ marginTop: 6 }}>
              <li>All information will always be accurate, complete, or current.</li>
              <li>The Site will operate uninterrupted or error-free.</li>
              <li>The Site or its servers are free of viruses or harmful components.</li>
            </ul>
            <p className="tc-text" style={{ marginTop: 8 }}>
              Some content may be supplied by third-party sources, contributors, agencies, or partners. We do not control such third-party content and are not responsible for any inaccuracies or omissions.
            </p>
            <p className="tc-text" style={{ marginTop: 8 }}>
              Users are advised to independently verify any information before relying on it.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={80}>
          <div className="tc-item">
            <div className="tc-item-title">Limited License</div>
            <p className="tc-text">
              Express Group grants you a limited, non-exclusive, non-transferable, revocable license to access and use EMSIndia.com for personal and lawful purposes only, subject to these Terms.
            </p>
            <p className="tc-text" style={{ marginTop: 8 }}>
              You may not copy, reproduce, distribute, republish, sell, license, modify, or exploit any content without prior written permission.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={80}>
          <div className="tc-item">
            <div className="tc-item-title">Registration and User Accounts</div>
            <p className="tc-text">Certain services such as contests, newsletters, memberships, comment sections, or exclusive content may require registration.</p>
            <p className="tc-text" style={{ marginTop: 8 }}>By registering, you agree that:</p>
            <ul className="tc-list" style={{ marginTop: 6 }}>
              <li>All information provided is true and accurate.</li>
              <li>You will maintain confidentiality of your login credentials.</li>
              <li>You are responsible for activities under your account.</li>
            </ul>
            <p className="tc-text" style={{ marginTop: 8 }}>
              We reserve the right to suspend or terminate accounts for misuse, false information, policy violations, or unauthorized activity.
            </p>
            <p className="tc-text" style={{ marginTop: 8 }}>
              Users under 18 years of age must use the Site only under parental or guardian supervision.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={80}>
          <div className="tc-item">
            <div className="tc-item-title">User Content and Submissions</div>
            <p className="tc-text">You may submit comments, feedback, articles, messages, or other content ("User Content").</p>
            <p className="tc-text" style={{ marginTop: 8 }}>
              By submitting User Content, you grant Express Group a worldwide, perpetual, royalty-free, irrevocable, non-exclusive license to use, publish, reproduce, edit, distribute, display, and promote such content across any media.
            </p>
            <p className="tc-text" style={{ marginTop: 8 }}>You are solely responsible for your submissions and agree not to post anything that is:</p>
            <ul className="tc-list" style={{ marginTop: 6 }}>
              <li>Defamatory or abusive</li>
              <li>Illegal or fraudulent</li>
              <li>Obscene or offensive</li>
              <li>Misleading or false</li>
              <li>Infringing intellectual property rights</li>
              <li>Harmful to minors</li>
              <li>Hateful based on caste, religion, ethnicity, or gender</li>
              <li>Spam or unauthorized promotions</li>
            </ul>
            <p className="tc-text" style={{ marginTop: 8 }}>We reserve the right to remove or moderate any content without notice.</p>
          </div>
        </FadeIn>

        <FadeIn delay={80}>
          <div className="tc-item">
            <div className="tc-item-title">Intellectual Property Rights</div>
            <p className="tc-text">
              All content on EMSIndia.com including text, graphics, logos, images, videos, designs, layout, software, and trademarks are the property of Express Group or licensed partners and are protected by applicable copyright, trademark, and intellectual property laws.
            </p>
            <p className="tc-text" style={{ marginTop: 8 }}>
              Nothing on this Site grants you any ownership rights or license except as expressly stated.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={80}>
          <div className="tc-item">
            <div className="tc-item-title">Prohibited Activities</div>
            <p className="tc-text">You agree not to:</p>
            <ul className="tc-list" style={{ marginTop: 6 }}>
              <li>Use the Site for unlawful purposes</li>
              <li>Attempt unauthorized access to systems or accounts</li>
              <li>Spread malware, viruses, or harmful code</li>
              <li>Collect user data without consent</li>
              <li>Harass or impersonate others</li>
              <li>Violate intellectual property rights</li>
              <li>Post spam or deceptive promotions</li>
              <li>Disrupt the Site's functionality</li>
              <li>Use the Site for commercial resale without permission</li>
            </ul>
          </div>
        </FadeIn>

        <FadeIn delay={80}>
          <div className="tc-item">
            <div className="tc-item-title">Third-Party Links and Advertising</div>
            <p className="tc-text">The Site may contain advertisements, sponsored content, or links to third-party websites and services.</p>
            <p className="tc-text" style={{ marginTop: 8 }}>Express Group does not endorse or control such third-party sites and is not responsible for:</p>
            <ul className="tc-list" style={{ marginTop: 6 }}>
              <li>Their content</li>
              <li>Privacy practices</li>
              <li>Accuracy of information</li>
              <li>Transactions or disputes arising from use</li>
            </ul>
            <p className="tc-text" style={{ marginTop: 8 }}>Use of third-party websites is at your own risk.</p>
          </div>
        </FadeIn>

        <FadeIn delay={80}>
          <div className="tc-item">
            <div className="tc-item-title">Privacy and Data Protection</div>
            <p className="tc-text">Your use of EMSIndia.com is also governed by our Privacy Policy.</p>
            <p className="tc-text" style={{ marginTop: 8 }}>By using the Site, you consent to:</p>
            <ul className="tc-list" style={{ marginTop: 6 }}>
              <li>Collection of information you provide</li>
              <li>Use of cookies and analytics tools</li>
              <li>Processing of data for improving services, communication, and legal compliance</li>
            </ul>
            <p className="tc-text" style={{ marginTop: 8 }}>Please review our Privacy Policy for full details.</p>
          </div>
        </FadeIn>

        <FadeIn delay={80}>
          <div className="tc-item">
            <div className="tc-item-title">Service Availability</div>
            <p className="tc-text">
              We aim to keep EMSIndia.com available at all times, but we do not guarantee uninterrupted access.
            </p>
            <p className="tc-text" style={{ marginTop: 8 }}>
              We are not liable for delays, outages, maintenance downtime, server issues, internet disruptions, natural disasters, strikes, cyberattacks, or circumstances beyond our control.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={80}>
          <div className="tc-item">
            <div className="tc-item-title">Disclaimer of Liability</div>
            <p className="tc-text">Your use of the Site is entirely at your own risk.</p>
            <p className="tc-text" style={{ marginTop: 8 }}>To the maximum extent permitted by law, Express Group shall not be liable for any direct, indirect, incidental, consequential, punitive, or special damages arising from:</p>
            <ul className="tc-list" style={{ marginTop: 6 }}>
              <li>Use or inability to use the Site</li>
              <li>Errors or omissions in content</li>
              <li>Reliance on information published</li>
              <li>Unauthorized access to data</li>
              <li>Technical interruptions</li>
            </ul>
          </div>
        </FadeIn>

        <FadeIn delay={80}>
          <div className="tc-item">
            <div className="tc-item-title">Indemnification</div>
            <p className="tc-text">You agree to defend, indemnify, and hold harmless Express Group, its directors, employees, affiliates, officers, agents, and partners from any claims, losses, liabilities, costs, or expenses arising from:</p>
            <ul className="tc-list" style={{ marginTop: 6 }}>
              <li>Your use of the Site</li>
              <li>Your breach of these Terms</li>
              <li>Violation of rights of another party</li>
            </ul>
          </div>
        </FadeIn>

        <FadeIn delay={80}>
          <div className="tc-item">
            <div className="tc-item-title">Termination</div>
            <p className="tc-text">
              We reserve the right to suspend or terminate access to EMSIndia.com at any time, without notice, for any violation of these Terms or misuse of the Site.
            </p>
            <p className="tc-text" style={{ marginTop: 8 }}>
              Upon termination, all rights granted to you under these Terms shall cease immediately.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={80}>
          <div className="tc-item">
            <div className="tc-item-title">Changes to Terms</div>
            <p className="tc-text">
              We may update or revise these Terms of Use at any time without prior notice.
            </p>
            <p className="tc-text" style={{ marginTop: 8 }}>
              Updated Terms become effective once posted on EMSIndia.com. Continued use of the Site after changes constitutes acceptance of the revised Terms.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={80}>
          <div className="tc-item">
            <div className="tc-item-title">Governing Law and Jurisdiction</div>
            <p className="tc-text">
              These Terms shall be governed by and interpreted in accordance with the laws of India.
            </p>
            <p className="tc-text" style={{ marginTop: 8 }}>
              Any disputes arising out of or relating to these Terms or use of the Site shall be subject to the exclusive jurisdiction of the competent courts of Madhya Pradesh, India.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={80}>
          <div className="tc-contact-section">
            <div className="tc-contact-title">Contact Us</div>
            <p className="tc-text" style={{ marginBottom: 12 }}>
              If you have any questions, complaints, legal concerns, or requests regarding these Terms, please contact:
            </p>
            <div className="tc-contact-row">
              <div className="tc-contact-label">Website</div>
              <div className="tc-contact-val">EMSIndia.com</div>
            </div>
            <div className="tc-contact-row">
              <div className="tc-contact-label">Email</div>
              <div className="tc-contact-val">emsems6@gmail.com</div>
            </div>
            <div className="tc-contact-row">
              <div className="tc-contact-label">Address</div>
              <div className="tc-contact-val">Hall no 7, Commercial Chittod Complex, Zone 1, MP Nagar, Bhopal, Madhya Pradesh</div>
            </div>
          </div>
        </FadeIn>

      </div>
    </div>
  );
}