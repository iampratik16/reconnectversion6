import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import Eyebrow from "@/components/Eyebrow";
import { SkeletonSvg } from "@/components/AnatomicalArt";
import ContactForm from "./_components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Dr. Shruthi's team. Book a consultation, ask about a program, or message us — a real person replies shortly.",
};

type Way = {
  label: string;
  body: string;
  actionLabel: string;
  href: string;
  primary?: boolean;
};

const ways: Way[] = [
  {
    label: "Book a consultation",
    body: "A 20-minute call with Dr. Shruthi’s team to talk through your situation. The fastest way to know if Reconnect is right for you.",
    actionLabel: "Open booking →",
    href: "#contact-form",
    primary: true,
  },
  {
    label: "Email",
    body: "hello@reconnectwellness.in",
    actionLabel: "hello@reconnectwellness.in",
    href: "mailto:hello@reconnectwellness.in",
  },
  {
    label: "WhatsApp / phone",
    body: "Quickest for short questions — usually answered within a few working hours.",
    actionLabel: "+91 ⟪TODO⟫",
    href: "tel:+91",
  },
  {
    label: "Instagram",
    body: "Behind-the-scenes from the clinic and patient stories (with consent).",
    actionLabel: "@reconnectwellness",
    href: "https://instagram.com",
  },
  {
    label: "LinkedIn",
    body: "Connect with Dr. Shruthi professionally.",
    actionLabel: "Dr. Shruthi Desai",
    href: "https://linkedin.com",
  },
];

const reassurances = [
  "Reconnect is non-surgical — surgical cases are referred to orthopaedics.",
  "We work alongside your existing medication and treating doctor, never instead of them.",
  "Every program is designed by a rheumatologist; no prescriptions are modified by us.",
] as const;

export default function ContactPage() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          INTRO
          ═══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-bone pt-32 md:pt-40 pb-12 md:pb-16">
        <SkeletonSvg className="watermark text-ink right-[-120px] top-[40px] w-[480px] hidden md:block" />

        <div className="container-site relative">
          <div className="max-w-3xl">
            <Reveal>
              <Eyebrow>Contact</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="text-hero text-ink mt-6">
                Talk to a{" "}
                <span className="serif-italic text-clay">real human.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-body-lg text-ink-soft mt-6 max-w-2xl">
                Whatever you need — a quick question, a booking, or context on a complicated
                case — there&rsquo;s a real person on the other end. Replies typically arrive shortly.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SPLIT: ways to reach us · form
          ═══════════════════════════════════════════════════════ */}
      <section className="bg-bone pb-32 md:pb-40">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* ── LEFT: warm copy + contact methods + reassurance ── */}
            <div className="lg:col-span-5 lg:sticky lg:top-32">
              <Reveal>
                <h2 className="text-h2 font-display text-ink">
                  Five ways to reach&nbsp;us.
                </h2>
                <p className="text-body text-ink-soft mt-4 max-w-md">
                  Pick whichever fits the moment. The form on the right is the easiest if
                  you&rsquo;ve got a few minutes to share context.
                </p>
              </Reveal>

              <div className="mt-10 flex flex-col">
                {ways.map((w, i) => (
                  <a
                    key={w.label}
                    href={w.href}
                    target={w.href.startsWith("http") ? "_blank" : undefined}
                    rel={w.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className={`group flex items-start justify-between gap-6 py-5 ${
                      i !== ways.length - 1 ? "border-b border-line" : ""
                    }`}
                  >
                    <div className="flex-1">
                      <p className={`text-eyebrow ${w.primary ? "text-clay" : "text-ink-soft"}`}>
                        {w.label}
                      </p>
                      <p className="text-body text-ink mt-2">{w.body}</p>
                    </div>
                    <span className="text-body-sm font-medium text-clay shrink-0 mt-1 opacity-70 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                      {w.actionLabel}
                    </span>
                  </a>
                ))}
              </div>

              {/* Reassurance block */}
              <Reveal delay={0.15}>
                <div className="mt-10 bg-sage-tint rounded-[18px] p-6">
                  <p className="text-eyebrow text-sage mb-4">Before you write</p>
                  <ul className="flex flex-col gap-3">
                    {reassurances.map((r) => (
                      <li key={r} className="flex items-start gap-3 text-body-sm text-ink">
                        <svg
                          width="16" height="16" viewBox="0 0 20 20" fill="none"
                          stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"
                          className="shrink-0 text-sage mt-1"
                          aria-hidden="true"
                        >
                          <path d="M4 10l4 4 8-8" />
                        </svg>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>

            {/* ── RIGHT: form ────────────────────────────────────── */}
            <div className="lg:col-span-7" id="contact-form">
              <Reveal delay={0.1}>
                <ContactForm />
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
