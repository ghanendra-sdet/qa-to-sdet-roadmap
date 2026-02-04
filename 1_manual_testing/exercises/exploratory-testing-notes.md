# 🔍 Exploratory Testing – Notes & Guidelines

Exploratory testing is a **simultaneous process of learning, test design, and test execution**.  
Unlike scripted testing, it relies on **critical thinking, domain knowledge, and tester intuition**.

This document captures **best practices, techniques, and structured guidance** for performing effective exploratory testing.

---

## 📌 Table of Contents
1. [What is Exploratory Testing](#1-what-is-exploratory-testing)
2. [Why Exploratory Testing Matters](#2-why-exploratory-testing-matters)
3. [When to Perform Exploratory Testing](#3-when-to-perform-exploratory-testing)
4. [How to Perform Exploratory Testing](#4-how-to-perform-exploratory-testing)
5. [Time-Boxed Sessions](#5-time-boxed-sessions)
6. [Common Exploratory Techniques](#6-common-exploratory-techniques)
7. [Heuristics & Mnemonics](#7-heuristics--mnemonics)
8. [Documentation & Reporting](#8-documentation--reporting)
9. [Common Mistakes to Avoid](#9-common-mistakes-to-avoid)
10. [Conclusion](#conclusion)

---

## 1️⃣ What is Exploratory Testing

Exploratory testing is a testing approach where:
- Test design
- Test execution
- Test analysis  

happen **at the same time**.

The tester actively explores the application, learns its behavior, and adapts testing based on observations.

> **Key Point:**  
> Exploratory testing is not random testing. It is **intentional, skilled, and structured**.

---

## 2️⃣ Why Exploratory Testing Matters

Exploratory testing helps in:
- Identifying **edge cases** not covered by test cases
- Discovering **usability issues**
- Detecting **integration and workflow gaps**
- Uncovering **real user behavior issues**

It complements:
- Manual scripted testing
- Automation testing

---

## 3️⃣ When to Perform Exploratory Testing

Exploratory testing is especially effective:
- When requirements are unclear or evolving
- During early stages of development
- After a new feature release
- Before major releases
- When time is limited

---

## 4️⃣ How to Perform Exploratory Testing

### Step 1: Understand the Feature
- Read available requirements
- Identify feature purpose
- Understand expected user behavior

---

### Step 2: Define a Test Mission
A **test mission** gives direction to the session.

**Example Missions:**
- Explore login error handling
- Validate form validations and edge cases
- Test payment failure scenarios

---

### Step 3: Explore and Observe
- Try normal user flows
- Perform negative actions
- Vary inputs and sequences
- Observe system responses closely

---

### Step 4: Take Notes
Document:
- Observations
- Issues found
- Questions raised
- Test ideas for future automation

---

## 5️⃣ Time-Boxed Sessions

Exploratory testing should be **time-boxed** to maintain focus.

**Recommended Duration:**
- 30 to 90 minutes per session

**Session Output:**
- Issues found
- Areas covered
- Areas not covered
- Follow-up actions

---

## 6️⃣ Common Exploratory Techniques

### 🔹 Error Guessing
Use experience to guess where defects may exist.

**Examples:**
- Invalid inputs
- Unexpected user actions
- Boundary values

---

### 🔹 Boundary & Negative Testing
- Extreme values
- Empty inputs
- Special characters
- Large data volumes

---

### 🔹 Workflow Testing
- End-to-end user journeys
- Interrupted workflows
- Back navigation behavior

---

### 🔹 UI & Usability Testing
- Clarity of error messages
- Button states
- Alignment and spacing
- Accessibility basics

---

## 7️⃣ Heuristics & Mnemonics

### SFDPOT (Common Heuristic)
- **S**tructure  
- **F**unction  
- **D**ata  
- **P**latform  
- **O**perations  
- **T**ime  

Use this to ensure broader coverage during exploration.

---

## 8️⃣ Documentation & Reporting

After each session, capture:
- Session objective
- Duration
- Areas explored
- Defects logged
- Observations
- Improvement suggestions

> **Tip:**  
> Even exploratory testing needs documentation to demonstrate value.

---

## 9️⃣ Common Mistakes to Avoid

- Treating exploratory testing as random clicking
- Not documenting findings
- Skipping test missions
- Overlapping sessions without learning
- Ignoring usability feedback

---

## Conclusion

Exploratory testing is a **powerful skill** that improves with experience.  
It uncovers defects that scripted and automated tests often miss.

A strong QA engineer:
- Writes test cases
- Automates where possible
- **Explores intelligently**

---

### ▶️ Next Step
Proceed to:
`1_manual_testing/resources/README.md`  
to explore additional manual testing resources and learning materials.
