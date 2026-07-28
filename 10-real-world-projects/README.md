<div align="center" markdown="1">

# 🚀 Real-World Projects (Capstone)

![Status](https://img.shields.io/badge/status-active-success.svg)
![Level](https://img.shields.io/badge/level-advanced-red.svg)
![Duration](https://img.shields.io/badge/duration-4--6%20weeks-blue.svg)

**Everything before this module was practice. This is where you build the thing that actually gets you hired.**

</div>

---

## 📑 Table of Contents

- [The Point of This Module](#-the-point-of-this-module)
- [What "Portfolio-Ready" Actually Means](#-what-portfolio-ready-actually-means)
- [Three Project Tracks](#-three-project-tracks)
  - [Track 1: Fintech Transaction Platform (Beginner-Friendly Domain, Real Depth)](#-track-1-fintech-transaction-platform)
  - [Track 2: Domain Portal With Cross-System Consistency](#-track-2-domain-portal-with-cross-system-consistency)
  - [Track 3: AI-Adjacent Support/Dispute Flow](#-track-3-ai-adjacent-supportdispute-flow)
- [Picking Your Own Project Instead](#-picking-your-own-project-instead)
- [The Deliverable Checklist](#-the-deliverable-checklist)
- [README Template](#-readme-template-copy-this)
- [Self-Grading Rubric](#-self-grading-rubric)
- [Presenting This in an Interview](#-presenting-this-in-an-interview)
- [You Made It — Now What](#-you-made-it--now-what)

---

## 🎯 The Point of This Module

Nobody hires a QA/SDET candidate because they can recite Equivalence Partitioning from memory.
They hire because you can point at a real GitHub link and say "I built this, here's the thinking
behind it, ask me anything." This module is entirely about producing that link.

You've spent 9 modules building individual skills: manual test design, API testing, Playwright UI
automation, a real Hybrid framework, CI/CD, AI-assisted testing. This module is where those stop
being separate skills and become **one coherent project** that demonstrates all of them together.

> [!IMPORTANT]
> A project that "has some Playwright tests" is not what gets you hired. A project with a clear
> business domain, a real framework architecture (Module 06), CI wired up (Module 08), a couple
> of genuinely interesting bugs you found and documented, and an honest README about what's real
> vs. what's simulated — **that's** what makes an interviewer stop skimming and start asking
> follow-up questions.

---

## 🧭 What "Portfolio-Ready" Actually Means

Before picking a track, understand the bar:

| Not portfolio-ready | Portfolio-ready |
|---|---|
| 10 tests, all happy-path, all passing | A mix of positive/negative/boundary tests, honestly labeled |
| One giant `test.spec.ts` file | Layered structure from Module 06 (pages, fixtures, data, assertions) |
| No README, or a README that just says "run `npm test`" | A README explaining the domain, the architecture, and how to run it |
| Claims found "50+ bugs" with no evidence | 2-3 real, well-documented bugs (or honestly-labeled *simulated* bugs) with repro steps |
| No CI | A GitHub Actions workflow that actually runs on push |
| Fabricated screenshots/metrics | Real output from real runs — or clearly marked as illustrative |

That last row matters more than people think. **A recruiter or interviewer who catches one
fabricated detail stops trusting the rest of the repo, even the real parts.** Everything in your
project should be either genuinely true or explicitly labeled as illustrative/simulated. This
exact honesty standard is why every real portfolio repo this roadmap draws examples from uses
bracketed placeholders like `[Add Duration]` rather than invented numbers — copy that habit.

---

## 🗂️ Three Project Tracks

Pick **one**. Each track below is modeled on a real domain from public fintech/multi-domain
portfolio repos — you're not copying anyone's code (there isn't automation code to copy in those
repos, they're manual-testing case-study repos), you're using their **domain framing** as a
realistic brief, then building the actual Playwright automation yourself from Modules 03-08.

### 🏦 Track 1: Fintech Transaction Platform

**Modeled on:** payment collection / payout / bill-payment systems — the domain this entire
roadmap's automation examples have been pulled from
([`fintech-collection-engine`](https://github.com/ghanendra-sdet/fintech-collection-engine),
[`bbps-bill-payment-platform`](https://github.com/ghanendra-sdet/bbps-bill-payment-platform)).

**Why this domain teaches the most, fastest:** money math is unforgiving. A UI bug is annoying. A
settlement calculation bug is a real financial discrepancy. This forces you to write the kind of
custom domain assertions from Module 06 (`assertSettlementCalculation`) instead of only surface
checks.

**Build:**
- A demo transaction/payment app (use a free practice site like
  [Automation Exercise](https://automationexercise.com/) as the UI-under-test, or build a tiny
  mock app yourself if you want extra credit)
- POM-based UI suite: transaction list, search/filter, transaction detail view
- API test suite: create/fetch/refund flow, boundary tests on amounts (zero, negative, over-limit)
- **At least one custom domain assertion** that recomputes a calculation rather than checking a
  hardcoded string
- CI pipeline running smoke + regression tags separately

**Real bug categories to specifically hunt for:** double-submission on a slow network (does
clicking "Pay" twice create two transactions?), currency/decimal rounding errors, status not
updating after an async operation completes.

---

### 🏥 Track 2: Domain Portal With Cross-System Consistency

**Modeled on:** multi-portal systems where the same data has to stay consistent across different
user-facing views — the exact challenge documented in domains like
[`healthcare-insurance-platform`](https://github.com/ghanendra-sdet/healthcare-insurance-platform)
(claim status must match across patient portal, provider portal, and admin portal) or
[`travel-marketplace-platform`](https://github.com/ghanendra-sdet/travel-marketplace-platform)
(booking availability must stay consistent under concurrent access).

**Why this domain teaches the most, fastest:** most real enterprise bugs aren't "the button is
broken" — they're "screen A says one thing and screen B says another, because they read from
different services that fell out of sync." Testing for consistency *across* views is a different
skill than testing one view in isolation.

**Build:**
- Two or three "portals" (can be different sections of the same demo app, or a small mock app you
  build with 2-3 different views of the same underlying data)
- Tests that create/change state via one view (or the API from Module 04) and verify it's
  reflected correctly in the other view(s)
- At least one test targeting a race condition or timing issue (two near-simultaneous actions on
  the same resource)
- A documented (even if simulated) example of a cross-portal inconsistency bug, with clear repro
  steps

---

### 🧩 Track 3: AI-Adjacent Support/Dispute Flow

**Modeled on:** a shared AI-driven support/resolution system —
[`ai-dispute-resolution-engine`](https://github.com/ghanendra-sdet/ai-dispute-resolution-engine),
which centralizes support handling across five other products into one shared engine.

**Why this domain teaches the most, fastest:** this is the track that directly exercises
[Module 09](../09-ai-assisted-testing/) — testing something where "same input → same output"
isn't a safe assumption anymore.

**Build:**
- A small support-ticket-style flow (can be simulated — you don't need a real LLM integration to
  practice the *testing methodology*; you can mock varying/inconsistent responses to test against)
- Tests for the AI-feature-testing checklist from Module 09: intent classification stability
  across repeated runs, escalation-path triggering on ambiguous input, context retention across a
  multi-turn interaction
- At least one test that explicitly checks graceful degradation (what happens when the "AI"
  service times out or errors)

---

## 🎨 Picking Your Own Project Instead

If none of the three tracks fit what you actually want to showcase (say, you want an e-commerce
project because that's the job market you're targeting), that's completely fine — the tracks are
a scaffold, not a requirement. Just make sure whatever you pick has:

- A real business domain with actual rules (not just "click buttons," something has to be
  *correct*, not just *clickable*)
- At least one calculation, state machine, or cross-system consistency requirement worth testing
  specifically (this is what separates a project with depth from a tutorial clone)
- A free, stable practice site or a small app you build yourself — don't test a random production
  site you don't own; that's a legal and ethical line, not just a technical inconvenience

---

## ✅ The Deliverable Checklist

Your finished project must have:

- [ ] A layered framework structure (Module 06): base classes, page objects, fixtures, data
      providers, at least one custom assertion
- [ ] At least 15-20 tests across smoke/regression tags, a real mix of positive/negative/boundary
- [ ] At least one hybrid test (API for setup, UI for the actual assertion — Module 04)
- [ ] A working CI pipeline (Module 08) — screenshot or link to a real green run
- [ ] 2-3 documented bugs (real or clearly-labeled simulated) with repro steps, following the bug
      report format from [Module 01](../01-manual-testing/exercises/bug-report-template.md)
- [ ] A README following the template below
- [ ] Zero fabricated metrics. `[Add real duration]`-style placeholders beat invented numbers,
      every time.

---

## 📄 README Template (Copy This)

```markdown
# [Project Name]

## What This Tests
[1-2 sentences: the domain, what app/site is under test]

## Why This Domain
[1-2 sentences: what specifically makes this domain interesting to test —
 a calculation, a consistency requirement, a race condition, etc.]

## Architecture
[Brief description of your layer structure — link to key files]

## Running the Suite
\`\`\`bash
npm install
npx playwright install
npm test              # full suite
npm run test:smoke    # smoke only
\`\`\`

## Notable Bugs Found
[2-3 real or clearly-labeled-simulated bugs, with repro steps and why they matter]

## CI
[Link to your GitHub Actions workflow / a screenshot of a green run]

## What I'd Add With More Time
[Honest, short list — this shows judgment, not just execution]
```

That last section — "what I'd add with more time" — is a small addition that does a lot of work
in an interview. It signals you know the difference between "finished" and "good enough to ship,"
which is a real, valuable distinction.

---

## 📊 Self-Grading Rubric

| Category | What "Good" Looks Like |
|---|---|
| **Test design** | Clear mix of positive/negative/boundary, not just happy-path repetition |
| **Framework quality** | Layers are actually separated (Module 06) — no locators inside test files |
| **Domain understanding** | At least one test verifies a *business rule*, not just "element is visible" |
| **CI/CD** | Pipeline actually runs and actually reports pass/fail, not just present for show |
| **Documentation honesty** | Nothing fabricated; placeholders instead of invented numbers |
| **Bug reports** | Reproducible, clear severity/priority reasoning, not vague |

If you can honestly check every box, this project is ready to link on a resume and a LinkedIn
profile — not as "I followed a tutorial," but as "I built this."

---

## 🎤 Presenting This in an Interview

When someone asks "walk me through a project," this is the structure that lands well — because
it mirrors how you'd actually explain any real piece of engineering work:

1. **The domain, in one sentence.** "This tests a fintech transaction platform — the core
   challenge is verifying settlement calculations stay correct, not just that buttons work."
2. **One interesting technical decision.** "I built a custom assertion that recomputes the
   settlement formula instead of checking a hardcoded string, because a formula bug wouldn't
   show up any other way."
3. **One real bug you found (or a well-designed simulated one) and why it mattered.** Specifics
   beat vague claims — "I found a double-submission bug where clicking Pay twice on a slow
   network created two transactions" is concrete and memorable. "I found a lot of bugs" is not.
4. **What you'd improve given more time.** Shows judgment, not just task completion.

Notice what's absent from that structure: inflated numbers, vague superlatives, or claiming
credit for things you didn't actually build. The honest version is also, genuinely, the more
impressive version — interviewers can tell the difference.

---

## 🎓 You Made It — Now What

If you've built a real project from this module, you've completed the entire roadmap: Manual
Testing → API Testing → Playwright (Basics, API, UI) → Framework Design → Tools & CI/CD →
AI-Assisted Testing → a real, portfolio-worthy capstone project.

**What's next is not more tutorials.** It's:

- Push your project, write a clear PR history (not one giant commit), and pin it on your GitHub profile
- Apply the exact self-grading rubric above to it, honestly, and fix whatever falls short
- Start contributing to or reviewing open-source test suites — reading other people's frameworks
  sharpens judgment faster than building in isolation
- Revisit [Module 09](../09-ai-assisted-testing/) periodically — this is the area that will keep
  changing fastest, and staying current here is a real career advantage, not busywork

---

<div align="center" markdown="1">

**[⬆ Back to Top](#-real-world-projects-capstone)** | **[🏠 Main README](../README.md)**

**You started at "what's the difference between a test scenario and a test case." You just finished designing a framework and shipping a capstone project. That's the whole journey.**

</div>
