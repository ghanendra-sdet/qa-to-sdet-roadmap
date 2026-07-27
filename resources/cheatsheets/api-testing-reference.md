# API Testing Reference

## HTTP Methods, Status Codes, and Quick Syntax Across Tools

Full depth lives in [Module 02](../../02-api-testing/) and
[Module 04](../../04-playwright-api-automation/) — this is the fast lookup table.

---

## 🔧 HTTP Methods

| Method | Meaning | Idempotent? | Has a Body? |
|--------|---------|:-----------:|:-----------:|
| `GET` | Read data | ✅ Yes | ❌ No |
| `POST` | Create data | ❌ No | ✅ Yes |
| `PUT` | Replace entirely | ✅ Yes | ✅ Yes |
| `PATCH` | Update partially | ❌ No | ✅ Yes |
| `DELETE` | Remove data | ✅ Yes | ❌ Usually not |

**"Idempotent"** = calling it 5 times has the same effect as calling it once. `POST` is *not*
idempotent — that's exactly why payment APIs need idempotency keys (see Module 02).

---

## 🚦 Status Codes

| Code | Meaning | When You'll See It |
|------|---------|---------------------|
| `200` | OK | Successful GET/PUT/PATCH/DELETE |
| `201` | Created | Successful POST that created a resource |
| `204` | No Content | Successful request, nothing to return |
| `400` | Bad Request | Malformed input, failed validation |
| `401` | Unauthorized | Missing/invalid authentication |
| `403` | Forbidden | Authenticated, but not allowed to do this |
| `404` | Not Found | Resource doesn't exist |
| `409` | Conflict | Duplicate resource, idempotency key reuse |
| `422` | Unprocessable Entity | Syntactically valid, semantically wrong |
| `429` | Too Many Requests | Rate limited |
| `500` | Internal Server Error | The server broke, not you |
| `503` | Service Unavailable | Server temporarily can't handle it |

> [!TIP]
> A `200 OK` on a request that should have been rejected is a **worse** bug than a `500` — a
> `500` is loud and obvious, a wrongly-accepted `200` silently corrupts data. Always test that
> bad input gets a `4xx`, not just that good input gets a `2xx`.

---

## 📮 Postman

```javascript
pm.test("Status is 200", () => pm.response.to.have.status(200));
pm.test("Has property", () => {
  const data = pm.response.json();
  pm.expect(data).to.have.property('id');
});
pm.environment.set("token", pm.response.json().token);
pm.expect(pm.response.responseTime).to.be.below(1000);
```

```bash
newman run collection.json -e environment.json --reporters cli,html
```

---

## ☕ REST-assured (Java)

```java
given()
    .contentType("application/json")
    .header("Authorization", "Bearer " + token)
.when()
    .get("/posts/{id}", 1)
.then()
    .statusCode(200)
    .body("title", notNullValue())
    .time(lessThan(2000L));
```

---

## 🎭 Playwright (`request` fixture)

```typescript
const res = await request.get('/posts/1', {
  headers: { Authorization: `Bearer ${token}` }
});
expect(res.status()).toBe(200);
const body = await res.json();
expect(body).toMatchObject({ id: expect.any(Number) });
```

---

## 🔐 Auth Patterns

```
Bearer Token:  Authorization: Bearer <token>
Basic Auth:    Authorization: Basic <base64(user:pass)>
API Key:       X-API-Key: <key>
OAuth2:        Authorization: Bearer <access_token> (obtained via OAuth flow)
```

---

## ✅ What a Solid API Test Checks (Not Just Status Code)

- [ ] Status code
- [ ] Response schema/shape (not just "it's JSON")
- [ ] Specific field values that matter for the scenario
- [ ] Response headers (`Content-Type`, caching headers if relevant)
- [ ] Response time (within a reasonable bound)
- [ ] Negative case: missing required field → correct `4xx`
- [ ] Negative case: wrong data type → correct `4xx`
- [ ] Boundary case: empty array, max-length string, zero/negative numbers where relevant

---

**[← Back to Resources](../README.md)**
