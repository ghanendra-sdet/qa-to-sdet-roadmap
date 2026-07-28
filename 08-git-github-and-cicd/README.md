<div align="center" markdown="1">

# 📚 Git, GitHub & CI/CD

![Status](https://img.shields.io/badge/status-active-success.svg)
![Level](https://img.shields.io/badge/level-intermediate--advanced-orange.svg)
![Duration](https://img.shields.io/badge/duration-2--3%20weeks-blue.svg)

**A framework nobody runs automatically is a framework that quietly rots. This module makes your tests run themselves, on every push, whether you remember to or not.**

</div>

---

## 📑 Table of Contents

- [Why This Module Matters More Than It Sounds](#-why-this-module-matters-more-than-it-sounds)
- [Git for Test Code (Not Just "git add .")](#-git-for-test-code-not-just-git-add-)
- [Branching & PR Workflow for a Test Framework](#-branching--pr-workflow-for-a-test-framework)
- [What NOT to Commit](#-what-not-to-commit)
- [GitHub Actions: A Real Working Pipeline](#-github-actions-a-real-working-pipeline)
- [Breaking the Pipeline Down](#-breaking-the-pipeline-down)
- [Jenkins: The Older Sibling](#-jenkins-the-older-sibling)
- [Scheduled Runs & Notifications](#-scheduled-runs--notifications)
- [Hands-On Exercise](#-hands-on-exercise)
- [Common Mistakes](#-common-mistakes)
- [Next Steps](#-next-steps)

---

## 🤔 Why This Module Matters More Than It Sounds

Here's an uncomfortable truth: a beautifully architected framework (Module 06) that only runs
when a human remembers to type `npm test` is barely better than manual testing. The entire point
of automation is that it runs **without you** — on every code change, catching regressions before
a human ever notices them. That only happens with CI/CD wired up correctly. This module is where
your framework stops being "a thing I run sometimes" and becomes "a safety net that's always on."

---

## 🔧 Git for Test Code (Not Just "git add .")

You've almost certainly used Git before. Here's what's specific to test automation repos:

**Commit messages that explain *why*, not *what* (the diff already shows what):**

```bash
# ❌ Vague, tells you nothing a diff didn't already say
git commit -m "fixed test"

# ✅ Explains the actual reasoning
git commit -m "fix: retry beneficiary search after API returns stale cache on first call"
```

**Conventional commit prefixes** — a small habit that makes a repo's history genuinely
searchable months later:

```bash
feat: add data-driven tests for refund boundary values
fix: correct flaky wait in transaction detail panel
refactor: extract table logic into reusable component
docs: update framework README with Docker setup
test: add negative scenarios for beneficiary IFSC validation
chore: bump Playwright to 1.52
```

`git log --oneline --grep="fix:"` instantly shows every bug fix in the repo's history — genuinely
useful when someone asks "when did we fix that flaky login test" six months from now.

---

## 🌿 Branching & PR Workflow for a Test Framework

```bash
git checkout -b test/collection-refund-boundary-cases
# ... write tests ...
git add tests/regression/collection/refund.spec.ts
git commit -m "test: add boundary value tests for refund amounts"
git push -u origin test/collection-refund-boundary-cases
```

Then open a PR. **What a good test-automation PR description includes** (this is the part most
tutorials skip):

```markdown
## What
Adds boundary value tests for the refund flow: over-refund, zero, and negative amounts.

## Why
QA found these weren't covered — a refund > transaction amount was silently accepted
in staging before this PR (see BUG-COL-2201).

## How to verify
`npm run test:collection -- --grep "refund boundary"`

## Screenshots / Trace
[Attach the Playwright HTML report or a trace link from CI]
```

That "How to verify" line is the single most useful addition — it means a reviewer doesn't have
to guess how to run what you wrote, they can copy-paste one command.

---

## 🚫 What NOT to Commit

```bash
# .gitignore — essential for any Playwright framework
node_modules/
playwright-report/
test-results/
allure-results/
allure-report/
playwright/.auth/
.env
.env.local
src/config/environments/*.env
logs/
```

> [!WARNING]
> `playwright/.auth/*.json` files contain **live session tokens**, not just "config." Committing
> them is functionally the same as committing a password — anyone with repo access could reuse
> that session until it expires. This is exactly the class of mistake this roadmap's author
> treats as non-negotiable across every real portfolio repo, and it applies just as much to a
> practice framework as a production one.

Full cheat sheet for Git commands (branching, stashing, undoing commits, etc.) lives in
[`resources/cheatsheets/git-commands.md`](../resources/cheatsheets/git-commands.md) — keep it
open in a tab while you practice this module.

---

## ⚙️ GitHub Actions: A Real Working Pipeline

Here's a complete, realistic workflow for a Playwright framework — tag-based execution, sharding,
and artifact upload, all wired together:

```yaml
# .github/workflows/playwright.yml
name: Playwright Test Suite

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]
  schedule:
    - cron: '0 2 * * *'   # nightly regression run at 2 AM UTC

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      fail-fast: false
      matrix:
        shard: [1, 2, 3]

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright browsers
        run: npx playwright install --with-deps chromium firefox webkit

      - name: Run tests (shard ${{ matrix.shard }}/3)
        env:
          BASE_URL: ${{ secrets.STAGING_BASE_URL }}
          MERCHANT_USERNAME: ${{ secrets.MERCHANT_USERNAME }}
          MERCHANT_PASSWORD: ${{ secrets.MERCHANT_PASSWORD }}
        run: npx playwright test --shard=${{ matrix.shard }}/3

      - name: Upload HTML report
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report-shard-${{ matrix.shard }}
          path: playwright-report/
          retention-days: 14

      - name: Upload traces on failure
        if: failure()
        uses: actions/upload-artifact@v4
        with:
          name: traces-shard-${{ matrix.shard }}
          path: test-results/
          retention-days: 14
```

---

## 🔍 Breaking the Pipeline Down

**`on:` — three real triggers, not just "push":**
- `push`/`pull_request` — catch regressions before merge, the bread and butter of CI
- `schedule` (cron) — a nightly full regression run even when nobody's actively pushing code,
  because dependencies update, external APIs change, and "nothing changed in our code" doesn't
  mean "nothing changed."

**`secrets.STAGING_BASE_URL` — never a hardcoded URL or credential.** This is the CI-side half of
the "never commit secrets" rule from Module 07 — real values live in GitHub's repo Settings →
Secrets, injected as environment variables at run time, never visible in the workflow file itself
or in logs.

**`strategy.matrix.shard: [1, 2, 3]` — this is Module 07's sharding concept, made real.** GitHub
Actions spins up 3 separate runners in parallel, each running one shard. A suite that takes 15
minutes on one machine finishes in about 5 minutes across three — and `fail-fast: false` means
one shard failing doesn't cancel the other two, so you still get complete results even when
something's broken.

**`if: always()` vs `if: failure()`** — the HTML report uploads *every* run (you want to see
passing runs too), but the heavier trace/video artifacts only upload on failure, to avoid burning
CI storage on evidence nobody will ever look at for a passing test.

---

## 🏗️ Jenkins: The Older Sibling

Plenty of enterprises (fintech especially, for compliance/on-prem reasons) still run Jenkins
instead of, or alongside, GitHub Actions. Same concepts, different syntax:

```groovy
// Jenkinsfile
pipeline {
    agent any

    environment {
        BASE_URL = credentials('staging-base-url')
        MERCHANT_USERNAME = credentials('merchant-username')
        MERCHANT_PASSWORD = credentials('merchant-password')
    }

    stages {
        stage('Install') {
            steps {
                sh 'npm ci'
                sh 'npx playwright install --with-deps'
            }
        }
        stage('Test') {
            steps {
                sh 'npx playwright test --grep @regression'
            }
        }
        stage('Report') {
            steps {
                publishHTML(target: [
                    reportDir: 'playwright-report',
                    reportFiles: 'index.html',
                    reportName: 'Playwright Report'
                ])
            }
        }
    }

    post {
        failure {
            slackSend(channel: '#qa-alerts', message: "Regression suite failed: ${env.BUILD_URL}")
        }
    }
}
```

`credentials(...)` is Jenkins' equivalent of GitHub's `secrets.*` — pulled from Jenkins'
credential store, never hardcoded. `post { failure { ... } }` is the notification hook — the CI
tool telling a human the moment something breaks, instead of a human having to remember to check.

---

## 🔔 Scheduled Runs & Notifications

A regression suite that only runs on push misses an entire category of bugs: things that break
because of **external** changes — a third-party API updating, a certificate expiring, a dependency
shipping a breaking patch version. That's what the `schedule: cron` trigger above is for — a
nightly run that catches drift even when your own code hasn't changed at all.

Pairing that with a failure notification (Slack, email, Teams) closes the loop — nobody has to
remember to check a dashboard; the dashboard comes to them when something's actually wrong.

---

## ✍️ Hands-On Exercise

1. Add a real `.github/workflows/playwright.yml` to the framework you've built across Modules
   03-07. Start simple (no sharding) and get it green on a push.
2. Add a scheduled nightly run via `cron`.
3. Store at least one "secret" (even a fake one) in GitHub repo Settings → Secrets and reference
   it in the workflow via `${{ secrets.YOUR_SECRET }}` — confirm it never appears in plaintext in
   the workflow logs.
4. Add artifact upload for the HTML report, and deliberately break a test to confirm the trace
   artifact uploads correctly `on: failure`.
5. Write a one-paragraph PR description for your own change, following the "What / Why / How to
   verify" template above.

---

## ⚠️ Common Mistakes

| Mistake | Why It Bites You | Fix |
|---------|-------------------|-----|
| Hardcoded credentials in a workflow YAML file | Visible in plaintext in repo history to anyone with access | GitHub Secrets / Jenkins credentials store |
| No scheduled run, only push-triggered | Misses regressions from external changes (API updates, cert expiry) | Add a `cron` schedule for nightly full regression |
| `fail-fast: true` on a sharded matrix | One flaky shard cancels all others, you get zero results instead of partial | `fail-fast: false` |
| Uploading full trace/video artifacts on every run | Burns CI storage quota fast, mostly unused | `if: failure()` for heavy artifacts |
| Vague commit messages ("fix", "update", "wip") | Six months later, nobody (including you) can find why a change happened | Conventional commits with real context |

---

## 🎓 Next Steps

Your framework now runs itself, on every push, and tells someone when it breaks. Next: the module
most roadmaps don't have yet — using AI as an actual testing tool, not just a novelty, to generate
tests faster and triage defects smarter.

**Next Module:** → [09-ai-assisted-testing](../09-ai-assisted-testing/)

---

<div align="center" markdown="1">

**[⬆ Back to Top](#-git-github--cicd)** | **[🏠 Main README](../README.md)**

</div>
