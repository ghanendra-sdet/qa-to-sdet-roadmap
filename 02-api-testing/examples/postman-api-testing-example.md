# 📮 Postman API Testing Example

![Postman](https://img.shields.io/badge/Postman-v11.0-orange.svg)
![Last Updated](https://img.shields.io/badge/last%20updated-Feb%202026-orange.svg)

> **Learn API testing with Postman through practical examples**

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Setup](#-setup)
- [Example API](#-example-api)
- [GET Request](#-get-request-example)
- [POST Request](#-post-request-example)
- [PUT Request](#-put-request-example)
- [DELETE Request](#-delete-request-example)
- [Test Scripts](#-test-scripts)
- [Environment Variables](#-environment-variables)
- [Running Collections](#-running-collections)
- [Best Practices](#-best-practices)

---

## 🎯 Overview

**Postman** allows you to test REST APIs with:
- ✅ No code required for basic testing
- ✅ JavaScript for advanced test scripts
- ✅ Collections to organize tests
- ✅ Variables and environments
- ✅ CI/CD integration via Newman CLI

---

## 🔧 Setup

**Installation:**
```bash
# macOS
brew install --cask postman

# Windows
choco install postman
```

**Create Workspace:**
1. Open Postman
2. Create workspace: `API Testing Practice`
3. Create environment: `Test Environment`
4. Add variable: `baseUrl` = `https://jsonplaceholder.typicode.com`

---

## 🌐 Example API

**JSONPlaceholder** - Free fake REST API

**Endpoints:**
- `/posts` - Blog posts
- `/users` - User data
- `/comments` - Post comments

---

## 🔵 GET Request Example

**Request:**
```
GET {{baseUrl}}/posts
```

**Test Scripts:**
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response time < 500ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(500);
});

pm.test("Response is array of 100 posts", function () {
    const data = pm.response.json();
    pm.expect(data).to.be.an('array');
    pm.expect(data.length).to.eql(100);
});

pm.test("Each post has required fields", function () {
    const post = pm.response.json()[0];
    pm.expect(post).to.have.all.keys('userId', 'id', 'title', 'body');
});
```

---

## 🟢 POST Request Example

**Request:**
```
POST {{baseUrl}}/posts
Content-Type: application/json

{
    "title": "Test Post",
    "body": "This is a test",
    "userId": 1
}
```

**Test Scripts:**
```javascript
pm.test("Status code is 201", function () {
    pm.response.to.have.status(201);
});

pm.test("Response contains ID", function () {
    const data = pm.response.json();
    pm.expect(data).to.have.property('id');
    pm.environment.set("createdPostId", data.id);
});

pm.test("Title matches request", function () {
    const response = pm.response.json();
    const request = JSON.parse(pm.request.body.raw);
    pm.expect(response.title).to.eql(request.title);
});
```

---

## 🟡 PUT Request Example

**Request:**
```
PUT {{baseUrl}}/posts/1
Content-Type: application/json

{
    "id": 1,
    "title": "Updated Title",
    "body": "Updated content",
    "userId": 1
}
```

**Test Scripts:**
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Title is updated", function () {
    const data = pm.response.json();
    pm.expect(data.title).to.eql("Updated Title");
});
```

---

## 🔴 DELETE Request Example

**Request:**
```
DELETE {{baseUrl}}/posts/{{createdPostId}}
```

**Test Scripts:**
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response is empty", function () {
    const data = pm.response.json();
    pm.expect(Object.keys(data).length).to.eql(0);
});
```

---

## ✅ Test Scripts

### Common Assertions

```javascript
// Status codes
pm.response.to.have.status(200);
pm.expect(pm.response.code).to.be.oneOf([200, 201]);

// Response time
pm.expect(pm.response.responseTime).to.be.below(1000);

// Headers
pm.expect(pm.response.headers.get("Content-Type"))
    .to.include("application/json");

// JSON validation
const data = pm.response.json();
pm.expect(data).to.be.an('object');
pm.expect(data.id).to.be.a('number');

// Schema validation
const schema = {
    type: "object",
    required: ["id", "title"],
    properties: {
        id: { type: "number" },
        title: { type: "string" }
    }
};
pm.response.to.have.jsonSchema(schema);
```

---

## 🌍 Environment Variables

**Setup:**
```javascript
// Set variable
pm.environment.set("postId", 123);

// Get variable
const postId = pm.environment.get("postId");

// Use in URL
{{baseUrl}}/posts/{{postId}}
```

**Pre-request Script:**
```javascript
// Generate random data
const random = Math.floor(Math.random() * 10000);
pm.environment.set("randomId", random);

// Set timestamp
pm.environment.set("timestamp", new Date().toISOString());
```

---

## 🚀 Running Collections

### Collection Runner (GUI)
1. Click **Runner**
2. Select collection
3. Choose environment
4. Click **Run**

### Newman (CLI)
```bash
# Install Newman
npm install -g newman

# Run collection
newman run collection.json -e environment.json

# Generate HTML report
newman run collection.json \
  -e environment.json \
  --reporters cli,html \
  --reporter-html-export report.html
```

### CI/CD Integration
```yaml
# GitHub Actions
- name: Run API Tests
  run: |
    npm install -g newman
    newman run postman/collection.json \
      -e postman/environment.json \
      --reporters cli,junit \
      --reporter-junit-export results.xml
```

---

## 🧠 Best Practices

### ✅ DO:
- ✔️ Use descriptive test names
- ✔️ Organize into folders by feature
- ✔️ Use environment variables
- ✔️ Test status, headers, and body
- ✔️ Check response time
- ✔️ Version control collections (JSON export)

### ❌ DON'T:
- ✖️ Hardcode sensitive data
- ✖️ Skip response validation
- ✖️ Create dependent tests without cleanup
- ✖️ Ignore error scenarios

---

## 🎓 Next Steps

1. Practice with real APIs (GitHub, weather, etc.)
2. Create data-driven tests with CSV
3. Integrate with CI/CD pipeline
4. Learn advanced scripting

**Resources:**
- [Postman Learning Center](https://learning.postman.com/)
- [Newman Documentation](https://learning.postman.com/docs/running-collections/using-newman-cli/)

---

<div align="center">

**⭐ Continue with REST-assured examples next! ⭐**

Made with ❤️ for QA-to-SDET Journey | February 2026

</div>
