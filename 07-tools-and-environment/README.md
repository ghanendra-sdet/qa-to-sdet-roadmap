<div align="center">

# 🛠️ Tools & Environment (Advanced)

![Status](https://img.shields.io/badge/status-active-success.svg)
![Level](https://img.shields.io/badge/level-intermediate-orange.svg)
![Duration](https://img.shields.io/badge/duration-1%20week-blue.svg)

**Module 00 got Node and VS Code installed. This module is about the tooling that makes a framework survive contact with a real team, a real CI server, and a bug that only happens "on someone else's machine."**

</div>

---

## 📑 Table of Contents

- [What's Different From Module 00](#-whats-different-from-module-00)
- [Docker: "Works On My Machine," Solved](#-docker-works-on-my-machine-solved)
- [Multi-Browser & Multi-Environment Matrices](#-multi-browser--multi-environment-matrices)
- [The Trace Viewer, Properly](#-the-trace-viewer-properly)
- [Structured Logging](#-structured-logging)
- [Reporting: HTML + Allure](#-reporting-html--allure)
- [Secrets & Environment Management](#-secrets--environment-management)
- [npm Scripts as a Team Interface](#-npm-scripts-as-a-team-interface)
- [Hands-On Exercise](#-hands-on-exercise)
- [Common Mistakes](#-common-mistakes)
- [Next Steps](#-next-steps)

---

## 🆚 What's Different From Module 00

[Module 00](../00-introduction/) got you a working local setup: Node, Git, VS Code, Postman. That
was "can I write and run one test." This module is "can a whole team run this framework
identically, on any machine, and actually debug it when it breaks in CI at 2am and nobody's
awake to babysit it."

Different problem. Different toolkit.

---

## 🐳 Docker: "Works On My Machine," Solved

Every QA engineer has heard "it works on my machine" and every QA engineer has learned to hate
that sentence, because it usually means a browser version mismatch, a missing system dependency,
or an OS-specific rendering quirk. Docker kills that excuse by running tests inside an identical,
disposable container every time — your laptop, your teammate's laptop, and the CI server all run
the *exact same* environment.

```dockerfile
# Dockerfile
FROM mcr.microsoft.com/playwright:v1.52.0-jammy

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .

CMD ["npx", "playwright", "test"]
```

That base image (`mcr.microsoft.com/playwright`) is maintained by the Playwright team and comes
with all three browser engines and their system dependencies pre-installed — no separate
`npx playwright install-deps` dance, no "missing shared library" errors that only show up on a
fresh Linux CI runner.

```bash
# Build once
docker build -t paywize-tests .

# Run anywhere, identically
docker run --env-file .env paywize-tests

# Run against staging, mount results back to your host machine
docker run --env ENV=staging \
  -v $(pwd)/playwright-report:/app/playwright-report \
  paywize-tests
```

> [!TIP]
> The `-v` volume mount matters — without it, your test results die inside the container the
> moment it exits. Mounting `playwright-report` back to your host is how you actually get to
> *look* at what happened after a containerized run.

---

## 🌐 Multi-Browser & Multi-Environment Matrices

You already saw the config-level piece of this in Module 05 (`projects: [chromium, firefox,
webkit]`). The "advanced tooling" piece is running that matrix **efficiently** — not sequentially,
one browser at a time, taking three times as long for no reason:

```bash
# Run all configured projects in parallel (this is the default with fullyParallel: true)
npx playwright test

# Explicitly cap workers for a resource-constrained CI runner
npx playwright test --workers=4

# Shard a huge suite across multiple CI machines
npx playwright test --shard=1/3
npx playwright test --shard=2/3
npx playwright test --shard=3/3
```

Sharding is the tool you reach for once a suite gets big enough that even full parallelism on one
machine isn't fast enough — split 900 tests across 3 CI machines, each runs 300, total wall-clock
time drops to a third. We'll wire actual CI sharding into a real GitHub Actions workflow in
[Module 08](../08-git-github-and-cicd/).

---

## 🔍 The Trace Viewer, Properly

Module 03 name-dropped this. Here's the actual workflow, because this tool is the difference
between a 5-minute CI failure investigation and a 45-minute one.

**1. Make sure tracing is captured on failure** (this is already the default in a well-configured
`playwright.config.ts`):

```typescript
use: {
  trace: 'retain-on-failure',   // only keeps the trace if the test actually failed
  screenshot: 'only-on-failure',
  video: 'retain-on-failure',
},
```

**2. When a CI test fails, download the trace artifact and open it:**

```bash
npx playwright show-trace trace.zip
```

**3. What you actually see:** a full timeline of every action, a screenshot (or live DOM snapshot)
at each step, the network requests that happened at that exact moment, and console logs — all
scrubbable like a video. You can literally watch the failing test happen, frame by frame, without
re-running it.

**Real scenario this solves:** a test fails intermittently in CI but never locally. Instead of
adding `console.log()` statements and hoping to catch it live in another CI run (which might take
another 10 minutes and might not even reproduce), you open the trace from the failed run and
*see* that a loading spinner was covering the button for 400ms — the exact flaky-animation problem
from Module 05, now diagnosed in 30 seconds instead of guessed at for an hour.

---

## 📝 Structured Logging

Beyond Playwright's own reporters, a framework benefits from its own structured application-level
log — useful for correlating "what did the test do" with "what did the app do," especially when
debugging a shared CI environment. From the real framework, using
[Winston](https://github.com/winstonjs/winston):

```typescript
export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(({ timestamp, level, message }) =>
      `${timestamp} [${level.toUpperCase()}]: ${message}`
    )
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize({ all: true }), /* ... */),
    }),
    new winston.transports.File({
      filename: 'logs/test-run.log',
      maxsize: 5_242_880, // 5MB — rotate before log files become unmanageable
      maxFiles: 5,
    }),
  ],
});
```

Two transports, two jobs: **console** (colorized, for watching a run live) and **file** (plain,
rotating, for post-mortem debugging after CI has already torn the run down). `LOG_LEVEL` is
read from the same typed env config you built in Module 06 — flip it to `debug` locally when
you're hunting a specific bug, keep it at `info` in CI to avoid drowning the log in noise.

---

## 📊 Reporting: HTML + Allure

Two reporters, different audiences:

```typescript
// playwright.config.ts
reporter: [
  ['line'],                                                    // live console output
  ['html', { open: 'never', outputFolder: 'playwright-report' }], // for developers, post-run
  ['allure-playwright', { resultsDir: 'allure-results' }],     // for stakeholders/management
],
```

```bash
npm run report          # opens Playwright's own HTML report — traces, screenshots, per-test detail
npm run report:allure   # generates + opens Allure — trend graphs, history, executive-friendly view
```

Playwright's HTML report is what *you* read when a test fails and you need to debug it — it's
tightly integrated with traces and screenshots. Allure is what you show a **product manager or a
client** — pass/fail trends over time, category breakdowns, a polished dashboard that doesn't
require knowing what a locator is to understand "here's how healthy the product is this sprint."

---

## 🔐 Secrets & Environment Management

You built the typed `envConfig` loader in Module 06. The tooling half of that story:

```bash
# .gitignore — non-negotiable
.env
.env.local
src/config/environments/*.env
playwright/.auth/
```

```bash
# .env.example — committed to git, has the SHAPE but never real values
BASE_URL=https://your-instance.com
MERCHANT_USERNAME=merchant@example.com
MERCHANT_PASSWORD=your_merchant_password
```

> [!WARNING]
> A real, working password committed to git history doesn't get "un-committed" by deleting it in
> the next commit — it's still sitting in every clone's `.git` history forever, findable with
> `git log -p` by anyone with repo access. If a secret leaks into a commit, the fix is rotating
> the credential, not just removing it from the latest commit. This is exactly the kind of mistake
> this roadmap's own author has been careful to avoid across every portfolio repo — treat it as
> non-negotiable from day one of your own framework, not a cleanup task for later.

In CI, secrets come from the CI platform's own secret store (GitHub Actions secrets, Jenkins
credentials) — never from a committed `.env` file. We'll wire that up concretely in
[Module 08](../08-git-github-and-cicd/).

---

## 📜 npm Scripts as a Team Interface

A good `package.json` `scripts` block is documentation that actually runs. A new team member
shouldn't need to memorize `npx playwright test --grep @smoke --project=chromium` — they should
be able to read `scripts` and immediately know every supported way to run this suite:

```json
{
  "scripts": {
    "test": "npx playwright test",
    "test:smoke": "npx playwright test --grep @smoke",
    "test:sanity": "npx playwright test --grep @sanity",
    "test:regression": "npx playwright test --grep @regression",
    "test:collection": "npx playwright test tests/regression/collection/",
    "test:headed": "npx playwright test --headed",
    "test:debug": "npx playwright test --debug",
    "report": "npx playwright show-report",
    "report:allure": "npx allure serve allure-results"
  }
}
```

`npm run test:smoke` is self-documenting in a way `npx playwright test --grep @smoke` typed from
memory (or copy-pasted from a Slack message from six months ago) is not. This is a small thing
that pays for itself the first week a second person touches your framework.

---

## ✍️ Hands-On Exercise

1. Write a `Dockerfile` for the framework you've been building since Module 03/06, based on the
   `mcr.microsoft.com/playwright` base image. Build it and run your suite inside the container.
2. Deliberately break a test (change a locator to something wrong), run it, and practice reading
   the resulting trace with `npx playwright show-trace`. Time yourself — you should be able to
   identify the root cause in under a minute once you know what you're looking at.
3. Add Winston (or any structured logger) to your framework with console + rotating file
   transports, controlled by a `LOG_LEVEL` env variable.
4. Add at least 5 meaningful `npm run` scripts to your `package.json` covering the ways you
   actually run your suite (smoke, headed, debug, a specific module).

---

## ⚠️ Common Mistakes

| Mistake | Why It Bites You | Fix |
|---------|-------------------|-----|
| No Docker setup, "works on my machine" tests | New team members lose a day to environment setup differences | Dockerize with the official Playwright base image |
| `trace: 'off'` in CI to "save space" | The one time you need a trace to debug a CI-only failure, it doesn't exist | `trace: 'retain-on-failure'` — only stores traces for failures anyway |
| Real credentials committed, even briefly | They live in git history forever, rotation is the only real fix | `.gitignore` secrets from commit #1, use `.env.example` for shape only |
| One giant log level (`debug`) always on in CI | Drowns real signal in noise, slows down log parsing | `info` in CI, `debug` locally when actively hunting a bug |
| Undocumented run commands, tribal knowledge only | New team members can't self-serve, keep asking in Slack | `npm run` scripts as living documentation |

---

## 🎓 Next Steps

Your framework now runs identically anywhere and you can actually debug it when it breaks. Next:
wire it into version control properly and make it run itself — every push, automatically, without
you.

**Next Module:** → [08-git-github-and-cicd](../08-git-github-and-cicd/)

---

<div align="center">

**[⬆ Back to Top](#-tools--environment-advanced)** | **[🏠 Main README](../README.md)**

</div>
