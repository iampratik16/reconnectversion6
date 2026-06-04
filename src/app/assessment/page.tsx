import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import Eyebrow from "@/components/Eyebrow";
import { SkeletonSvg } from "@/components/AnatomicalArt";
import AssessmentWizard from "./_components/AssessmentWizard";

export const metadata: Metadata = {
  title: "Free Assessment",
  description:
    "A free, 2-minute medical-led assessment. We confirm the right Reconnect track for your condition — and start your nutrition plan from your real preferences.",
};

export default function AssessmentPage() {
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
              <Eyebrow>Free assessment · 2 minutes</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="text-hero text-ink mt-6">
                A few honest questions —{" "}
                <span className="serif-italic text-clay">a real recommendation.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-body-lg text-ink-soft mt-6 max-w-2xl">
                Your answers are reviewed by Dr.&nbsp;Shruthi&rsquo;s clinical team — you’ll hear back shortly. No commitment — this is how every Reconnect program begins.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          WIZARD
          ═══════════════════════════════════════════════════════ */}
      <section className="bg-bone pb-32 md:pb-40">
        <div className="container-site">
          <div className="bg-calcium rounded-[24px] p-6 sm:p-10 md:p-14 hairline shadow-card">
            <AssessmentWizard />
          </div>
        </div>
      </section>
    </>
  );
}
