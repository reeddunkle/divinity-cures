# Add a Content Security Policy

**Priority:** P3

## Objective

Restrict what the deployed site may load or embed, so injected content cannot run scripts or frame the site.

## Context

`netlify.toml` sets only `X-Content-Type-Options` and `Referrer-Policy`. The site loads every script, style, image, and font from its own origin, so a strict policy should cost nothing. There is no `Content-Security-Policy`, frame protection, or `Permissions-Policy`.

## Work

- Confirm in a production build whether TanStack Router, React, or Panda emit any inline script or style.
- Add a `Content-Security-Policy` that allows only same-origin resources and `frame-ancestors 'none'`.
- Add a `Permissions-Policy` that disables unused features.
- Ship the policy as `Content-Security-Policy-Report-Only` on a deploy preview first, then enforce it.
- Record the headers in `docs/deployment.md`.

## Acceptance criteria

- Production responses include an enforced CSP, `frame-ancestors 'none'`, and a `Permissions-Policy`.
- Every route loads with no CSP violations in the console.
- The deployment checklist verifies the new headers.
