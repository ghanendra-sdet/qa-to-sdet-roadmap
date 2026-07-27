# Playwright Quick Reference

## Quick Reference for Common Playwright API Calls

Full depth on all of this lives in [Module 03](../../03-playwright-basics/),
[04](../../04-playwright-api-automation/), and [05](../../05-playwright-ui-automation/) — this
page is just the lookup table for when you already know the concept and want the syntax fast.

---

## 🎯 Locators (Best → Last Resort)

```typescript
page.getByRole('button', { name: 'Submit' })   // 1. Best — accessible, redesign-proof
page.getByLabel('Email address')                // 2. Great — form fields
page.getByPlaceholder('Enter email')            // 3. Good — placeholder-only fields
page.getByText('Welcome back')                  // 4. OK — visible text content
page.locator('[data-testid="login-btn"]')       // 5. Fine — explicit test hooks
page.locator('.btn-primary')                    // 6. Last resort — CSS tied to styling

// Chaining / scoping
page.locator('.card').filter({ hasText: 'Premium' })
page.locator('table tbody tr').nth(2)
page.locator('ul li').first()
page.locator('ul li').last()

// Fallback chain (real-world resilience pattern)
page.getByLabel('Email').or(page.getByPlaceholder(/email/i)).or(page.locator('input[type="email"]'))
```

---

## 🖱️ Actions (All Auto-Wait — No `sleep()` Needed)

```typescript
await locator.click();
await locator.dblclick();
await locator.fill('text');           // clears + types
await locator.type('text');           // types char by char (rarely needed over fill)
await locator.press('Enter');
await locator.check();                // checkbox/radio
await locator.uncheck();
await locator.selectOption('value');
await locator.setInputFiles('path/to/file.pdf');
await locator.hover();
await locator.dragTo(otherLocator);
await locator.scrollIntoViewIfNeeded();
```

---

## ✅ Assertions (`expect`)

```typescript
await expect(locator).toBeVisible();
await expect(locator).toBeHidden();
await expect(locator).toBeEnabled();
await expect(locator).toBeDisabled();
await expect(locator).toBeChecked();
await expect(locator).toHaveText('Exact text');
await expect(locator).toContainText('partial');
await expect(locator).toHaveValue('input value');
await expect(locator).toHaveAttribute('href', '/dashboard');
await expect(locator).toHaveCount(5);
await expect(locator).toHaveClass(/active/);

await expect(page).toHaveURL(/dashboard/);
await expect(page).toHaveTitle('My App');
await expect(page).toHaveScreenshot('page.png');
```

> [!WARNING]
> Every `expect()` call needs `await`. A missing `await` silently no-ops the assertion — your
> test "passes" without actually checking anything.

---

## ⏳ Waiting

```typescript
await page.waitForURL(/dashboard/);
await page.waitForLoadState('networkidle');
await locator.waitFor({ state: 'visible', timeout: 5000 });
await page.waitForEvent('download');
await page.waitForResponse(resp => resp.url().includes('/api/') && resp.status() === 200);

// ❌ Avoid — defeats the point of auto-waiting
await page.waitForTimeout(3000);
```

---

## 🌐 API Testing (`request` fixture)

```typescript
const res = await request.get('/api/posts');
const res = await request.post('/api/posts', { data: { title: 'x' } });
const res = await request.put('/api/posts/1', { data: {...} });
const res = await request.delete('/api/posts/1');

expect(res.ok()).toBeTruthy();
expect(res.status()).toBe(200);
const body = await res.json();
```

---

## 🖥️ CLI Commands

```bash
npx playwright test                        # run all tests
npx playwright test --headed               # watch it happen
npx playwright test --ui                   # time-travel debugger (use this daily)
npx playwright test --debug                # step-through inspector
npx playwright test --project=firefox      # one browser only
npx playwright test --grep @smoke          # tag filter
npx playwright test --shard=1/3            # CI sharding
npx playwright show-report                 # open HTML report
npx playwright show-trace trace.zip        # open a trace file
npx playwright codegen https://example.com # record actions → generate code
```

---

## 🏗️ Fixtures (Custom)

```typescript
import { test as base } from '@playwright/test';

export const test = base.extend<{ loginPage: LoginPage }>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
});
```

---

**[← Back to Resources](../README.md)**
