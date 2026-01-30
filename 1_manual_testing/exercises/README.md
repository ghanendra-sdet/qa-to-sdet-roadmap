# 📝 Manual Testing – Exercises & Practice

This section focuses on **hands-on practice** to apply the manual testing concepts covered in the **Concepts** section.  
These exercises are designed to help you think like a **QA engineer**, not just follow steps.

The objective is to convert **theoretical knowledge into practical testing skills**.

---

## 🎯 Objectives

By completing the exercises in this section, you will be able to:
- Understand requirements clearly
- Derive test scenarios and test cases
- Apply black box testing techniques
- Identify edge cases and negative scenarios
- Log high-quality, reproducible defects

---

## 📌 Table of Contents
1. [Test Scenario Writing](#1-test-scenario-writing)
2. [Test Case Design](#2-test-case-design)
3. [Black Box Technique Exercises](#3-black-box-technique-exercises)
4. [Exploratory Testing](#4-exploratory-testing)
5. [Defect Reporting Practice](#5-defect-reporting-practice)
6. [Execution & Observation](#6-execution--observation)
7. [Conclusion](#conclusion)

---

## 1️⃣ Test Scenario Writing

### Objective
Practice identifying **high-level test scenarios** based on requirements.

### Exercise
Given a **Login Feature**, write test scenarios covering:
- Positive scenarios
- Negative scenarios
- Boundary conditions
- Security considerations
- Usability checks

**Example Scenarios:**
- Verify login with valid credentials
- Verify error message for invalid password
- Verify account lock after multiple failed attempts
- Verify login behavior when fields are left blank

---

## 2️⃣ Test Case Design

### Objective
Convert test scenarios into **detailed, executable test cases**.

### Exercise
For each test scenario:
- Write test steps
- Define test data
- Specify expected results

**Test Case Template:**
| Field | Description |
|-----|-------------|
| Test Case ID | Unique identifier |
| Title | Short description |
| Preconditions | Required setup |
| Steps | Execution steps |
| Test Data | Input values |
| Expected Result | Expected system behavior |
| Actual Result | Observed result |
| Status | Pass / Fail |

---

## 3️⃣ Black Box Technique Exercises

### 3.1 Equivalence Partitioning
**Exercise:**  
For an age field that accepts values `18–60`:
- Identify valid and invalid partitions
- Write at least one test case per partition

---

### 3.2 Boundary Value Analysis
**Exercise:**  
For a password length rule of `8–16` characters:
- Identify boundary values
- Write test cases for edge conditions

---

### 3.3 Decision Table Testing
**Exercise:**  
Create a decision table for a **loan approval system** based on:
- Income level
- Credit score

Derive test cases from the table.

---

### 3.4 State Transition Testing
**Exercise:**  
Design test cases for account state changes:
- Active
- Locked
- Disabled

---

## 4️⃣ Exploratory Testing

### Objective
Improve **critical thinking and observation skills** without predefined test cases.

### Exercise
Perform exploratory testing on:
- Login page
- Registration form
- Payment screen (if available)

**Focus Areas:**
- Error handling
- UI behavior
- Unexpected system responses
- Performance observations

> **Tip:**  
> Time-box exploratory sessions (e.g., 30–45 minutes) and document findings.

---

## 5️⃣ Defect Reporting Practice

### Objective
Practice logging **clear, high-quality defects**.

### Exercise
For any issue found:
- Write a complete defect report including:
  - Summary
  - Steps to reproduce
  - Expected result
  - Actual result
  - Severity
  - Priority
  - Environment details

> **Note:**  
> Poorly written defects slow down development and reduce trust in QA.

---

## 6️⃣ Execution & Observation

### Objective
Build discipline in **test execution and result analysis**.

### Exercise
- Execute written test cases
- Mark pass/fail status
- Capture screenshots or logs where applicable
- Observe patterns in failures

**Key Skill Developed:**  
Identifying root causes vs surface symptoms.

---

## Conclusion

Manual testing skills are built through **practice and repetition**, not theory alone.  
These exercises are designed to sharpen:
- Analytical thinking
- Attention to detail
- Communication quality

Strong manual testing skills directly improve:
- Automation effectiveness
- Test coverage
- Overall product quality

---

### ▶️ Next Step
Proceed to:  

`2_api_testing_manual_and_automation/` 
'bug-report-template.md'
'exploratory-testing-notes.md'
'sample-test-cases.md'
'test-case-template.md' 
to begin learning API testing concepts and hands-on practices.
