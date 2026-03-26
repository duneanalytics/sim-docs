# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Mintlify-powered API documentation site for **Sim by Dune** — a blockchain data and wallet analytics API platform covering 60+ EVM chains and Solana.

## Development

```bash
# Install Mintlify CLI (one-time)
npm i -g mintlify

# Run local dev server (must be run from repo root where docs.json lives)
mintlify dev

# Clear cache / fix broken state
mintlify install
```

There is no build step, linter, or test suite. Deployment is automatic via GitHub App when changes are pushed to the default branch.

## Key Files

- **docs.json** — Mintlify site configuration: navigation structure, theme, OpenAPI references, navbar/footer
- **openapi.json** — Consolidated OpenAPI 3.0.3 spec (~225KB) for all EVM and SVM endpoints. API endpoint pages reference this via `openapi` frontmatter field
- **custom.js** — DOM manipulation (hides default-value labels in OpenAPI playground)
- **styles.css** — Theme overrides
- **.well-known/ai-tools.json** — AI agent tool manifest for external LLM integrations

## Content Structure

Documentation pages are `.mdx` files (Markdown + JSX). Each page has YAML frontmatter:

```yaml
---
title: "Page Title"
sidebarTitle: "Sidebar Label"
description: "SEO description"
openapi: "/openapi.json GET /v1/evm/balances/{address}"  # for API endpoint pages
---
```

**Directory layout:**
- `evm/` — EVM endpoint docs + guides + subscription/webhook docs (`evm/subscriptions/`)
- `svm/` — Solana endpoint docs
- `snippets/` — Reusable MDX/JSX components (chain support tables, icons). Imported via `import { Component } from "/snippets/file.mdx"`
- `images/`, `logo/` — Static assets

**Navigation** is defined in `docs.json` under `navigation.tabs[0].groups`. Adding or renaming a page requires updating both the `.mdx` file and `docs.json`.

## Mintlify Components

Pages use Mintlify's built-in components: `CodeGroup`, `Accordion`/`AccordionGroup`, `Card`/`CardGroup`, `Frame`, `Note`, `Tip`, `Warning`. API examples use `CodeGroup` with curl, JavaScript, and Python variants.

## Git

Do not commit directly to `main` — use feature branches.
