# Generate Chain Page

Generate or regenerate per-chain documentation pages for the Sim API docs.

## Usage

- `/generate-chain-page` — regenerate all chain pages from the live API
- `/generate-chain-page ethereum` — generate/update a single chain page

## How it works

Run the generation script:

```bash
node scripts/generate-chain-pages.mjs        # all chains
node scripts/generate-chain-pages.mjs <name>  # single chain (use API name, e.g. "arbitrum_nova")
```

The script:
1. Fetches live chain data from `https://api.sim.dune.com/v1/evm/supported-chains`
2. Creates/overwrites `.mdx` files in `evm/chains/` for chains with at least one supported endpoint
3. Updates `docs.json` navigation with Mainnets/Testnets grouping

## After running

- Verify with `mintlify dev` that the new/updated pages render correctly
- If a new chain was added, check that it appears in the correct sidebar group (Mainnets or Testnets)
- Display name overrides can be added to the `DISPLAY_NAMES` map in `scripts/generate-chain-pages.mjs`
