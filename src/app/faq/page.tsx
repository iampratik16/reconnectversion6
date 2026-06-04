import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";
import Eyebrow from "@/components/Eyebrow";
import Reveal from "@/components/Reveal";
import Accordion from "@/components/Accordion";
import CTASection from "@/components/CTASection";
import { SkeletonSvg } from "@/components/AnatomicalArt";
import FaqGroupNav from "./_components/FaqGroupNav";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Common questions about Reconnect — how it differs from physio and fitness apps, safety with arthritis and medication, pricing, and what to expect.",
};

/* ── Data ──────────────────────────────────────────────────── */

type FaqGroup = {
  id: string;
  label: string;
  blurb: string;
  items: { q: string; a: React.ReactNode }[];
};

const groups: FaqGroup[] = [
  {
    id: "about-the-program",
    label: "About the program",
    blurb: "What Reconnect is, what it isn’t, and how it compares to the alternatives.",
    items: [
      {
        q: "How is this different from physiotherapy?",
        a: (
          <p>
            Physiotherapy focuses on rehabilitation after an injury or surgery — typically
            short-term and tied to a specific incident. Reconnect builds long-term,
            progressive strength designed for chronic joint and bone conditions. We&rsquo;re
            not a substitute for the physio you see after a fracture; we&rsquo;re the
            ongoing program that protects the joint for the next 30 years.
          </p>
        ),
      },
      {
        q: "How is this different from a generic fitness app or other available programmes?",
        a: (
          <p>
            Those give you one generic set of workouts based on height, weight, and a few
            preferences. We start with a medical assessment by a rheumatologist and design a
            program around your exact condition — split by body region (upper / lower /
            back / target joint) and started exactly where your problem is. Same age, same
            weight, different diagnosis — different program.
          </p>
        ),
      },
      {
        q: "Do you do surgery?",
        a: (
          <p>
            No. Dr. Shruthi is a rheumatologist; surgical cases are referred to orthopaedics.
            Reconnect focuses on non-surgical strength and pain management, both for people
            avoiding surgery and people recovering from one.
          </p>
        ),
      },
      {
        q: "What is the CGM package?",
        a: (
          <p>
            A separate 6-month metabolic add-on for borderline-diabetic and medication-avoidant
            adults — a continuous glucose monitor with remote review and nutrition adjustments.{" "}
            <Link
              href="/cgm"
              className="text-clay font-medium underline-offset-4 hover:underline"
            >
              See the CGM program →
            </Link>
          </p>
        ),
      },
    ],
  },
  {
    id: "medical-and-safety",
    label: "Medical & safety",
    blurb: "How we work alongside your existing care — and where we draw the line.",
    items: [
      {
        q: "Will this replace my doctor or medication?",
        a: (
          <p>
            No. Reconnect works alongside your existing treatment. Programs are designed by a
            rheumatologist to complement your care, not replace it. We do not modify
            prescriptions; we coordinate with your treating doctor when needed. As pain and
            function improve, your physician may choose to taper medication — that decision is
            theirs.
          </p>
        ),
      },
      {
        q: "I’ve never exercised, or I’m in significant pain right now. Is this for me?",
        a: (
          <p>
            Yes — this is exactly who the program is built for. We calm the pain first with
            the right measures, then start gently and progress gradually. If you&rsquo;ve never
            picked up a dumbbell, we won&rsquo;t throw heavy numbers at you. The plan adapts
            to your daily pain level, not the other way around.
          </p>
        ),
      },
      {
        q: "Can I join if I’m already on arthritis medication?",
        a: (
          <p>
            Yes. The medical assessment accounts for your current treatment, condition, and
            any limitations your treating doctor has set. Many of our members are on long-term
            anti-inflammatories or DMARDs — the program is built around that, not despite it.
          </p>
        ),
      },
      {
        q: "Is it safe for severe arthritis, rheumatoid arthritis, or post-surgical recovery?",
        a: (
          <p>
            Yes, with the right track and the right modifications. The{" "}
            <Link
              href="/programs/recover"
              className="text-clay font-medium underline-offset-4 hover:underline"
            >
              Recover track
            </Link>{" "}
            specifically handles post-surgery and severe degeneration with milestone-gated
            progression and close coordination with your treating surgeon or physician. We are
            non-surgical ourselves; we follow your doctor&rsquo;s lead on restrictions.
          </p>
        ),
      },
    ],
  },
  {
    id: "logistics-and-pricing",
    label: "Logistics & pricing",
    blurb: "Plans, time commitment, equipment, and how membership works in practice.",
    items: [
      {
        q: "How much does it cost? What plans are available?",
        a: (
          <p>
            Three monthly plans: Essential (₹2,499/mo), Care (₹4,999/mo — most popular), and
            Elite (₹8,999/mo). The CGM add-on is ₹15,000 for 6 months.{" "}
            <Link
              href="/pricing"
              className="text-clay font-medium underline-offset-4 hover:underline"
            >
              See all plans →
            </Link>
          </p>
        ),
      },
      {
        q: "Do I need gym equipment to start?",
        a: (
          <p>
            No. Most programs begin with bodyweight movement and resistance bands. As you
            progress, light dumbbells help — but a full home gym is never required. Most
            members train entirely at home.
          </p>
        ),
      },
      {
        q: "How much time per week does the program take?",
        a: (
          <p>
            Typically three sessions of around 45 minutes each, plus a short daily movement
            habit. Designed to fit a working week — not to replace one.
          </p>
        ),
      },
      {
        q: "Can I pause or cancel my plan?",
        a: (
          <p>
            Yes — both. Pause for travel, surgery recovery, or any other reason; cancel any
            time before your next billing cycle. No long-term contracts, no lock-ins.
          </p>
        ),
      },
    ],
  },
];

/* ── Page ──────────────────────────────────────────────────── */

const navGroups = groups.map((g) => ({
  id: g.id,
  label: g.label,
  count: g.items.length,
}));

export default function FAQPage() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          HERO
          ═══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-bone pt-36 md:pt-44 pb-16 md:pb-24">
        <SkeletonSvg className="watermark text-ink right-[-140px] top-[60px] w-[520px] hidden md:block" />

        <div className="container-site relative">
          <div className="max-w-4xl">
            <Reveal>
              <Eyebrow>Frequently asked</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="text-hero text-ink mt-6">
                Common questions,{" "}
                <span className="serif-italic text-clay">honest answers.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-body-lg text-ink-soft mt-8 max-w-2xl">
                If yours isn&rsquo;t here, write to us. Dr.&nbsp;Shruthi&rsquo;s team reads
                every message and replies personally — usually shortly.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          GROUPED FAQ — sticky group nav + accordion groups
          ═══════════════════════════════════════════════════════ */}
      <Section bg="bg-bone">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Sticky group nav */}
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-32">
              <FaqGroupNav groups={navGroups} />
              <div className="hidden lg:block mt-10 pt-6 border-t border-line">
                <p className="text-caption text-ink-soft mb-3">
                  Still stuck?
                </p>
                <Link
                  href="/contact"
                  className="text-body-sm font-medium text-clay underline-offset-4 hover:underline"
                >
                  Ask Dr.&nbsp;Shruthi directly →
                </Link>
              </div>
            </div>
          </aside>

          {/* FAQ groups */}
          <div className="lg:col-span-9 flex flex-col gap-20 md:gap-24">
            {groups.map((group, gi) => (
              <section
                key={group.id}
                id={group.id}
                aria-labelledby={`${group.id}-heading`}
                className="scroll-mt-32"
              >
                <Reveal>
                  <p className="text-eyebrow text-clay mb-3">
                    ({String(gi + 1).padStart(2, "0")})
                  </p>
                  <h2
                    id={`${group.id}-heading`}
                    className="text-h2 font-display text-ink mb-3"
                  >
                    {group.label}
                  </h2>
                  <p className="text-body text-ink-soft mb-8 max-w-2xl">{group.blurb}</p>
                </Reveal>

                <Accordion
                  items={group.items.map((i) => ({
                    trigger: i.q,
                    content: i.a,
                  }))}
                />
              </section>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════
          CLOSING CTA
          ═══════════════════════════════════════════════════════ */}
      <CTASection
        headline="Still have a question only an assessment can answer?"
        description="The free assessment is the fastest way to find out whether Reconnect is right for your body — and which track."
        primaryHref="/assessment"
        primaryLabel="Take free assessment"
        secondaryHref="/contact"
        secondaryLabel="Ask the team"
        variant="sage"
      />
    </>
  );
}
