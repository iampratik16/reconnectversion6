import type { Metadata } from "next";
import Link from "next/link";
import { asset } from "@/lib/asset";
import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";
import Eyebrow from "@/components/Eyebrow";
import Reveal from "@/components/Reveal";
import Stagger from "@/components/Stagger";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Pill from "@/components/Pill";
import CTASection from "@/components/CTASection";
import JourneyStepper from "@/components/JourneyStepper";
import {
  KneeSvg,
  SpineSvg,
  HandSvg,
  HipSvg,
  SkeletonSvg,
} from "@/components/AnatomicalArt";
import BodyRegionDiagram from "./_components/BodyRegionDiagram";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Three condition-focused tracks — Prevent, Manage, Recover — each built around a personalised medical assessment. Doctor-led strength training for joints, spine, and bones.",
};

/* ── Data ──────────────────────────────────────────────────── */

const tracks = [
  {
    slug: "prevent",
    title: "Prevent",
    headline: "Stay ahead of the joints and bones you’ll need at 70.",
    description:
      "For early signs, family history, or age-related risk. Build strength and bone density before problems start.",
    tags: ["Early arthritis", "Bone health", "40+"],
    image: "/kettlebell-squat.jpg",
    imageAlt: "TODO: replace with Dr. Shruthi's consented client image — proactive strength session.",
    icon: SkeletonSvg,
  },
  {
    slug: "manage",
    title: "Manage",
    headline: "Work around the pain. Then work it down.",
    description:
      "For those living with arthritis, joint pain, or disc issues. Reduce flare-ups and build resilience.",
    tags: ["Active arthritis", "Joint pain", "Back pain"],
    image: "/mat-stretching.jpg",
    imageAlt: "TODO: replace with consented in-clinic photo for the Manage track.",
    icon: SpineSvg,
  },
  {
    slug: "recover",
    title: "Strengthen your bones",
    headline: "Rebuild from surgery or severe wear — safely, with oversight.",
    description:
      "For post-surgery or severe degeneration. Rebuild strength safely under close medical guidance.",
    tags: ["Post-surgery", "Severe OA", "Rehab"],
    image: "/trainer-guided-exercise.jpg",
    imageAlt: "TODO: replace with consented rehabilitation photo for the Recover track.",
    icon: KneeSvg,
  },
] as const;

const conditionGroups = [
  {
    title: "Joints & Arthritis",
    icon: HandSvg,
    items: [
      { name: "Knee osteoarthritis", track: "/programs/manage" },
      { name: "Rheumatoid arthritis", track: "/programs/manage" },
      { name: "Joint pain & stiffness", track: "/programs/manage" },
      { name: "Frozen shoulder", track: "/programs/manage" },
      { name: "Hip pain", track: "/programs/manage" },
    ],
  },
  {
    title: "Spine & Back",
    icon: SpineSvg,
    items: [
      { name: "Chronic back pain", track: "/programs/manage" },
      { name: "Disc bulge / herniation", track: "/programs/recover" },
      { name: "Sciatica", track: "/programs/manage" },
      { name: "Cervical (neck) pain", track: "/programs/manage" },
      { name: "Posture-related pain", track: "/programs/prevent" },
    ],
  },
  {
    title: "Bone Health",
    icon: SkeletonSvg,
    items: [
      { name: "Osteoporosis", track: "/programs/recover" },
      { name: "Osteopenia", track: "/programs/manage" },
      { name: "Post-menopausal bone loss", track: "/programs/prevent" },
      { name: "Fracture-risk strength building", track: "/programs/prevent" },
    ],
  },
  {
    title: "Recovery & Rehab",
    icon: HipSvg,
    items: [
      { name: "Post-surgical strength rebuild", track: "/programs/recover" },
      { name: "Severe osteoarthritis support", track: "/programs/recover" },
      { name: "Deconditioning / sarcopenia", track: "/programs/manage" },
    ],
  },
] as const;

const comparison = {
  headers: ["", "Prevent", "Manage", "Strengthen your bones"],
  rows: [
    {
      label: "Who it’s for",
      cells: [
        "Adults 40+, early signs, family history",
        "Living with arthritis, joint or back pain",
        "Post-surgery, severe degeneration",
      ],
    },
    {
      label: "Intensity",
      cells: ["Moderate, progressive", "Low-to-moderate, pain-respecting", "Low, milestone-gated"],
    },
    {
      label: "Typical conditions",
      cells: [
        "Osteopenia, early OA, posture loss",
        "Knee/back OA, disc bulge, RA",
        "Post-replacement, severe OA, fracture recovery",
      ],
    },
    {
      label: "Primary goal",
      cells: [
        "Build bone density and protect joints early",
        "Calm pain, then rebuild around it",
        "Restore safe range, strength, and confidence",
      ],
    },
  ],
} as const;

const differentiators = [
  {
    title: "Designed for your body",
    body: "Programs are built from your medical assessment — not your height, weight, or a generic template.",
  },
  {
    title: "Pain-first, not pain-through",
    body: "We work around pain, respect it, reduce it — then build strength on top of a quieter joint.",
  },
  {
    title: "Doctor-led, not influencer-led",
    body: "Every program is designed by a rheumatologist. We work alongside your existing medical care.",
  },
] as const;

/* ── Page ──────────────────────────────────────────────────── */

export default function ProgramsPage() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          1) HERO — full-bleed bone with x-ray glow + watermark
          ═══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-bone pt-36 md:pt-44 pb-24 md:pb-32">
        <SkeletonSvg className="watermark text-ink right-[-120px] top-[60px] w-[520px] hidden md:block" />

        <div className="container-site relative">
          <div className="xray-glow max-w-4xl">
            <Reveal>
              <Eyebrow>Programs</Eyebrow>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="text-hero text-ink mt-6">
                One method.{" "}
                <span className="serif-italic text-clay">Three starting points.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-body-lg text-ink-soft mt-8 max-w-2xl">
                Every member begins with a medical assessment. From there, every track runs the
                same connected journey — Assessment → Exercise → Nutrition → Mind Coaching — tuned
                to your exact condition, age, and severity.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Button variant="clay" size="lg" href="/assessment" arrow>
                  Take free assessment
                </Button>
                <Button variant="ghost" size="lg" href="#three-tracks">
                  See the tracks
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          2) DIFFERENTIATOR — quick restatement
          ═══════════════════════════════════════════════════════ */}
      <Section bg="bg-bone-deep">
        <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {differentiators.map((d, i) => (
            <div key={d.title} className="flex flex-col gap-3">
              <span className="text-eyebrow text-clay">0{i + 1}</span>
              <h3 className="text-h3 font-display text-ink">{d.title}</h3>
              <p className="text-body text-ink-soft">{d.body}</p>
            </div>
          ))}
        </Stagger>
      </Section>

      {/* ═══════════════════════════════════════════════════════
          3) THE THREE TRACKS — alternating split rows
          ═══════════════════════════════════════════════════════ */}
      <section id="three-tracks" className="section-py bg-bone">
        <div className="container-site mb-16 md:mb-24">
          <SectionHeader
            eyebrowNumber="(01)"
            eyebrow="The Tracks"
            title="Choose your starting point. We’ll do the rest."
            description="Three condition-focused tracks. Each one is personalised after your assessment — no template, no guesswork."
            align="left"
          />
        </div>

        <div className="container-site flex flex-col gap-24 md:gap-32">
          {tracks.map((track, i) => {
            const reverse = i % 2 === 1;
            return (
              <Reveal key={track.slug}>
                <article
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
                    reverse ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  {/* Media */}
                  <div className="lg:col-span-7 relative">
                    <div className="xray-glow">
                      <div className="relative rounded-[20px] overflow-hidden shadow-soft">
                        {/* TODO: swap for Dr. Shruthi's consented patient/clinic photography */}
                        <img
                          src={asset(track.image)}
                          alt={track.imageAlt}
                          loading="lazy"
                          className="w-full h-[360px] md:h-[460px] object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Copy */}
                  <div className="lg:col-span-5 flex flex-col gap-5">
                    <h3 className="text-h2 font-display text-ink">{track.title}</h3>
                    <p className="serif-italic text-h4 text-ink-soft">{track.headline}</p>
                    <p className="text-body text-ink-soft">{track.description}</p>

                    <div className="flex flex-wrap gap-2 mt-1">
                      {track.tags.map((tag) => (
                        <Pill key={tag} variant="sage">
                          {tag}
                        </Pill>
                      ))}
                    </div>

                    <div className="mt-4">
                      <Button
                        variant="sage-outline"
                        size="md"
                        href={`/programs/${track.slug}`}
                        arrow
                      >
                        Explore {track.title}
                      </Button>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          4) CONDITIONS WE TREAT — categorized columns
          ═══════════════════════════════════════════════════════ */}
      <Section bg="bg-bone-deep" id="conditions">
        <SectionHeader
          eyebrowNumber="(02)"
          eyebrow="Conditions we treat"
          title="Built for the conditions you actually live with."
          description="Find what you’re dealing with — every item links to the track designed for it."
          align="left"
          className="mb-14 md:mb-20"
        />

        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {conditionGroups.map((group) => {
            const Icon = group.icon;
            return (
              <Card key={group.title} padding="md" className="glow-card flex flex-col gap-5 bg-calcium h-full">
                <div className="flex items-center justify-between">
                  <h3 className="text-h4 font-display text-ink">{group.title}</h3>
                  <Icon className="w-10 text-sage opacity-60" />
                </div>
                <div className="hairline-b" />
                <ul className="flex flex-col gap-3">
                  {group.items.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.track}
                        className="group flex items-center justify-between gap-3 text-body-sm text-ink-soft hover:text-ink transition-colors duration-200"
                      >
                        <span>{item.name}</span>
                        <span className="text-clay opacity-0 group-hover:opacity-100 transition-opacity duration-200">→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </Card>
            );
          })}
        </Stagger>
      </Section>

      {/* ═══════════════════════════════════════════════════════
          5) HOW EVERY PROGRAM IS BUILT — journey + body diagram
          ═══════════════════════════════════════════════════════ */}
      <Section bg="bg-bone">
        <SectionHeader
          eyebrowNumber="(03)"
          eyebrow="The method"
          title="How every program is built."
          description="The same four-step journey runs under every track. The assessment always comes first — nothing is generic, nothing is skipped."
          align="left"
          className="mb-14 md:mb-20"
        />

        <JourneyStepper className="mb-20" />

        {/* Body region diagram — skeleton + focus card sit side-by-side inside */}
        <Card padding="lg" className="bg-calcium">
          <Eyebrow>Where does it hurt?</Eyebrow>
          <h3 className="text-h3 font-display text-ink mt-4 mb-6">
            Action starts where the problem is.
          </h3>
          <BodyRegionDiagram />
        </Card>
      </Section>

      {/* ═══════════════════════════════════════════════════════
          6) SELF-SELECT COMPARISON TABLE
          ═══════════════════════════════════════════════════════ */}
      <Section bg="bg-bone-deep">
        <SectionHeader
          eyebrowNumber="(04)"
          eyebrow="Compare tracks"
          title="Still not sure which one is you?"
          description="A quick side-by-side. The assessment confirms it — this is just orientation."
          align="left"
          className="mb-12"
        />

        <Reveal>
          <div className="bg-calcium rounded-[20px] overflow-hidden shadow-card hairline">
            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-line">
                    {comparison.headers.map((h, i) => (
                      <th
                        key={h || i}
                        className={`p-5 lg:p-7 text-eyebrow text-ink-soft ${
                          i === 0 ? "w-[22%]" : ""
                        }`}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparison.rows.map((row, ri) => (
                    <tr
                      key={row.label}
                      className={ri !== comparison.rows.length - 1 ? "border-b border-line" : ""}
                    >
                      <td className="p-5 lg:p-7 align-top text-body-sm font-medium text-ink">
                        {row.label}
                      </td>
                      {row.cells.map((cell, ci) => (
                        <td
                          key={ci}
                          className="p-5 lg:p-7 align-top text-body-sm text-ink-soft"
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr className="border-t border-line bg-bone/40">
                    <td className="p-5 lg:p-7"></td>
                    {tracks.map((t) => (
                      <td key={t.slug} className="p-5 lg:p-7">
                        <Button
                          variant="sage-outline"
                          size="md"
                          href={`/programs/${t.slug}`}
                          arrow
                        >
                          Explore {t.title}
                        </Button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Mobile stack */}
            <div className="md:hidden flex flex-col divide-y divide-line">
              {tracks.map((t, ti) => (
                <div key={t.slug} className="p-6 flex flex-col gap-4">
                  <h4 className="text-h4 font-display text-ink">{t.title}</h4>
                  {comparison.rows.map((row) => (
                    <div key={row.label}>
                      <p className="text-eyebrow text-ink-soft mb-1">{row.label}</p>
                      <p className="text-body-sm text-ink">{row.cells[ti]}</p>
                    </div>
                  ))}
                  <div className="pt-2">
                    <Button variant="sage-outline" size="md" href={`/programs/${t.slug}`} arrow>
                      Explore {t.title}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ═══════════════════════════════════════════════════════
          7) CGM ADD-ON — slim, subordinate
          ═══════════════════════════════════════════════════════ */}
      <Section bg="bg-bone">
        <Reveal>
          <div className="bg-sage-tint rounded-[20px] p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-5 max-w-2xl">
              <span className="hidden sm:inline-flex shrink-0 w-12 h-12 rounded-full bg-sage text-bone items-center justify-center text-body-sm font-medium">
                +
              </span>
              <div>
                <p className="text-eyebrow text-sage mb-2">Add-on</p>
                <h3 className="text-h4 font-display text-ink mb-1">
                  Continuous Glucose Monitoring
                </h3>
                <p className="text-body-sm text-ink-soft">
                  Managing borderline sugar? Pair any track with our CGM program — blood-sugar patterns
                  drive systemic inflammation that hits joints and bone. ₹15,000 for 6 months.
                </p>
              </div>
            </div>
            <Button variant="sage-outline" href="/cgm" arrow>
              Learn about CGM
            </Button>
          </div>
        </Reveal>
      </Section>

      {/* ═══════════════════════════════════════════════════════
          8) FINAL CTA
          ═══════════════════════════════════════════════════════ */}
      <CTASection
        headline="The right track starts with the right assessment."
        description="Two minutes. A handful of questions. We’ll point you at the program your body actually needs."
        primaryHref="/assessment"
        primaryLabel="Take free assessment"
        secondaryHref="/contact"
        secondaryLabel="Book consultation"
        variant="sage"
      />
    </>
  );
}
