# 📋 Sample Manual Test Cases

This document contains **sample manual test cases** designed to demonstrate how to write **clear, structured, and executable** test cases based on functional requirements.

These examples follow **industry-standard practices** and can be used as a reference while designing test cases for real-world applications.

---

## 📌 Table of Contents
1. [Login Functionality](#1-login-functionality)
2. [Registration Functionality](#2-registration-functionality)
3. [Forgot Password Functionality](#3-forgot-password-functionality)
4. [Form Validation](#4-form-validation)
5. [General UI & Usability Checks](#5-general-ui--usability-checks)

---

## 1️⃣ Login Functionality

### Test Case Template

| Field | Description |
|-----|-------------|
| Test Case ID | TC_LOGIN_001 |
| Title | Verify login with valid credentials |
| Preconditions | User account exists |
| Steps | 1. Open login page<br>2. Enter valid username<br>3. Enter valid password<br>4. Click Login |
| Test Data | Valid username & password |
| Expected Result | User should be logged in successfully |
| Actual Result | — |
| Status | — |

---

### Additional Login Test Cases

| Test Case ID | Scenario | Expected Result |
|-------------|----------|----------------|
| TC_LOGIN_002 | Login with invalid password | Error message displayed |
| TC_LOGIN_003 | Login with invalid username | Error message displayed |
| TC_LOGIN_004 | Login with blank fields | Validation message shown |
| TC_LOGIN_005 | Login with special characters | Input validation handled |
| TC_LOGIN_006 | Login after multiple failed attempts | Account locked / warning shown |

---

## 2️⃣ Registration Functionality

| Test Case ID | Scenario | Expected Result |
|-------------|----------|----------------|
| TC_REG_001 | Register with valid details | Account created successfully |
| TC_REG_002 | Register with existing email | Error message displayed |
| TC_REG_003 | Register with invalid email format | Validation error shown |
| TC_REG_004 | Register with weak password | Password rules displayed |
| TC_REG_005 | Submit form with blank mandatory fields | Validation errors shown |

---

## 3️⃣ Forgot Password Functionality

| Test Case ID | Scenario | Expected Result |
|-------------|----------|----------------|
| TC_FP_001 | Submit registered email | Password reset link sent |
| TC_FP_002 | Submit unregistered email | Proper error message |
| TC_FP_003 | Submit invalid email format | Validation message |
| TC_FP_004 | Reset password with valid link | Password updated successfully |
| TC_FP_005 | Use expired reset link | Expiry message shown |

---

## 4️⃣ Form Validation

### Boundary Value Analysis Example

**Field:** Age  
**Valid Range:** `18–60`

| Test Case ID | Input | Expected Result |
|-------------|-------|----------------|
| TC_FORM_001 | 18 | Accepted |
| TC_FORM_002 | 17 | Rejected |
| TC_FORM_003 | 60 | Accepted |
| TC_FORM_004 | 61 | Rejected |

---

### Equivalence Partitioning Example

**Field:** Password Length (`8–16` characters)

| Partition | Input Example | Expected Result |
|----------|---------------|----------------|
| Valid | 10 characters | Accepted |
| Invalid | 6 characters | Rejected |
| Invalid | 18 characters | Rejected |

---

## 5️⃣ General UI & Usability Checks

| Test Case ID | Scenario | Expected Result |
|-------------|----------|----------------|
| TC_UI_001 | Verify page alignment | UI elements aligned properly |
| TC_UI_002 | Verify error message clarity | Message is readable and meaningful |
| TC_UI_003 | Verify tab navigation | Keyboard navigation works |
| TC_UI_004 | Verify page responsiveness | UI adapts to screen size |
| TC_UI_005 | Verify button states | Enabled/disabled states correct |

---

## ✅ Best Practices for Writing Test Cases

- Write **clear and concise** steps
- Avoid ambiguous language
- Ensure test cases are **independent**
- Include **negative scenarios**
- Keep test data realistic
- Use consistent naming conventions

---

## Conclusion

Well-written test cases improve:
- Test execution efficiency
- Defect detection quality
- Team communication
- Overall product quality

These samples serve as a **baseline reference** and should be customized based on:
- Application domain
- Business requirements
- Project complexity

---

### ▶️ Next Step
Proceed to:
`bug-report-template.md`  
to learn how to log high-quality defects effectively.
