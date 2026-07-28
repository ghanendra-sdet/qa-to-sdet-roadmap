<div align="center" markdown="1">

# 🧠 Command Recall Drill

### The [Playwright Quick Reference](./playwright-quick-reference.md) is for looking things up. This is for making sure you don't need to.

</div>

---

## How to Actually Use This Page

1. **Read the scenario only.** Don't peek at the answer.
2. **Say the code out loud, or actually type it** in a real test file against a real page.
3. **Then** click to reveal and check yourself.
4. Missed one? Mark it, come back to *just the marked ones* tomorrow. That's spaced repetition —
   it's why this page exists instead of just pointing you at the reference doc.

> [!TIP]
> 10-15 a day beats all 50 in one sitting. Cramming gets you recognition ("oh yeah, I've seen
> that"). Spaced active recall gets you the real thing — typing it correctly without thinking,
> mid-interview or mid-incident.

---

## Locators

<details>
<summary><strong>Find a button by its accessible name — the best-practice first choice.</strong></summary>

```typescript
page.getByRole('button', { name: 'Submit' })
```
</details>

<details>
<summary><strong>Find a form field by its visible label.</strong></summary>

```typescript
page.getByLabel('Email address')
```
</details>

<details>
<summary><strong>Find an element by a data-testid attribute.</strong></summary>

```typescript
page.locator('[data-testid="login-btn"]')
```
</details>

<details>
<summary><strong>Scope a locator to inside a specific card that contains certain text.</strong></summary>

```typescript
page.locator('.card').filter({ hasText: 'Premium' })
```
</details>

<details>
<summary><strong>Get the 3rd row of a table (0-indexed).</strong></summary>

```typescript
page.locator('table tbody tr').nth(2)
```
</details>

<details>
<summary><strong>Write a resilient locator that tries a label, then a placeholder, then an input type — in that order.</strong></summary>

```typescript
page.getByLabel('Email').or(page.getByPlaceholder(/email/i)).or(page.locator('input[type="email"]'))
```
</details>

---

## Actions

<details>
<summary><strong>Fill a text field (clearing it first).</strong></summary>

```typescript
await locator.fill('text');
```
</details>

<details>
<summary><strong>Check a checkbox — the version that works whether or not it's already checked.</strong></summary>

```typescript
await locator.check();
```
</details>

<details>
<summary><strong>Upload a file to a file input.</strong></summary>

```typescript
await locator.setInputFiles('path/to/file.pdf');
```
</details>

<details>
<summary><strong>Drag one element onto another.</strong></summary>

```typescript
await locator.dragTo(otherLocator);
```
</details>

---

## Assertions

<details>
<summary><strong>Assert an element is visible.</strong></summary>

```typescript
await expect(locator).toBeVisible();
```
</details>

<details>
<summary><strong>Assert an element's text contains a substring (not exact match).</strong></summary>

```typescript
await expect(locator).toContainText('partial');
```
</details>

<details>
<summary><strong>Assert exactly 5 matching elements exist.</strong></summary>

```typescript
await expect(locator).toHaveCount(5);
```
</details>

<details>
<summary><strong>Assert the page URL matches a pattern.</strong></summary>

```typescript
await expect(page).toHaveURL(/dashboard/);
```
</details>

<details>
<summary><strong>What's the single most common beginner bug with assertions, and how do you avoid it?</strong></summary>

Forgetting `await` on `expect()` — the assertion silently no-ops and the test "passes" without
actually checking anything. Always `await expect(...)`.
</details>

---

## Waiting

<details>
<summary><strong>Wait for the network to go idle before continuing.</strong></summary>

```typescript
await page.waitForLoadState('networkidle');
```
</details>

<details>
<summary><strong>Wait for a specific API response before asserting on what it caused.</strong></summary>

```typescript
await page.waitForResponse(resp => resp.url().includes('/api/') && resp.status() === 200);
```
</details>

<details>
<summary><strong>What should you almost never use instead of a condition-based wait?</strong></summary>

```typescript
// ❌ Avoid — defeats the point of Playwright's auto-waiting
await page.waitForTimeout(3000);
```
</details>

---

## API Testing (`request` fixture)

<details>
<summary><strong>Send a GET request and assert it succeeded.</strong></summary>

```typescript
const res = await request.get('/api/posts');
expect(res.ok()).toBeTruthy();
```
</details>

<details>
<summary><strong>Send a POST request with a JSON body.</strong></summary>

```typescript
const res = await request.post('/api/posts', { data: { title: 'x' } });
```
</details>

<details>
<summary><strong>Get the parsed JSON body from a response.</strong></summary>

```typescript
const body = await res.json();
```
</details>

---

## CLI Commands

<details>
<summary><strong>Run the full suite, watching it happen in a real browser.</strong></summary>

```bash
npx playwright test --headed
```
</details>

<details>
<summary><strong>Open the time-travel UI debugger (the one you should reach for daily).</strong></summary>

```bash
npx playwright test --ui
```
</details>

<details>
<summary><strong>Run only tests tagged @smoke.</strong></summary>

```bash
npx playwright test --grep @smoke
```
</details>

<details>
<summary><strong>Shard a large suite across 3 parallel CI machines — this is shard 1.</strong></summary>

```bash
npx playwright test --shard=1/3
```
</details>

<details>
<summary><strong>Open a saved trace file from a failed CI run.</strong></summary>

```bash
npx playwright show-trace trace.zip
```
</details>

<details>
<summary><strong>Record actions in a browser and generate starter test code.</strong></summary>

```bash
npx playwright codegen https://example.com
```
</details>

---

## Git & CI/CD (Module 08)

<details>
<summary><strong>Undo a commit that's already been pushed and pulled by teammates.</strong></summary>

```bash
git revert <commit-hash>
```
</details>

<details>
<summary><strong>Push, but safely refuse if the remote has changes you haven't seen.</strong></summary>

```bash
git push --force-with-lease
```
</details>

<details>
<summary><strong>Find a "lost" commit after a bad reset --hard.</strong></summary>

```bash
git reflog
```
</details>

---

## 🎯 Full-Speed Round (No Hints)

1. Locate a button by its accessible name.
2. Assert an element is visible before interacting with it.
3. Upload a file to a file input.
4. Wait for a specific API call to complete before asserting.
5. Send a POST request with a JSON body via the `request` fixture.
6. Run only `@smoke`-tagged tests.
7. Open the trace from a CI failure you can't reproduce locally.
8. Undo a commit that teammates have already pulled.

<details>
<summary>Answers</summary>

1. `page.getByRole('button', { name: '...' })`
2. `await expect(locator).toBeVisible();`
3. `await locator.setInputFiles('path/to/file.pdf');`
4. `await page.waitForResponse(resp => resp.url().includes('/api/'));`
5. `await request.post('/api/posts', { data: {...} });`
6. `npx playwright test --grep @smoke`
7. `npx playwright show-trace trace.zip`
8. `git revert <commit-hash>`

</details>

---

<div align="center" markdown="1">

**[← Back to Resources](../README.md)** | **[📖 Full Reference (no quizzing) →](./playwright-quick-reference.md)**

</div>
