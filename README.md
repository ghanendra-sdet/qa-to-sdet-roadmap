<div align="center">

# 🎓 QA to SDET — The Complete Roadmap

### From "I click buttons for a living" to "I ship test frameworks for a living"

![Status](https://img.shields.io/badge/status-active-success.svg)
![Free Education](https://img.shields.io/badge/education-100%25%20free-brightgreen.svg)
![Modules](https://img.shields.io/badge/modules-11-blue.svg)
![Vibe](https://img.shields.io/badge/vibe-no%20boring%20lectures-ff69b4.svg)

**A structured, hands-on path from Manual Testing → API Testing → Playwright Automation → Framework Design → AI-Assisted Testing → real portfolio projects.**

</div>

---

## Why this repo exists (the honest version)

Every other "QA roadmap" you'll find is either a wall of theory nobody reads, or a random YouTube
playlist with no order. This one is different for three reasons:

1. **It's written by someone who actually does this job.** Every example is pulled from real
   fintech/healthcare/travel/HR/edtech automation work — not a "TodoMVC" app nobody's ever tested
   for a real paycheck.
2. **It doesn't pretend testing is glamorous.** Half of QA is finding out a "critical bug" is
   actually you forgetting to clear cache. We'll laugh about it, then fix it properly.
3. **Every module ends with something you built, not something you read.** If a module doesn't
   leave you with a file you can push to GitHub, it's not done.

> [!IMPORTANT]
> This is a **one-module-at-a-time** repo. Don't skip to Playwright because manual testing sounds
> boring — manual testing is the reason you'll know *what* to automate instead of automating
> garbage really fast. (Yes, that's a real failure mode. Ask literally any SDET.)

---

## 🗺️ The Path

```
00 → Introduction & Setup            "Get your machine ready, meet the roadmap"
01 → Manual Testing Fundamentals     "Learn to think like a tester before you think like a coder"
02 → API Testing                     "Test the engine before you test the paint job"
03 → Playwright Basics               "Your first robot hands"
04 → Playwright API Automation       "Robot hands that also hit APIs"
05 → Playwright UI Automation        "Robot hands doing the whole user journey"
06 → Framework Design                "Stop writing spaghetti, start writing a system"
07 → Tools & Environment (Advanced)  "Docker, multi-browser, the stuff that isn't 'npm install'"
08 → Git, GitHub & CI/CD             "Make your tests run without you"
09 → AI-Assisted Testing             "Use AI like a senior SDET, not like a search bar"
10 → Real-World Projects             "Prove it. Build something a recruiter can click."
```

Each module builds on the last. Follow the numbers — this isn't a buffet, it's a staircase.

### ⏱️ Realistic timeline (not the fake "learn to code in 7 days" kind)

| Pace | Weekly hours | Total |
|---|---|---|
| Part-time (job + this) | 5–10 hrs | 4–6 months |
| Focused | 15–20 hrs | 2–3 months |
| Full send | 30–40 hrs | 6–8 weeks |

If you're doing this in a weekend, you're not learning it — you're skimming it. Slow is smooth,
smooth is fast.

---

## 👥 Who this is actually for

| You are... | You'll get... |
|---|---|
| A manual tester who keeps hearing "do you know automation?" in interviews | A real answer: yes, and here's the GitHub link to prove it |
| A complete beginner | A path that doesn't assume you already know what a locator is |
| A developer curious about SDET roles | The testing-mindset half of the job that bootcamps skip |
| Someone who already knows Selenium and is tired of `Thread.sleep(5000)` | Playwright's actual auto-waiting model, explained properly |

---

## 📚 Modules

### 00 · Introduction & Setup
**Time:** 1–2 days · **Level:** Beginner
What this repo is, how to use it, and getting your machine ready (Node, Git, VS Code, Postman).
📂 [`00-introduction/`](./00-introduction/)

### 01 · Manual Testing Fundamentals
**Time:** 2–3 weeks · **Level:** Beginner
Test case design, black-box techniques (EP/BVA/decision tables), the defect lifecycle, exploratory
testing, and why "it works on my machine" has ended careers.
📂 [`01-manual-testing/`](./01-manual-testing/)

### 02 · API Testing
**Time:** 3–4 weeks · **Level:** Beginner → Intermediate
Postman by hand, then REST Assured, then Playwright's API testing — because the UI is just a
pretty wrapper around API calls, and most real bugs live underneath it.
📂 [`02-api-testing/`](./02-api-testing/)

### 03 · Playwright Basics
**Time:** 2 weeks · **Level:** Intermediate
Locators, auto-waiting, your first real test, and why Playwright doesn't need `sleep()` calls
sprinkled everywhere like Selenium scripts from 2015.
📂 [`03-playwright-basics/`](./03-playwright-basics/)

### 04 · Playwright API Automation
**Time:** 2 weeks · **Level:** Intermediate
Turning your Postman knowledge into code — `request` context, hybrid UI+API tests, and using API
calls to set up test data instead of clicking through 6 screens every single test.
📂 [`04-playwright-api-automation/`](./04-playwright-api-automation/)

### 05 · Playwright UI Automation
**Time:** 3 weeks · **Level:** Intermediate → Advanced
Page Object Model done properly, cross-browser runs, visual checks, and handling the UI patterns
that actually show up in real products (modals, tables, file uploads, flaky animations).
📂 [`05-playwright-ui-automation/`](./05-playwright-ui-automation/)

### 06 · Framework Design
**Time:** 3–4 weeks · **Level:** Advanced
The difference between "a folder of test files" and "a framework." Config management, data-driven
testing, reporting, and the Hybrid pattern (POM + data-driven + API mocking) used in a real
production fintech test suite.
📂 [`06-framework-design/`](./06-framework-design/)

### 07 · Tools & Environment (Advanced)
**Time:** 1 week · **Level:** Intermediate
Beyond `npm install`: Docker for consistent test environments, multi-browser/OS matrices, debugging
tools, and environment/secrets management that doesn't involve hardcoding a password in a JSON file.
📂 [`07-tools-and-environment/`](./07-tools-and-environment/)

### 08 · Git, GitHub & CI/CD
**Time:** 2–3 weeks · **Level:** Intermediate → Advanced
Version control for test code specifically, GitHub Actions, and making your tests run on every push
instead of "whenever I remember to run them."
📂 [`08-git-github-and-cicd/`](./08-git-github-and-cicd/)

### 09 · AI-Assisted Testing *(new — and this is the one most roadmaps don't have)*
**Time:** 1–2 weeks · **Level:** Intermediate → Advanced
Using AI as a testing *tool*, not a toy: generating test cases from a PRD, AI-assisted defect
triage, prompting for Playwright locators/tests, and testing AI-driven product features (chatbots,
fraud detection, anomaly detection) — pulled from real dispute-resolution and fraud-detection
testing work, not a hypothetical.
📂 [`09-ai-assisted-testing/`](./09-ai-assisted-testing/)

### 10 · Real-World Projects (Capstone)
**Time:** 4–6 weeks · **Level:** Advanced
Full portfolio-ready projects across fintech, healthcare, and travel domains — the kind of project
that survives an interviewer actually clicking around your GitHub instead of taking your word for it.
📂 [`10-real-world-projects/`](./10-real-world-projects/)

---

## 🛠️ Tools & Technologies

| Category | Tools |
|---|---|
| Language | JavaScript / TypeScript |
| UI Automation | Playwright |
| API Testing | Postman, REST Assured, Playwright API |
| Version Control | Git, GitHub |
| CI/CD | GitHub Actions, Jenkins |
| Containers | Docker |
| Reporting | Playwright HTML Reporter, Allure |
| AI Tools | ChatGPT/Claude for test generation, AI-assisted defect triage |

Everything here is free or has a genuinely usable free tier. If a module ever tells you to pay for
something, that's a bug — open an issue.

---

## 🎓 Prerequisites

- **Modules 00–01:** None. Zero. If you can use a web browser, you're qualified.
- **Module 02 (API):** Know what JSON looks like. That's it.
- **Modules 03+ (Automation):** Basic JS (variables, functions, loops) — we teach the testing-
  specific parts, but "what is a `for` loop" is out of scope here. [freeCodeCamp's JS course](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)
  is a solid 2-week detour if you need it.

---

## 💡 Best Practices (the ones people actually break)

**Do:**
- Practice 30–60 min daily > 6 hours once a week — your brain needs the repetition, not the marathon
- Type the code yourself. Copy-pasting a Playwright test teaches you nothing about *why* it works
- Push to GitHub after every module, even the messy first draft
- Read the error message before Googling it. Half the time it already told you the answer

**Don't:**
- Skip manual testing "because automation is the real skill" — you'll automate the wrong things
  confidently and fast, which is worse than automating slowly
- Treat AI-generated test code as done. Read it, understand it, then commit it
- Wait until a module is "perfect" before moving on — perfect is the enemy of pushed

---

## 🤝 Contributing

Found a broken link, a stale example, or a section that put you to sleep? PRs welcome:

1. Fork → branch → fix → commit with a clear message → PR
2. Contribution ideas: real-world examples, better jokes, fixing anything that reads like a
   corporate training manual

---

## 💬 Community

- [Ministry of Testing](https://www.ministryoftesting.com/)
- [Test Automation University](https://testautomationu.applitools.com/)
- [Playwright Discord](https://discord.com/invite/playwright)
- [r/softwaretesting](https://www.reddit.com/r/softwaretesting/)

---

## 📄 License

MIT — see [LICENSE](LICENSE). Use it, fork it, teach your own bootcamp with it, just don't sell it
as your own original 3 AM fever dream.

---

<div align="center">

### 📚 [Start with Module 00 →](./00-introduction/)

Your first test case is more valuable than your hundredth tutorial video watched at 2x speed.

**Happy testing — may your flaky tests be few and your green pipelines be many.**

</div>
