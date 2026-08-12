# Contributing to StellarCred App

StellarCred participates in the [Drips Stellar Wave](https://www.drips.network/wave/stellar).
Issues in this repo are tagged with a complexity label and a Point value.
Completing an issue during an active Wave earns you Points, redeemable for
rewards. Please read this whole document before opening a PR.

## Before you start

- **Do not start work before you are assigned the issue.** Comment on the
  issue to request assignment and wait for a maintainer to assign you.
  Unassigned or unsolicited PRs will not be scored and may be closed.
- Check the issue's complexity label (`complexity: trivial`,
  `complexity: medium`, `complexity: high`) to understand the expected scope
  before committing to it.
- If an issue is unclear, ask clarifying questions in the issue thread
  first — don't guess and submit a PR that misses the mark.

## Branch naming

Use the pattern `type/issue-number-short-description`, e.g.:

```
fix/18-leaderboard-empty-state
feat/25-add-verify-page-history
```

Where `type` is one of `feat`, `fix`, `refactor`, `test`, `docs`, or `chore`.

## Development setup

This app depends on `@stellarcred/sdk`, which is not yet published to npm.
Clone it as a sibling directory before installing:

```bash
git clone git@github.com:Stellar-Cred/stellarcred-sdk.git
cd stellarcred-sdk && npm install && npm run build && cd ..

git clone git@github.com:Stellar-Cred/stellarcred-app.git
cd stellarcred-app
cp .env.example .env.local   # fill in NEXT_PUBLIC_CONTRACT_ID
npm install
npm run dev
```

## Pull request rules

- One issue per PR. Reference it with `Closes #<issue-number>`.
- `npm run typecheck`, `npm run lint`, and `npm run build` must all pass
  locally before you open the PR — CI enforces the same checks.
- TypeScript is `strict`. Do not introduce `any` types or `// @ts-ignore`
  comments.
- No `TODO`s or placeholder logic. If a change is too large to land
  completely, split it into smaller issues instead.
- New or changed UI must be mobile responsive and match the existing dark
  theme (`cred-dark`, `cred-gold`, `cred-purple`, `cred-diamond`).
- Verify your change in the browser before opening the PR — a passing build
  does not guarantee working UI.
- Keep PRs focused. Unrelated formatting or refactors should be their own PR.

## Review & rewards

Once your PR is merged and the maintainer marks the issue resolved before
the Wave ends, your Points are recorded automatically. See
[docs.drips.network/wave/points-and-rewards](https://docs.drips.network/wave/points-and-rewards)
for how payouts work.
