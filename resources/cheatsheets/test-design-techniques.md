# Test Design Techniques Cheat Sheet

## EP, BVA, Decision Tables, State Transition — Quick Lookup

Full explanations and worked examples live in
[Module 01: Manual Testing Concepts](../../01-manual-testing/concepts/README.md) — this page is
the condensed version for when you already know the technique and want the pattern fast.

---

## 1️⃣ Equivalence Partitioning (EP)

**Idea:** Divide inputs into classes where every value in a class should behave the same way.
Test **one representative value per class**, not every possible value.

```
Valid range: 18–60
P1: age < 18   (Invalid)  → test with 10
P2: 18–60      (Valid)    → test with 35
P3: age > 60   (Invalid)  → test with 70
```

**Use when:** the input space is too large to test exhaustively and values within a range behave
identically.

---

## 2️⃣ Boundary Value Analysis (BVA)

**Idea:** Bugs cluster at boundaries (off-by-one errors, wrong comparison operators). Test the
edges, not just the middle.

```
For range [min, max], test:
min - 1, min, min + 1, max - 1, max, max + 1
```

```
Password length 8–16:
7 (❌) → 8 (✅) → 9 (✅) → 15 (✅) → 16 (✅) → 17 (❌)
```

**Use when:** you've already identified a range via EP — BVA is the natural follow-up, not a
replacement.

---

## 3️⃣ Decision Table Testing

**Idea:** Capture combinations of conditions and their resulting actions — best for complex
business rules with multiple inputs.

```
| Rule | R1 | R2 | R3 | R4 |
|------|----|----|----|----|
| Income ≥ $50K | ✅ | ✅ | ❌ | ❌ |
| Credit ≥ 700  | ✅ | ❌ | ✅ | ❌ |
| Approve Loan  | ✅ | ❌ | ❌ | ❌ |
```

Every column is one test case: `R1 = Income≥$50K AND Credit≥700 → Approved`.

**Use when:** the outcome depends on a *combination* of independent conditions, not just one
input's range.

---

## 4️⃣ State Transition Testing

**Idea:** Test how a system moves between states in response to events — and just as
importantly, that *invalid* transitions are correctly blocked.

```
Inactive --(email verified)--> Active --(3 failed logins)--> Locked
Active --(admin action)--> Suspended --(reactivate)--> Active

Invalid: Inactive → Locked (should never be reachable directly)
```

**Use when:** the system has a lifecycle (account states, order status, ticket workflow) — and
always pair valid-transition tests with at least one invalid-transition test.

---

## 🧭 Which Technique When?

| Scenario | Technique |
|---|---|
| A single numeric/text field with a valid range | EP + BVA together |
| Multiple independent yes/no conditions driving one outcome | Decision Table |
| An entity that moves through statuses over time | State Transition |
| "I have too many possible inputs to test them all" | EP first, always |

---

## 🎯 The One-Line Version of Each

- **EP** — one test per *class* of input, not per input.
- **BVA** — test the edges, that's where bugs actually live.
- **Decision Table** — combinations of conditions, not just single fields.
- **State Transition** — valid moves AND the invalid moves that should be blocked.

---

**[← Back to Resources](../README.md)**
