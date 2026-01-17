# 🧪 Manual Testing – Core Concepts

This section covers the **fundamental concepts of manual testing** that every QA engineer must clearly understand before moving into automation.  
These concepts form the backbone of **software quality assurance** and are applicable across domains, tools, and technologies.

---

## 📌 Table of Contents
1. [Types of Testing](#1-types-of-testing)
2. [Black Box Testing Techniques](#2-black-box-testing-techniques)
3. [Levels of Testing](#3-levels-of-testing)
4. [Defect Life Cycle](#4-defect-life-cycle)
5. [Severity vs Priority](#5-severity-vs-priority)
6. [Conclusion](#conclusion)

---

## 1️⃣ Types of Testing

### 1.1 Functional Testing
Functional testing verifies that the application behaves according to **business requirements and functional specifications**.

**Focus Areas:**
- Input validation  
- Business logic  
- User workflows  
- System responses  

**Example:**  
Verifying that a user can log in with valid credentials and is blocked with invalid credentials.

---

### 1.2 Regression Testing
Regression testing ensures that **existing functionalities continue to work correctly** after changes such as:

- New feature additions  
- Bug fixes  
- Code refactoring  
- Configuration changes  

> **Key Objective:**  
> Detect unintended side effects introduced by recent changes.

> **Note:**  
> Regression testing is repetitive in nature and is a strong candidate for automation.

---

### 1.3 Smoke Testing
Smoke testing is a **shallow and wide** test performed to verify that **critical functionalities** of a build are working.

**Performed When:**
- A new build is deployed  
- Before detailed testing begins  

**Outcome:**
- ✅ Pass → Proceed with detailed testing  
- ❌ Fail → Reject the build  

---

### 1.4 Sanity Testing
Sanity testing is a **focused and narrow** test performed after minor changes to verify that a **specific functionality or bug fix** works as expected.

**Difference from Smoke Testing:**
- Smoke → Broad coverage  
- Sanity → Specific functionality  

---

## 2️⃣ Black Box Testing Techniques

Black box testing focuses on **testing the system without knowledge of internal code or implementation**.  
Test cases are derived from requirements and specifications.

---

### 2.1 Equivalence Partitioning
Input data is divided into **valid and invalid partitions**, and one value from each partition is tested.

**Benefits:**
- Reduces the number of test cases  
- Maintains effective coverage  

**Example:**  
If the valid age range is `18–60`:
- Valid partition: `18–60`  
- Invalid partitions: `<18`, `>60`  

---

### 2.2 Boundary Value Analysis (BVA)
Tests values at the **boundaries** of input ranges, where defects are most likely to occur.

**Example:**  
For range `1–100`, test:
- `0, 1, 2`  
- `99, 100, 101`  

---

### 2.3 Decision Table Testing
Used when system behavior depends on **multiple conditions** and business rules.

**Best Suited For:**
- Business rules  
- Complex logical conditions  

**Example:**  
Loan approval based on income and credit score combinations.

---

### 2.4 State Transition Testing
Used when system behavior changes based on its **previous state**.

**Example:**  
Login attempts:
- Active → Locked after multiple failed attempts  

---

## 3️⃣ Levels of Testing

### 3.1 Unit Testing
- Tests individual components or functions  
- Usually performed by developers  
- Focuses on internal logic  

---

### 3.2 Integration Testing
- Verifies interaction between multiple modules  
- Ensures data flows correctly between components  

---

### 3.3 System Testing
- End-to-end testing of the complete application  
- Performed in a production-like environment  
- Validates functional and non-functional requirements  

---

### 3.4 Acceptance Testing
- Validates system readiness for production  
- Performed by business users, clients, or QA teams  
- Includes UAT (User Acceptance Testing)  

---

## 4️⃣ Defect Life Cycle

The defect life cycle describes the **states a defect goes through** from identification to closure.

**Typical Defect States:**
1. **New** – Defect identified and logged  
2. **Assigned** – Assigned to developer  
3. **Open** – Developer starts working on the issue  
4. **Fixed** – Fix implemented  
5. **Retest** – QA retests the fix  
6. **Closed** – Defect resolved successfully  
7. **Reopened** – Issue persists after fix  
8. **Rejected / Invalid / Duplicate** – Defect not accepted  

---

## 5️⃣ Severity vs Priority

### Severity
Severity indicates the **impact of the defect on the system**.

| Severity | Description |
|--------|-------------|
| Critical | System crash, data loss |
| High | Major functionality broken |
| Medium | Partial functionality affected |
| Low | UI or cosmetic issue |

---

### Priority
Priority indicates **how urgently the defect must be fixed** from a business perspective.

| Priority | Description |
|---------|-------------|
| High | Must be fixed immediately |
| Medium | Fix in the next build |
| Low | Can be deferred |

---

### Key Difference
- **Severity** → Technical impact  
- **Priority** → Business urgency  

A defect can be:
- High severity & low priority  
- Low severity & high priority  

---

## Conclusion

Understanding manual testing concepts is **non-negotiable** for any QA professional.  
Automation tools and frameworks are effective **only when built on strong testing fundamentals**.

This knowledge will be repeatedly applied in:
- API testing  
- UI automation  
- Framework design  
- Real-time project execution  

---

### ▶️ Next Step
Proceed to:  
`1_manual_testing/exercises/`  
to apply these concepts through hands-on practice.
