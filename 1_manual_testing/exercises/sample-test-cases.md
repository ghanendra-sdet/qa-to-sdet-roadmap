# 📋 Sample Manual Test Cases

![Version](https://img.shields.io/badge/version-2.0-blue.svg)
![Test Cases](https://img.shields.io/badge/test%20cases-50%2B-brightgreen.svg)
![Last Updated](https://img.shields.io/badge/last%20updated-Feb%202026-orange.svg)
![Contributions](https://img.shields.io/badge/contributions-welcome-success.svg)

> **A comprehensive collection of sample manual test cases demonstrating industry-standard practices for functional, regression, integration, API, mobile, security, and performance testing.**

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Test Case Structure](#-test-case-structure)
- [Functional Testing](#-functional-testing)
  - [Login Functionality](#login-functionality)
  - [Registration Functionality](#registration-functionality)
  - [Forgot Password Functionality](#forgot-password-functionality)
  - [Profile Management](#profile-management)
  - [Search Functionality](#search-functionality)
- [Form Validation Testing](#-form-validation-testing)
  - [Boundary Value Analysis](#boundary-value-analysis)
  - [Equivalence Partitioning](#equivalence-partitioning)
  - [Input Validation](#input-validation)
- [UI & Usability Testing](#-ui--usability-testing)
- [API Testing Examples](#-api-testing-examples)
- [Mobile Testing Examples](#-mobile-testing-examples)
- [Security Testing Examples](#-security-testing-examples)
- [Performance Testing Examples](#-performance-testing-examples)
- [Integration Testing Examples](#-integration-testing-examples)
- [Traceability Matrix](#-traceability-matrix)
- [Test Execution Workflow](#-test-execution-workflow)
- [Best Practices](#-best-practices)
- [Version History](#-version-history)

---

## 🎯 Overview

This document contains **50+ sample manual test cases** designed to demonstrate how to write **clear, structured, and executable** test cases based on functional requirements.

### Purpose:
- ✅ Provide reference templates for common testing scenarios
- ✅ Demonstrate industry-standard test case writing
- ✅ Cover multiple testing types and domains
- ✅ Show proper test data and validation examples

### Coverage:
- **Functional Testing** - Login, Registration, Forms
- **API Testing** - REST endpoints, authentication
- **Mobile Testing** - Native apps, responsive design
- **Security Testing** - Authentication, authorization, XSS
- **Performance Testing** - Load, stress, response times

> [!TIP]
> Use these samples as templates and customize them based on your application's specific requirements.

---

## 📐 Test Case Structure

Every well-written test case should include:

```mermaid
graph LR
    A[📋 Test Case ID] --> B[📝 Title]
    B --> C[🎯 Objective]
    C --> D[✅ Preconditions]
    D --> E[🔁 Test Steps]
    E --> F[🧩 Test Data]
    F --> G[✔️ Expected Result]
    G --> H[📊 Actual Result]
    H --> I[🏁 Status]
```

> [!IMPORTANT]
> Always include Test Case ID, clear steps, test data, and expected results to ensure reproducibility.

---

## 🔐 Functional Testing

### Login Functionality

#### **TC_LOGIN_001: Verify Login with Valid Credentials**

| Field | Value |
|-------|-------|
| **Test Case ID** | `TC_LOGIN_001` |
| **Title** | Verify login with valid credentials |
| **Module** | Authentication |
| **Priority** | Critical |
| **Test Type** | Functional, Smoke |
| **Requirement ID** | `REQ-AUTH-001` |

**Preconditions:**
- [x] Application is accessible
- [x] User account exists: `testuser@example.com`
- [x] User account is active
- [x] User is logged out

**Test Steps:**

| Step | Action | Input Data | Expected Behavior |
|------|--------|-----------|-------------------|
| 1 | Navigate to login page | `https://app.example.com/login` | Login page displays |
| 2 | Enter email address | `testuser@example.com` | Email field accepts input |
| 3 | Enter password | `Test@1234` | Password is masked with dots |
| 4 | Click "Sign In" button | - | Login process initiates |

**Test Data:**
```json
{
  "email": "testuser@example.com",
  "password": "Test@1234",
  "remember_me": false
}
```

**Expected Result:**
- ✅ User is authenticated successfully
- ✅ Redirected to dashboard at `/dashboard`
- ✅ Welcome message displays: "Welcome, Test User!"
- ✅ Session cookie is created with 30-minute expiry

**Postconditions:**
- User session is active
- Authentication token stored in cookies

---

#### **Additional Login Test Cases Summary**

| Test Case ID | Scenario | Test Type | Priority | Expected Result |
|-------------|----------|-----------|----------|----------------|
| `TC_LOGIN_002` | Login with invalid password | Negative | High | Error: "Invalid email or password" |
| `TC_LOGIN_003` | Login with invalid/non-existent email | Negative | High | Error: "Invalid email or password" |
| `TC_LOGIN_004` | Login with empty email field | Negative | Medium | Validation: "Email is required" |
| `TC_LOGIN_005` | Login with empty password field | Negative | Medium | Validation: "Password is required" |
| `TC_LOGIN_006` | Login with both fields empty | Negative | Medium | Validation errors for both fields |
| `TC_LOGIN_007` | Login with SQL injection attempt | Security | Critical | Input sanitized, login fails safely |
| `TC_LOGIN_008` | Login after 5 failed attempts | Security | High | Account locked for 30 minutes |
| `TC_LOGIN_009` | Login with special characters in password | Positive | Medium | Login successful if password correct |
| `TC_LOGIN_010` | Login with "Remember Me" option | Functional | Medium | Session persists after browser close |

> [!WARNING]
> Always test account lockout mechanisms to prevent brute force attacks.

---

### Registration Functionality

#### **TC_REG_001: Register New User with Valid Details**

| Field | Value |
|-------|-------|
| **Test Case ID** | `TC_REG_001` |
| **Title** | Register new user with valid details |
| **Module** | User Registration |
| **Priority** | Critical |
| **Requirement ID** | `REQ-REG-001` |

**Preconditions:**
- Email address not already registered
- Registration page is accessible

**Test Steps:**

| Step | Action | Input Data |
|------|--------|-----------|
| 1 | Navigate to registration page | - |
| 2 | Enter first name | `John` |
| 3 | Enter last name | `Doe` |
| 4 | Enter email | `john.doe@example.com` |
| 5 | Enter password | `SecurePass@123` |
| 6 | Confirm password | `SecurePass@123` |
| 7 | Accept terms and conditions | ✓ |
| 8 | Click "Create Account" | - |

**Test Data:**
```json
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john.doe@example.com",
  "password": "SecurePass@123",
  "confirm_password": "SecurePass@123",
  "agree_to_terms": true
}
```

**Expected Result:**
- Account created successfully
- Verification email sent to registered email
- Success message: "Registration successful! Please verify your email."
- User redirected to email verification page

---

#### **Additional Registration Test Cases**

| Test Case ID | Scenario | Expected Result |
|-------------|----------|----------------|
| `TC_REG_002` | Register with existing email | Error: "Email already registered" |
| `TC_REG_003` | Register with invalid email format | Validation: "Invalid email format" |
| `TC_REG_004` | Register with weak password (< 8 chars) | Validation: "Password must be at least 8 characters" |
| `TC_REG_005` | Register with mismatched passwords | Error: "Passwords do not match" |
| `TC_REG_006` | Submit form with blank mandatory fields | Validation errors for all required fields |
| `TC_REG_007` | Register without accepting T&C | Error: "You must accept terms and conditions" |
| `TC_REG_008` | Register with XSS script in name field | Input sanitized, special chars escaped |

---

### Forgot Password Functionality

| Test Case ID | Scenario | Test Type | Expected Result |
|-------------|----------|-----------|----------------|
| `TC_FP_001` | Submit registered email for reset | Positive | Password reset link sent via email |
| `TC_FP_002` | Submit unregistered email | Negative | Generic message (security best practice) |
| `TC_FP_003` | Submit invalid email format | Negative | Validation: "Invalid email format" |
| `TC_FP_004` | Reset password with valid link | Positive | Password updated successfully |
| `TC_FP_005` | Use expired reset link (> 24 hours) | Negative | Error: "This reset link has expired" |
| `TC_FP_006` | Use already-used reset link | Security | Error: "This link has already been used" |
| `TC_FP_007` | Submit empty email field | Negative | Validation: "Email is required" |

---

### Profile Management

| Test Case ID | Scenario | Expected Result |
|-------------|----------|----------------|
| `TC_PROF_001` | Update profile with valid data | Profile updated successfully |
| `TC_PROF_002` | Upload profile picture (JPG, < 2MB) | Image uploaded and displayed |
| `TC_PROF_003` | Upload large profile picture (> 5MB) | Error: "File size exceeds limit" |
| `TC_PROF_004` | Change password with correct old password | Password changed successfully |
| `TC_PROF_005` | Change password with incorrect old password | Error: "Current password is incorrect" |

---

### Search Functionality

| Test Case ID | Scenario | Expected Result |
|-------------|----------|----------------|
| `TC_SEARCH_001` | Search with valid keyword | Relevant results displayed |
| `TC_SEARCH_002` | Search with no matching results | "No results found" message |
| `TC_SEARCH_003` | Search with empty query | Validation or show all results |
| `TC_SEARCH_004` | Search with special characters | Results or no error |
| `TC_SEARCH_005` | Search with SQL injection payload | Input sanitized, safe search |

---

## 📝 Form Validation Testing

### Boundary Value Analysis

**Scenario:** Age Field Validation  
**Valid Range:** 18–60 years

```mermaid
graph LR
    A[Invalid: 17] -->|Boundary| B[Valid: 18]
    B --> C[Valid: 39 - Middle Value]
    C --> D[Valid: 60]
    D -->|Boundary| E[Invalid: 61]
    
    style A fill:#ffcccc
    style B fill:#ccffcc
    style C fill:#ccffcc
    style D fill:#ccffcc
    style E fill:#ffcccc
```

| Test Case ID | Input Value | Partition | Expected Result |
|-------------|-------------|-----------|----------------|
| `TC_BVA_001` | `17` | Below minimum | ❌ Rejected - "Age must be at least 18" |
| `TC_BVA_002` | `18` | Minimum boundary | ✅ Accepted |
| `TC_BVA_003` | `39` | Middle value | ✅ Accepted |
| `TC_BVA_004` | `60` | Maximum boundary | ✅ Accepted |
| `TC_BVA_005` | `61` | Above maximum | ❌ Rejected - "Age cannot exceed 60" |

---

### Equivalence Partitioning

**Scenario:** Password Length Validation  
**Valid Range:** 8–16 characters

| Test Case ID | Partition | Input Length | Example | Expected Result |
|-------------|-----------|--------------|---------|----------------|
| `TC_EP_001` | Invalid (Too Short) | 5 chars | `Pass1` | ❌ "Password must be 8-16 characters" |
| `TC_EP_002` | Valid | 10 chars | `MyPass@123` | ✅ Accepted |
| `TC_EP_003` | Invalid (Too Long) | 20 chars | `VeryLongPassword@123` | ❌ "Password must be 8-16 characters" |

---

### Input Validation

| Test Case ID | Field | Input | Expected Result |
|-------------|-------|-------|----------------|
| `TC_VAL_001` | Email | `user@domain.com` | ✅ Valid |
| `TC_VAL_002` | Email | `invalid-email` | ❌ "Invalid email format" |
| `TC_VAL_003` | Phone | `+1-234-567-8900` | ✅ Valid |
| `TC_VAL_004` | Phone | `abc123` | ❌ "Invalid phone number" |
| `TC_VAL_005` | Date | `2026-02-08` | ✅ Valid |
| `TC_VAL_006` | Date | `32/13/2026` | ❌ "Invalid date" |

---

## 🎨 UI & Usability Testing

| Test Case ID | Scenario | Expected Result |
|-------------|----------|----------------|
| `TC_UI_001` | Verify page layout alignment | All elements aligned per design specs |
| `TC_UI_002` | Verify error message clarity | Messages are clear, actionable, user-friendly |
| `TC_UI_003` | Verify keyboard navigation (Tab) | All interactive elements accessible via Tab |
| `TC_UI_004` | Verify responsive design (mobile) | Layout adapts properly to mobile viewport |
| `TC_UI_005` | Verify button states (enabled/disabled) | Button states reflect form validation status |
| `TC_UI_006` | Verify loading indicators | Spinner/loading shown during async operations |
| `TC_UI_007` | Verify accessibility (screen reader) | ARIA labels present, content readable |
| `TC_UI_008` | Verify color contrast (WCAG AA) | Text contrast ratio ≥ 4.5:1 |

> [!NOTE]
> UI testing should include accessibility checks to ensure inclusivity.

---

## 🔌 API Testing Examples

### **TC_API_001: GET Request - Fetch User Data**

**Endpoint:** `GET /api/v1/users/{userId}`

**Request:**
```http
GET /api/v1/users/12345 HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

**Expected Response:**
```json
{
  "status": 200,
  "data": {
    "id": "12345",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "created_at": "2026-01-15T10:30:00Z"
  }
}
```

**Validations:**
- ✅ Status code: `200 OK`
- ✅ Response time: < 500ms
- ✅ Response schema matches expected format
- ✅ All mandatory fields present

---

### **Additional API Test Cases**

| Test Case ID | API Method | Scenario | Expected Status | Expected Result |
|-------------|-----------|----------|----------------|----------------|
| `TC_API_002` | POST | Create new user | `201 Created` | User created, ID returned |
| `TC_API_003` | PUT | Update user details | `200 OK` | User data updated |
| `TC_API_004` | DELETE | Delete user | `204 No Content` | User deleted successfully |
| `TC_API_005` | GET | Fetch non-existent user | `404 Not Found` | Error: "User not found" |
| `TC_API_006` | POST | Create user without auth token | `401 Unauthorized` | Error: "Authentication required" |
| `TC_API_007` | GET | Request with invalid token | `401 Unauthorized` | Error: "Invalid token" |
| `TC_API_008` | POST | Send malformed JSON | `400 Bad Request` | Error: "Invalid request format" |

---

## 📱 Mobile Testing Examples

### **TC_MOB_001: Test Login on Mobile (iOS)**

| Field | Value |
|-------|-------|
| **Device** | iPhone 14 Pro (iOS 17.2) |
| **Orientation** | Portrait |
| **Network** | WiFi |

**Test Steps:**
1. Launch app on iOS device
2. Navigate to login screen
3. Enter credentials using on-screen keyboard
4. Verify keyboard dismisses after login
5. Verify smooth transition to home screen

**Expected Result:**
- Login flow smooth, no UI glitches
- Keyboard behavior appropriate
- Touch targets ≥ 44x44 points (Apple HIG)

---

### **Additional Mobile Test Cases**

| Test Case ID | Scenario | Platform | Expected Result |
|-------------|----------|----------|----------------|
| `TC_MOB_002` | Rotate screen during form entry | iOS/Android | Data persists, layout adjusts |
| `TC_MOB_003` | Test on low battery mode | iOS | App functions normally |
| `TC_MOB_004` | Test with slow 3G connection | Both | Loading indicators shown, graceful degradation |
| `TC_MOB_005` | Test offline mode | Both | Cached data shown, sync when online |
| `TC_MOB_006` | Test push notifications | Both | Notifications received and actionable |

---

## 🔒 Security Testing Examples

| Test Case ID | Vulnerability Type | Test Scenario | Expected Result |
|-------------|-------------------|---------------|----------------|
| `TC_SEC_001` | SQL Injection | Enter `' OR '1'='1` in login | Input sanitized, login fails safely |
| `TC_SEC_002` | XSS | Enter `<script>alert('XSS')</script>` | Script not executed, chars escaped |
| `TC_SEC_003` | CSRF | Submit form without CSRF token | Request rejected, error returned |
| `TC_SEC_004` | Session Hijacking | Use expired session token | `401 Unauthorized` |
| `TC_SEC_005` | Brute Force | 10 rapid login attempts | Account locked, CAPTCHA shown |
| `TC_SEC_006` | Password Exposure | View password in browser dev tools | Password encrypted in network requests |
| `TC_SEC_007` | Authorization | Access admin page as regular user | `403 Forbidden` |

> [!CAUTION]
> Always test security scenarios in a controlled environment, never in production.

---

## ⚡ Performance Testing Examples

| Test Case ID | Test Type | Scenario | Load | Expected Result |
|-------------|-----------|----------|------|----------------|
| `TC_PERF_001` | Load Test | Homepage load | 100 concurrent users | Response time < 2s |
| `TC_PERF_002` | Stress Test | Login endpoint | 1000 concurrent requests | No server crash, graceful degradation |
| `TC_PERF_003` | Spike Test | Sudden traffic surge | 0 → 500 users in 10s | System recovers, no data loss |
| `TC_PERF_004` | Endurance Test | Continuous load | 50 users for 4 hours | No memory leaks, stable performance |
| `TC_PERF_005` | API Response Time | User API GET request | Single request | < 500ms response time |

**Tools:** JMeter, LoadRunner, k6, Gatling

---

## 🔗 Integration Testing Examples

| Test Case ID | Integration Point | Scenario | Expected Result |
|-------------|------------------|----------|----------------|
| `TC_INT_001` | Payment Gateway | Process payment via Stripe | Payment successful, order confirmed |
| `TC_INT_002` | Email Service | Send welcome email via SendGrid | Email delivered within 2 minutes |
| `TC_INT_003` | Database | Save user data to PostgreSQL | Data persisted correctly |
| `TC_INT_004` | Third-party API | Fetch weather data from OpenWeather | Data retrieved and displayed |
| `TC_INT_005` | Cache Layer | Read from Redis cache | Cached data returned, reduced DB load |

---

## 📊 Traceability Matrix

Links requirements to test cases for comprehensive coverage tracking.

| Requirement ID | Requirement | Test Case IDs | Coverage |
|---------------|-------------|---------------|----------|
| `REQ-AUTH-001` | User login functionality | TC_LOGIN_001 to TC_LOGIN_010 | ✅ 100% |
| `REQ-REG-001` | User registration | TC_REG_001 to TC_REG_008 | ✅ 100% |
| `REQ-PWD-001` | Password reset | TC_FP_001 to TC_FP_007 | ✅ 100% |
| `REQ-PROF-001` | Profile management | TC_PROF_001 to TC_PROF_005 | ✅ 100% |
| `REQ-SEARCH-001` | Search functionality | TC_SEARCH_001 to TC_SEARCH_005 | ✅ 100% |
| `REQ-SEC-001` | Security validations | TC_SEC_001 to TC_SEC_007 | ✅ 100% |

> [!TIP]
> Maintain a traceability matrix to ensure all requirements are tested and to identify gaps in test coverage.

---

## 🔄 Test Execution Workflow

```mermaid
flowchart TD
    A[📋 Select Test Case] --> B{Preconditions Met?}
    B -->|No| C[🔧 Setup Environment]
    C --> B
    B -->|Yes| D[🧪 Execute Test Steps]
    D --> E[📝 Record Actual Results]
    E --> F{Pass or Fail?}
    F -->|Pass| G[✅ Mark as Passed]
    F -->|Fail| H[🐛 Log Defect]
    H --> I[🔗 Link Defect to Test Case]
    I --> J[📊 Update Test Metrics]
    G --> J
    J --> K{More Tests?}
    K -->|Yes| A
    K -->|No| L[📈 Generate Test Report]
```

---

## 🧠 Best Practices

### ✅ DO:

- ✔️ Write **clear, atomic test steps** that anyone can follow
- ✔️ Include **specific test data** with examples
- ✔️ Test **both positive and negative scenarios**
- ✔️ Apply **boundary value analysis** for numeric inputs
- ✔️ Use **consistent naming conventions** (e.g., `TC_MODULE_###`)
- ✔️ Keep test cases **independent** (no dependencies)
- ✔️ Update test cases when **requirements change**
- ✔️ Link test cases to **requirements** for traceability
- ✔️ Include **expected results** clearly
- ✔️ Perform **cleanup** after test execution

### ❌ DON'T:

- ✖️ Don't write vague steps like "Test login"
- ✖️ Don't skip negative test scenarios
- ✖️ Don't create test case chains (Test B depends on Test A)
- ✖️ Don't forget to test edge cases
- ✖️ Don't ignore security testing
- ✖️ Don't test only the happy path
- ✖️ Don't use production data for testing

### 📋 Quality Checklist:

Before finalizing test cases:

- [ ] **Clear steps?** Can a new team member execute this?
- [ ] **Complete data?** All required test data provided?
- [ ] **Expected results?** Clearly defined success criteria?
- [ ] **Linked to requirements?** Traceability established?
- [ ] **Negative scenarios?** Error cases covered?
- [ ] **Independent?** No dependencies on other tests?
- [ ] **Reviewable?** Peer-reviewed for accuracy?

---

## 📊 Version History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 2.0 | 2026-02-08 | Ghanendra Kumar | Major enhancement: Added API, mobile, security, performance, integration testing examples. Added traceability matrix, Mermaid diagrams, GitHub alerts, and comprehensive test data |
| 1.5 | 2026-01-20 | QA Team | Added form validation examples and UI testing cases |
| 1.0 | 2025-11-15 | QA Team | Initial sample test cases for functional testing |

---

## 🤝 Contributing

We welcome contributions to expand this test case repository!

### How to Contribute:
1. 🍴 Fork this repository
2. 🌿 Create a feature branch
3. ✏️ Add new test case examples
4. ✅ Ensure examples follow the template structure
5. 📝 Update version history
6. 🚀 Submit a pull request

**Ideas for contributions:**
- E-commerce checkout flow test cases
- File upload/download test cases
- Multi-language/localization testing
- Real-time chat/messaging test cases
- Video streaming test cases

---

## 📄 License

This document is licensed under the **MIT License**.

```
MIT License - Copyright (c) 2026 QA Team
Permission is granted to use, modify, and distribute this content.
```

---

## 🎓 Additional Resources

- 📖 [ISTQB Syllabus](https://www.istqb.org/)
- 🎯 [Test Case Design Techniques](https://www.guru99.com/test-case.html)
- 🔧 [Postman API Testing](https://www.postman.com/api-testing/)
- 📱 [Mobile Testing Best Practices](https://www.browserstack.com/guide/mobile-testing-best-practices)
- 🔒 [OWASP Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)

---

### ▶️ Next Steps

**Continue Learning:**
1. 📝 Review [test-case-template.md](./test-case-template.md) for detailed template structure
2. 🐛 Proceed to [bug-report-template.md](./bug-report-template.md) to learn defect logging
3. 🔍 Explore [exploratory-testing-notes.md](./exploratory-testing-notes.md) for ad-hoc testing
4. 🤖 Learn test automation frameworks (Selenium, Cypress, Playwright)
5. 📊 Practice with test management tools (Jira, TestRail, Zephyr)

---

<div align="center">

**⭐ If you found these test cases helpful, please star this repository! ⭐**

Made with ❤️ by the QA Team | Last Updated: February 2026

</div>
