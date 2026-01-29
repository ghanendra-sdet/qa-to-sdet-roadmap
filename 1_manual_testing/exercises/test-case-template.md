# 🧾 Test Case Template

This document provides a **standardized template** for writing **clear, consistent, and executable** test cases.

Well-written test cases:
- Improve test execution efficiency
- Reduce ambiguity
- Help new team members understand the system quickly
- Serve as reliable documentation

---

## 📌 Test Case Header

| Field | Description |
|------|------------|
| Test Case ID | Unique identifier (e.g., TC_LOGIN_001) |
| Title | Short, clear description of the test |
| Module | Application module under test |
| Requirement ID | Linked requirement / user story |
| Priority | High / Medium / Low |
| Test Type | Functional / Regression / Smoke / Sanity |
| Author | Test case creator |
| Created Date | Date of creation |
| Last Updated | Date of last update |

---

## 🧪 Preconditions

Describe any **required setup** before executing the test.

**Examples:**
- User account exists
- User is logged in
- Required data is available
- Application is accessible

---

## 🔁 Test Steps

| Step No | Action |
|--------|--------|
| 1 | Navigate to application URL |
| 2 | Open Login page |
| 3 | Enter valid username |
| 4 | Enter valid password |
| 5 | Click Login |

---

## 🧩 Test Data

Specify the **input data** required for execution.

| Data Type | Value |
|----------|-------|
| Username | valid_user@example.com |
| Password | P@ssw0rd123 |

---

## ✅ Expected Result

Describe the **expected system behavior** after executing the test steps.

**Example:**  
User should be logged in successfully and redirected to the dashboard.

---

## 📊 Actual Result

Capture the **observed system behavior** during execution.

**Example:**  
User logged in successfully and dashboard loaded.

---

## 🧾 Test Status

- Pass  
- Fail  
- Blocked  
- Not Executed  

---

## 📎 Attachments

Attach supporting evidence if applicable:
- Screenshots
- Screen recordings
- Logs

---

## 📝 Comments / Notes

Add any additional observations:
- Environment-specific behavior
- Known limitations
- Follow-up actions

---

## 🧠 Best Practices for Writing Test Cases

- Write clear, concise, and unambiguous steps
- One validation per test case
- Avoid dependent test cases
- Include negative and boundary scenarios
- Use consistent naming conventions
- Keep test cases up to date

---

## 📋 Sample Test Case (Filled Example)

**Test Case ID:** TC_LOGIN_001  
**Title:** Verify login with valid credentials  
**Module:** Authentication  
**Priority:** High  
**Test Type:** Functional  

**Preconditions:**  
User account exists and is active.

**Steps:**
1. Navigate to application URL  
2. Open Login page  
3. Enter valid username and password  
4. Click Login  

**Expected Result:**  
User should be logged in successfully and redirected to the dashboard.

**Actual Result:**  
User logged in successfully.

**Status:** Pass  

---

## Conclusion

A strong test case acts as both:
- An execution guide
- A documentation artifact

Consistent and well-maintained test cases improve **quality, coverage, and team efficiency**.

This template can be reused across projects with minimal customization.

---

### ▶️ Next Step
Proceed to:
`2_api_testing_manual_and_automation/README.md`  
to start learning API testing fundamentals.
