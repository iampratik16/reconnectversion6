"use client";

/*
 * ⚠️ BACKEND TODO — secure handling of medical data
 *
 * `handleSubmit` below logs to console and shows the confirmation screen only.
 * Before launch:
 *   • Wire to a HIPAA/India-DPDP–aware backend with TLS, at-rest encryption,
 *     and a documented data-retention policy.
 *   • Display explicit consent text and capture consent timestamp.
 *   • Move any file uploads to signed-URL storage; never POST PHI to a
 *     public/unauthenticated endpoint.
 *   • Restrict access to Dr. Shruthi's clinical team only.
 */

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import Button from "@/components/Button";

/* ── Types ─────────────────────────────────────────────────── */

type Concern =
  | "knee"
  | "back-neck"
  | "arthritis"
  | "disc"
  | "bone-health"
  | "prevention"
  | "blood-sugar";

type Severity = "mild" | "moderate" | "severe";
type Duration = "<3-months" | "3-12-months" | "1-3-years" | "3+years";
type Activity = "sedentary" | "light" | "moderate" | "active";
type Experience = "none" | "some" | "regular";
type AgeBand = "<30" | "30-39" | "40-49" | "50-59" | "60-69" | "70+";
type Imaging = "dexa" | "xray" | "mri" | "none";
type Diet = "veg" | "non-veg" | "eggetarian";

type Answers = {
  concern: Concern | "";
  severity: Severity | "";
  duration: Duration | "";
  pain: number;
  activity: Activity | "";
  experience: Experience | "";
  ageBand: AgeBand | "";
  treatment: string;
  imaging: Imaging[];
  diet: Diet | "";
  allergies: string;
  preferences: string;
  name: string;
  email: string;
  phone: string;
};

const initial: Answers = {
  concern: "",
  severity: "",
  duration: "",
  pain: 4,
  activity: "",
  experience: "",
  ageBand: "",
  treatment: "",
  imaging: [],
  diet: "",
  allergies: "",
  preferences: "",
  name: "",
  email: "",
  phone: "",
};

const STEP_COUNT = 6;

/* ── Wizard ────────────────────────────────────────────────── */

export default function AssessmentWizard() {
  const [step, setStep] = useState(0); // 0..5 → 6 = confirmation
  const [direction, setDirection] = useState<1 | -1>(1);
  const [answers, setAnswers] = useState<Answers>(initial);
  const [error, setError] = useState<string>("");
  const prefersReduced = useReducedMotion();

  const update = useCallback(
    <K extends keyof Answers>(key: K, value: Answers[K]) => {
      setAnswers((a) => ({ ...a, [key]: value }));
      setError("");
    },
    []
  );

  const toggleImaging = (v: Imaging) => {
    setAnswers((a) => {
      // "none" is mutually exclusive
      if (v === "none") {
        return { ...a, imaging: a.imaging.includes("none") ? [] : ["none"] };
      }
      const without = a.imaging.filter((x) => x !== "none");
      return {
        ...a,
        imaging: without.includes(v) ? without.filter((x) => x !== v) : [...without, v],
      };
    });
    setError("");
  };

  /* ── Per-step validation ─────────────────────────────────── */
  const validate = useCallback((s: number): string => {
    if (s === 0 && !answers.concern) return "Pick the option closest to what you're dealing with.";
    if (s === 1) {
      if (!answers.severity) return "Tell us how severe it feels.";
      if (!answers.duration) return "How long has it been going on?";
    }
    if (s === 2) {
      if (!answers.activity) return "Roughly how active are you week-to-week?";
      if (!answers.experience) return "Have you trained with weights before? Any answer is fine.";
    }
    if (s === 3 && !answers.ageBand) return "Pick your age band.";
    if (s === 4 && !answers.diet) return "Tell us how you eat.";
    if (s === 5) {
      if (!answers.name.trim()) return "We need a name to reply.";
      if (!/^\S+@\S+\.\S+$/.test(answers.email)) return "Please enter a valid email.";
      if (answers.phone.replace(/\D/g, "").length < 7) return "Please enter a valid phone number.";
    }
    return "";
  }, [answers]);

  const next = useCallback(() => {
    const e = validate(step);
    if (e) { setError(e); return; }
    setDirection(1);
    setStep((s) => Math.min(STEP_COUNT, s + 1));
  }, [step, validate]);

  const back = useCallback(() => {
    setError("");
    setDirection(-1);
    setStep((s) => Math.max(0, s - 1));
  }, []);

  /* ── Keyboard: Enter advances (except in textareas), Escape goes back ── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      const isTextarea = tag === "TEXTAREA";
      if (e.key === "Enter" && !isTextarea && step < STEP_COUNT) {
        e.preventDefault();
        next();
      } else if (e.key === "Escape" && step > 0 && step < STEP_COUNT) {
        e.preventDefault();
        back();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step, next, back]);

  /* ── Submit ──────────────────────────────────────────────── */
  const handleSubmit = () => {
    const e = validate(5);
    if (e) { setError(e); return; }

    // TODO: replace with secured backend POST
    if (typeof window !== "undefined") {
      // eslint-disable-next-line no-console
      console.log("[assessment submit — DEV ONLY]", answers);
    }
    setDirection(1);
    setStep(STEP_COUNT);
  };

  /* ── Track recommendation ────────────────────────────────── */
  const recommendation = useMemo(() => recommend(answers), [answers]);

  /* ── Render ──────────────────────────────────────────────── */
  const progress = step === STEP_COUNT ? 100 : Math.round((step / STEP_COUNT) * 100);

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress */}
      {step < STEP_COUNT && (
        <div className="mb-10 md:mb-14">
          <div className="flex items-center justify-between text-caption text-ink-soft mb-3">
            <span>Step {step + 1} of {STEP_COUNT}</span>
            <span>{progress}%</span>
          </div>
          <div className="relative h-[3px] rounded-full bg-line overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-clay rounded-full"
              initial={false}
              animate={{ width: `${progress}%` }}
              transition={{ duration: prefersReduced ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </div>
      )}

      {/* Step content */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={step}
          custom={direction}
          initial={
            prefersReduced ? { opacity: 0 } : { opacity: 0, x: direction * 24 }
          }
          animate={
            prefersReduced ? { opacity: 1 } : { opacity: 1, x: 0 }
          }
          exit={
            prefersReduced ? { opacity: 0 } : { opacity: 0, x: -direction * 24 }
          }
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {step === 0 && <Step0 answers={answers} update={update} />}
          {step === 1 && <Step1 answers={answers} update={update} />}
          {step === 2 && <Step2 answers={answers} update={update} />}
          {step === 3 && <Step3 answers={answers} update={update} toggleImaging={toggleImaging} />}
          {step === 4 && <Step4 answers={answers} update={update} />}
          {step === 5 && <Step5 answers={answers} update={update} />}
          {step === STEP_COUNT && (
            <Confirmation
              recommendation={recommendation}
              name={answers.name}
              concern={answers.concern}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Error banner */}
      <AnimatePresence>
        {error && step < STEP_COUNT && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="alert"
            className="mt-6 text-body-sm text-clay-dark bg-clay-soft/60 rounded-pill px-4 py-2 inline-block"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Nav buttons */}
      {step < STEP_COUNT && (
        <div className="mt-10 md:mt-14 flex items-center justify-between gap-4 border-t border-line pt-6">
          <button
            onClick={back}
            disabled={step === 0}
            className="text-body-sm font-medium text-ink-soft hover:text-ink disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200"
          >
            ← Back
          </button>

          <p className="hidden sm:block text-caption text-ink-soft">
            Press <kbd className="px-1.5 py-0.5 rounded bg-bone-deep border border-line">Enter</kbd> to continue
          </p>

          {step < STEP_COUNT - 1 ? (
            <Button variant="clay" size="lg" onClick={next} arrow>
              Continue
            </Button>
          ) : (
            <Button variant="clay" size="lg" onClick={handleSubmit} arrow>
              See my recommendation
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   STEPS
   ══════════════════════════════════════════════════════════════ */

/* ── Step 0: Primary concern ────────────────────────────────── */

const CONCERN_OPTS: { value: Concern; label: string; sub: string; cgm?: boolean }[] = [
  { value: "knee",         label: "Knee pain",                sub: "Stairs, getting up, walking distance" },
  { value: "back-neck",    label: "Back or neck pain",         sub: "Chronic ache, posture, stiffness" },
  { value: "arthritis",    label: "Arthritis",                 sub: "Osteoarthritis, rheumatoid, joint inflammation" },
  { value: "disc",         label: "Disc issues",               sub: "Bulge, sciatica, nerve symptoms" },
  { value: "bone-health",  label: "Bone health (osteoporosis)", sub: "Low DEXA, post-menopausal, fracture risk" },
  { value: "prevention",   label: "Prevention",                sub: "Family history, age-related risk, staying ahead" },
  { value: "blood-sugar",  label: "Managing blood sugar",       sub: "Borderline / pre-diabetic — flagged for CGM", cgm: true },
];

function Step0({ answers, update }: { answers: Answers; update: <K extends keyof Answers>(k: K, v: Answers[K]) => void }) {
  return (
    <fieldset>
      <StepHeader
        eyebrow="01 of 06"
        title="What brings you in today?"
        hint="Pick the one closest to what you're dealing with. We'll go deeper from here."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">
        {CONCERN_OPTS.map((opt) => (
          <OptionTile
            key={opt.value}
            selected={answers.concern === opt.value}
            onClick={() => update("concern", opt.value)}
            label={opt.label}
            sub={opt.sub}
            badge={opt.cgm ? "CGM" : undefined}
          />
        ))}
      </div>
    </fieldset>
  );
}

/* ── Step 1: Severity, duration, pain slider ────────────────── */

function Step1({ answers, update }: { answers: Answers; update: <K extends keyof Answers>(k: K, v: Answers[K]) => void }) {
  return (
    <fieldset className="flex flex-col gap-10">
      <div>
        <StepHeader
          eyebrow="02 of 06"
          title="How does it feel, and how long has it been?"
          hint="Honest answers help the doctor design around the real picture."
        />
      </div>

      <div>
        <SubLabel>Severity right now</SubLabel>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
          {[
            { v: "mild" as const, l: "Mild", s: "Annoying, but I get on with the day" },
            { v: "moderate" as const, l: "Moderate", s: "I avoid some activities" },
            { v: "severe" as const, l: "Severe", s: "It limits most of my day" },
          ].map((o) => (
            <OptionTile
              key={o.v}
              selected={answers.severity === o.v}
              onClick={() => update("severity", o.v)}
              label={o.l}
              sub={o.s}
            />
          ))}
        </div>
      </div>

      <div>
        <SubLabel>How long has it been going on?</SubLabel>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-3">
          {[
            { v: "<3-months" as const, l: "Less than 3 months" },
            { v: "3-12-months" as const, l: "3–12 months" },
            { v: "1-3-years" as const, l: "1–3 years" },
            { v: "3+years" as const, l: "Over 3 years" },
          ].map((o) => (
            <PillChoice
              key={o.v}
              selected={answers.duration === o.v}
              onClick={() => update("duration", o.v)}
              label={o.l}
            />
          ))}
        </div>
      </div>

      <div>
        <SubLabel>Pain level today (0 = none, 10 = worst imaginable)</SubLabel>
        <div className="mt-5 flex items-center gap-5">
          <span className="text-h2 font-display text-clay w-12 text-center">
            {answers.pain}
          </span>
          <input
            type="range"
            min={0}
            max={10}
            value={answers.pain}
            onChange={(e) => update("pain", Number(e.target.value))}
            className="flex-1 accent-clay"
            aria-label="Pain level"
          />
        </div>
        <div className="flex justify-between mt-2 text-caption text-ink-soft">
          <span>0 · None</span>
          <span>5 · Moderate</span>
          <span>10 · Worst</span>
        </div>
      </div>
    </fieldset>
  );
}

/* ── Step 2: Activity + lifting experience ──────────────────── */

function Step2({ answers, update }: { answers: Answers; update: <K extends keyof Answers>(k: K, v: Answers[K]) => void }) {
  return (
    <fieldset className="flex flex-col gap-10">
      <StepHeader
        eyebrow="03 of 06"
        title="How active are you, right now?"
        hint="There are no wrong answers here. We meet you where you are."
      />

      <div>
        <SubLabel>Current activity level</SubLabel>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          {[
            { v: "sedentary" as const, l: "Sedentary",       s: "Mostly sitting; little structured movement" },
            { v: "light" as const,     l: "Light activity",  s: "A few walks a week; the occasional yoga" },
            { v: "moderate" as const,  l: "Moderate",        s: "Regular walks, yoga, or light cardio" },
            { v: "active" as const,    l: "Active",          s: "Train 3+ days a week, or sport regularly" },
          ].map((o) => (
            <OptionTile
              key={o.v}
              selected={answers.activity === o.v}
              onClick={() => update("activity", o.v)}
              label={o.l}
              sub={o.s}
            />
          ))}
        </div>
      </div>

      <div>
        <SubLabel>Strength-training experience</SubLabel>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
          {[
            { v: "none" as const,    l: "Never lifted a dumbbell", s: "Completely new — welcome." },
            { v: "some" as const,    l: "A little, on and off",     s: "Tried gyms, didn't stick" },
            { v: "regular" as const, l: "I train regularly",        s: "Strength is part of my week" },
          ].map((o) => (
            <OptionTile
              key={o.v}
              selected={answers.experience === o.v}
              onClick={() => update("experience", o.v)}
              label={o.l}
              sub={o.s}
            />
          ))}
        </div>
      </div>
    </fieldset>
  );
}

/* ── Step 3: Age + treatment + imaging + uploads ─────────────── */

function Step3({
  answers,
  update,
  toggleImaging,
}: {
  answers: Answers;
  update: <K extends keyof Answers>(k: K, v: Answers[K]) => void;
  toggleImaging: (v: Imaging) => void;
}) {
  return (
    <fieldset className="flex flex-col gap-10">
      <StepHeader
        eyebrow="04 of 06"
        title="A bit about your medical context."
        hint="Everything you share is reviewed only by Dr. Shruthi's clinical team."
      />

      <div>
        <SubLabel>Age band</SubLabel>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mt-3">
          {(["<30","30-39","40-49","50-59","60-69","70+"] as AgeBand[]).map((v) => (
            <PillChoice
              key={v}
              selected={answers.ageBand === v}
              onClick={() => update("ageBand", v)}
              label={v}
            />
          ))}
        </div>
      </div>

      <div>
        <SubLabel>Current treatment or medication <span className="text-ink-soft/60 font-normal">(optional)</span></SubLabel>
        <textarea
          value={answers.treatment}
          onChange={(e) => update("treatment", e.target.value)}
          placeholder="e.g. on Methotrexate, take Vitamin D weekly, had a knee replacement 2 years ago…"
          rows={3}
          className="mt-3 w-full rounded-[14px] bg-calcium border border-line text-body text-ink p-4 outline-none focus:border-clay transition-colors duration-200"
        />
      </div>

      <div>
        <SubLabel>Relevant imaging you have <span className="text-ink-soft/60 font-normal">(optional)</span></SubLabel>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">
          {[
            { v: "dexa" as const, l: "DEXA" },
            { v: "xray" as const, l: "X-ray" },
            { v: "mri"  as const, l: "MRI" },
            { v: "none" as const, l: "None / not sure" },
          ].map((o) => (
            <PillChoice
              key={o.v}
              selected={answers.imaging.includes(o.v)}
              onClick={() => toggleImaging(o.v)}
              label={o.l}
            />
          ))}
        </div>

        <label className="mt-5 flex items-center gap-3 text-body-sm text-ink-soft cursor-pointer">
          <input type="file" multiple className="hidden" />
          <span className="inline-flex items-center gap-2 rounded-pill bg-bone-deep px-4 py-2 hover:bg-line transition-colors duration-200">
            <UploadIcon /> Upload reports (optional)
          </span>
          <span className="text-caption">PDF / image — secured upload (TODO).</span>
        </label>
      </div>
    </fieldset>
  );
}

/* ── Step 4: Nutrition pre-questionnaire ────────────────────── */

function Step4({ answers, update }: { answers: Answers; update: <K extends keyof Answers>(k: K, v: Answers[K]) => void }) {
  return (
    <fieldset className="flex flex-col gap-10">
      <StepHeader
        eyebrow="05 of 06"
        title="A few things about how you eat."
        hint="Your nutrition plan is built off this — we tune it to your plate, not the other way around."
      />

      <div>
        <SubLabel>Diet</SubLabel>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
          {[
            { v: "veg" as const,        l: "Vegetarian",  s: "No meat or fish" },
            { v: "eggetarian" as const, l: "Eggetarian",  s: "Vegetarian + eggs" },
            { v: "non-veg" as const,    l: "Non-vegetarian", s: "Everything is on the table" },
          ].map((o) => (
            <OptionTile
              key={o.v}
              selected={answers.diet === o.v}
              onClick={() => update("diet", o.v)}
              label={o.l}
              sub={o.s}
            />
          ))}
        </div>
      </div>

      <div>
        <SubLabel>Allergies or foods you avoid <span className="text-ink-soft/60 font-normal">(optional)</span></SubLabel>
        <input
          value={answers.allergies}
          onChange={(e) => update("allergies", e.target.value)}
          placeholder="e.g. lactose intolerant, no shellfish, gluten sensitivity"
          className="mt-3 w-full rounded-[14px] bg-calcium border border-line text-body text-ink p-4 outline-none focus:border-clay transition-colors duration-200"
        />
      </div>

      <div>
        <SubLabel>Food preferences or context <span className="text-ink-soft/60 font-normal">(optional)</span></SubLabel>
        <textarea
          value={answers.preferences}
          onChange={(e) => update("preferences", e.target.value)}
          rows={3}
          placeholder="e.g. cook most meals at home, travel weekly for work, prefer South Indian breakfasts…"
          className="mt-3 w-full rounded-[14px] bg-calcium border border-line text-body text-ink p-4 outline-none focus:border-clay transition-colors duration-200"
        />
      </div>
    </fieldset>
  );
}

/* ── Step 5: Contact ────────────────────────────────────────── */

function Step5({ answers, update }: { answers: Answers; update: <K extends keyof Answers>(k: K, v: Answers[K]) => void }) {
  return (
    <fieldset className="flex flex-col gap-8">
      <StepHeader
        eyebrow="06 of 06"
        title="Where can we send your recommendation?"
        hint="A real person from Dr. Shruthi's team reviews every assessment shortly."
      />

      <div className="grid grid-cols-1 gap-5">
        <Field
          label="Your name"
          value={answers.name}
          onChange={(v) => update("name", v)}
          placeholder="Full name"
          autoComplete="name"
        />
        <Field
          label="Email"
          type="email"
          value={answers.email}
          onChange={(v) => update("email", v)}
          placeholder="you@example.com"
          autoComplete="email"
        />
        <Field
          label="Phone"
          type="tel"
          value={answers.phone}
          onChange={(v) => update("phone", v)}
          placeholder="+91 …"
          autoComplete="tel"
        />
      </div>

      <p className="text-caption text-ink-soft">
        By submitting you consent to Reconnect&rsquo;s clinical team reviewing the information
        above for the sole purpose of recommending a program. We will not share it with
        third parties. <span className="italic">(Full consent + privacy copy TODO before launch.)</span>
      </p>
    </fieldset>
  );
}

/* ══════════════════════════════════════════════════════════════
   CONFIRMATION
   ══════════════════════════════════════════════════════════════ */

function Confirmation({
  recommendation,
  name,
  concern,
}: {
  recommendation: { track: "Prevent" | "Manage" | "Recover" | "CGM"; href: string; reason: string };
  name: string;
  concern: Concern | "";
}) {
  const isCGM = recommendation.track === "CGM";
  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-clay-soft text-clay-dark mb-6">
        <svg width="28" height="28" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 10l4 4 8-8" />
        </svg>
      </div>

      <p className="text-eyebrow text-clay">Thank you, {name || "friend"}</p>
      <h2 className="text-h2 font-display text-ink mt-4">
        Based on what you shared, we&rsquo;d start you on{" "}
        <span className="serif-italic text-clay">{recommendation.track}.</span>
      </h2>

      <p className="text-body-lg text-ink-soft mt-6 max-w-xl mx-auto">
        {recommendation.reason}
      </p>

      <p className="text-body-sm text-ink-soft mt-4 max-w-xl mx-auto">
        Dr.&nbsp;Shruthi&rsquo;s team will review your full assessment and confirm — or
        adjust — this recommendation shortly.
      </p>

      <div className="flex flex-wrap justify-center gap-4 mt-10">
        <Button variant="clay" size="lg" href="/contact" arrow>
          Book consultation
        </Button>
        <Button variant="sage-outline" size="lg" href={recommendation.href} arrow>
          Explore {recommendation.track}
        </Button>
      </div>

      {concern === "blood-sugar" && !isCGM && (
        <p className="text-caption text-ink-soft mt-8 max-w-md mx-auto">
          You also flagged blood-sugar management — ask the team about pairing your track
          with our <Link href="/cgm" className="text-clay underline-offset-4 hover:underline">CGM program</Link>.
        </p>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   RECOMMENDATION LOGIC (deliberately conservative)
   ══════════════════════════════════════════════════════════════ */

function recommend(a: Answers): { track: "Prevent" | "Manage" | "Recover" | "CGM"; href: string; reason: string } {
  if (a.concern === "blood-sugar") {
    return {
      track: "CGM",
      href: "/cgm",
      reason:
        "The CGM program is built for borderline-diabetic and medication-avoidant adults — six months of continuous monitoring and personalised nutrition adjustments.",
    };
  }

  // Post-surgical signal in free-text → Recover
  const surgicalSignal = /surger|replacement|post[- ]?op|fracture/i.test(a.treatment);

  if (
    a.severity === "severe" ||
    a.pain >= 7 ||
    surgicalSignal
  ) {
    return {
      track: "Recover",
      href: "/programs/recover",
      reason:
        "Your answers suggest a more cautious, milestone-gated rebuild. The Recover track works closely with your treating doctor and progresses only as your body — and they — allow.",
    };
  }

  if (a.concern === "prevention" || a.concern === "bone-health") {
    return {
      track: "Prevent",
      href: "/programs/prevent",
      reason:
        "The Prevent track is designed for early signs, family history, and bone-health goals — building strength and density before problems set in.",
    };
  }

  return {
    track: "Manage",
    href: "/programs/manage",
    reason:
      "The Manage track is built for living arthritis, joint pain, and back issues — calming pain first, then building a stronger body around it.",
  };
}

/* ══════════════════════════════════════════════════════════════
   SHARED UI PIECES
   ══════════════════════════════════════════════════════════════ */

function StepHeader({ eyebrow, title, hint }: { eyebrow: string; title: string; hint: string }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-eyebrow text-clay">{eyebrow}</p>
      <h2 className="text-h2 font-display text-ink leading-tight">{title}</h2>
      <p className="text-body text-ink-soft max-w-2xl">{hint}</p>
    </div>
  );
}

function SubLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-eyebrow text-ink-soft">{children}</p>;
}

function OptionTile({
  selected,
  onClick,
  label,
  sub,
  badge,
}: {
  selected: boolean;
  onClick: () => void;
  label: string;
  sub: string;
  badge?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`group relative text-left rounded-[16px] p-5 border transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        selected
          ? "bg-clay-soft/40 border-clay text-ink shadow-soft"
          : "bg-calcium border-line text-ink hover:border-ink-soft/40 hover:bg-bone-deep/40"
      }`}
    >
      {badge && (
        <span className="absolute top-3 right-3 text-caption font-medium text-sage bg-sage-tint rounded-pill px-2 py-0.5">
          {badge}
        </span>
      )}
      <div className="flex items-center gap-3">
        <span className={`inline-block w-4 h-4 rounded-full border ${selected ? "bg-clay border-clay" : "border-ink-soft/30"}`} aria-hidden="true" />
        <span className="text-body font-medium">{label}</span>
      </div>
      <p className="text-body-sm text-ink-soft mt-2 pl-7">{sub}</p>
    </button>
  );
}

function PillChoice({
  selected,
  onClick,
  label,
}: {
  selected: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`rounded-pill px-4 py-2.5 text-body-sm font-medium transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] border ${
        selected
          ? "bg-clay text-calcium border-clay"
          : "bg-calcium text-ink border-line hover:border-ink-soft/40"
      }`}
    >
      {label}
    </button>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-eyebrow text-ink-soft">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="rounded-[14px] bg-calcium border border-line text-body text-ink p-4 outline-none focus:border-clay transition-colors duration-200"
      />
    </label>
  );
}

function UploadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 3v8m0-8L5 6m3-3 3 3" />
      <path d="M3 13h10" />
    </svg>
  );
}
