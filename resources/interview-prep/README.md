<div align="center">

# 💼 QA to SDET Interview Prep

**Real questions, honest answers, no fluff.**

</div>

---

## 📑 Table of Contents

- [How to Use This Page](#-how-to-use-this-page)
- [Manual Testing Questions](#-manual-testing-questions)
- [API Testing Questions](#-api-testing-questions)
- [Playwright & Automation Questions](#-playwright--automation-questions)
- [Framework Design Questions](#-framework-design-questions)
- [Behavioral Questions](#-behavioral-questions)
- [Portfolio Presentation Guide](#-portfolio-presentation-guide)
- [Questions to Ask Them](#-questions-to-ask-them)

---

## 📖 How to Use This Page

These aren't trick questions — they're the questions that actually come up, because they're the
questions that reveal whether you *understand* the concepts or just memorized definitions. For
each one, the "what they're really checking" line matters more than the sample answer — internalize
that, and you can handle whatever specific phrasing an interviewer uses.

---

## 🧪 Manual Testing Questions

**"What's the difference between a test scenario and a test case?"**
> What they're checking: do you understand the *level* of detail, not just the words.
> A scenario is high-level ("verify login works"). A case is step-by-step, with specific data and
> expected results. See [Module 01](../../01-manual-testing/exercises/README.md) for the full
> breakdown with examples.

**"Explain severity vs. priority with an example."**
> What they're checking: do you know these are set by *different people* for *different reasons*.
> Severity = technical impact (set by QA). Priority = business urgency (set by Product). A typo
> on the homepage is low severity but can be high priority (visibility). A rare crash on an edge
> case is high severity but can be low priority (few users affected).

**"How would you test a login page?"**
> What they're checking: do you go past "type email, type password, click login." A strong answer
> covers: positive path, negative path (wrong password, empty fields), boundary values (max
> length email), security (SQL injection attempt, XSS), and UX (password masking, "remember me").

**"What's the defect life cycle?"**
> New → Assigned → Open → Fixed → Ready for Retest → Retest → Verified → Closed (with Reopened
> and Rejected branches). Know this cold — it comes up constantly, and knowing the *branches*
> (why something gets Reopened or Rejected) shows more depth than reciting the happy path.

---

## 🔌 API Testing Questions

**"What's the difference between PUT and PATCH?"**
> PUT replaces the entire resource. PATCH updates part of it. Bonus depth: PUT is idempotent
> (same call 5 times = same result), PATCH isn't always.

**"How do you test an API without a UI?"**
> Postman/REST-assured/Playwright's `request` fixture, hitting endpoints directly, validating
> status codes, response schema, and specific field values — see
> [Module 02](../../02-api-testing/) and the
> [API testing reference cheatsheet](../cheatsheets/api-testing-reference.md).

**"What would you test for a POST endpoint that creates a user?"**
> Valid creation (201 + correct body), missing required fields (400), duplicate email (409 or
> 400 depending on the API's contract), field type mismatches, and a check that the created
> resource is actually retrievable afterward (not just that creation returned 201).

**"How do you handle authentication in automated API tests?"**
> Never hardcode tokens. Load from environment variables, generate a fresh token in test setup
> when possible, and use a shared authenticated request context to avoid re-authenticating on
> every single test. See [Module 04](../../04-playwright-api-automation/).

---

## 🎭 Playwright & Automation Questions

**"Why Playwright over Selenium?"**
> Built-in auto-waiting (no `Thread.sleep()`), one API across Chromium/Firefox/WebKit, native
> network interception, and genuinely good debugging tools (Trace Viewer, UI mode). Don't say
> "Selenium is bad" — say what Playwright specifically solves.

**"What's auto-waiting and why does it matter?"**
> Playwright waits for an element to be visible, stable, and receiving events before acting on
> it — automatically, on every action. This eliminates flaky tests caused by fixed-time waits
> (`sleep(3000)`) that are either too short (flaky) or too long (slow for no reason).

**"What's the locator priority you follow, and why?"**
> `getByRole`/`getByLabel` first (survive redesigns, match accessibility), CSS/XPath last resort
> (brittle, tied to implementation details, not user-facing intent). See
> [Module 03](../../03-playwright-basics/) for the full reasoning.

**"How do you debug a test that only fails in CI?"**
> `trace: 'retain-on-failure'` in config, download the trace artifact from the failed CI run,
> `npx playwright show-trace`. This gives a full timeline — DOM state, network, console — without
> needing to reproduce it live. See [Module 07](../../07-tools-and-environment/).

---

## 🏗️ Framework Design Questions

**"What's the difference between a script collection and a framework?"**
> A framework is a system where test #200 is as easy to add as test #5 — because config, auth,
> page objects, and data all already exist as reusable layers. A script collection means every
> new test re-implements the same setup. See [Module 06](../../06-framework-design/) for the full
> answer with a real layered architecture example.

**"What design patterns have you used in test automation?"**
> Inheritance (`LoginPage extends BasePage`), Composition (a page owns a `Table` component rather
> than inheriting from it), Dependency Injection (fixtures handing tests ready-made page objects),
> fail-fast validation (config that crashes loudly on a missing required variable instead of
> failing silently later). Point to real code, not textbook definitions.

**"How do you handle test data in your framework?"**
> Domain-realistic generation (Faker.js, shaped to match real formats — not just random strings),
> named data-provider functions rather than inline literals scattered across test files, and API
> calls for fast setup instead of clicking through the UI to create every precondition.

**"How would you structure CI for a large test suite?"**
> Tag-based execution (`@smoke` on every push, `@regression` nightly), sharding across parallel
> CI runners for wall-clock speed, artifact upload for reports/traces (heavier artifacts only
> `on: failure`), and secrets from the CI platform's secret store, never committed. See
> [Module 08](../../08-git-github-and-cicd/).

---

## 🗣️ Behavioral Questions

**"Tell me about a bug you found that others missed."**
> Structure: the scenario, why it wasn't obvious, how you found it, why it mattered. Specificity
> wins — "I found a double-submission bug when clicking Pay twice on a slow connection created
> two transactions" beats "I found a lot of bugs."

**"Describe a disagreement with a developer about whether something is a bug."**
> Show you argue with evidence (repro steps, requirements, user impact), not ego — and that you
> can be wrong gracefully. Interviewers are checking for collaboration skill, not "who won."

**"How do you prioritize testing when you don't have time to test everything?"**
> Risk-based: recently changed code, high-traffic paths, financially/legally sensitive flows
> first. Reference the "defects cluster together" testing principle from
> [Module 01](../../01-manual-testing/concepts/README.md) — 80% of bugs often live in 20% of the
> codebase, so risk-based prioritization isn't corner-cutting, it's how experienced testers
> actually allocate limited time.

---

## 📁 Portfolio Presentation Guide

When walking through your [capstone project](../../10-real-world-projects/):

1. **The domain, in one sentence.**
2. **One interesting technical decision** — not "I used Playwright," something specific (a custom
   assertion, a fixture design choice, a hybrid API+UI test).
3. **One real bug and why it mattered** — concrete beats vague, every time.
4. **What you'd improve given more time** — shows judgment, not just task completion.

Full version of this guide lives in
[Module 10](../../10-real-world-projects/README.md#-presenting-this-in-an-interview).

---

## ❓ Questions to Ask Them

Interviews go both ways. Worth asking:

- "What does your test automation coverage actually look like today — mostly UI, mostly API, a mix?"
- "How do flaky tests get handled here — is there a process, or do people just re-run and hope?"
- "Is QA involved during design/requirements, or only after development is done?"
- "What does the path from QA to SDET (or SDET to senior SDET) actually look like on this team?"

These aren't just polite filler — the answers tell you a lot about whether testing is taken
seriously at that company, which matters as much as the salary number.

---

<div align="center">

**[← Back to Resources](../README.md)**

</div>
