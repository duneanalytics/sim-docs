#!/usr/bin/env node

/**
 * Generates per-chain documentation pages under evm/chains/
 * and updates docs.json navigation.
 *
 * Usage:
 *   node scripts/generate-chain-pages.mjs            # generate all supported chains
 *   node scripts/generate-chain-pages.mjs ethereum    # generate a single chain
 */

import { writeFileSync, readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const SAMPLE_ADDRESS = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";
const SAMPLE_TOKEN = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"; // USDC on Ethereum
const API_BASE = "https://api.sim.dune.com";

// Display name overrides for chains where simple title-casing doesn't work
const DISPLAY_NAMES = {
  bnb: "BNB Chain",
  opbnb: "opBNB",
  zkevm: "Polygon zkEVM",
  zksync: "zkSync",
  avalanche_c: "Avalanche C-Chain",
  avalanche_fuji: "Avalanche Fuji",
  hyper_evm: "HyperEVM",
  base_sepolia: "Base Sepolia",
  polygon_amoy: "Polygon Amoy",
  monad_testnet: "Monad Testnet",
  arbitrum_nova: "Arbitrum Nova",
  ape_chain: "ApeChain",
  zero_network: "Zero Network",
  tempo_mainnet: "Tempo Mainnet",
  b3: "B3",
  xai: "Xai",
  sei: "Sei",
  bob: "BOB",
  ink: "Ink",
};

const ENDPOINTS = [
  {
    key: "balances",
    label: "Balances",
    path: `/v1/evm/balances/${SAMPLE_ADDRESS}`,
    docLink: "/evm/balances",
    usesChainQuery: true,
  },
  {
    key: "activity",
    label: "Activity",
    path: `/v1/evm/activity/${SAMPLE_ADDRESS}`,
    docLink: "/evm/activity",
    usesChainQuery: true,
  },
  {
    key: "transactions",
    label: "Transactions",
    path: `/v1/evm/transactions/${SAMPLE_ADDRESS}`,
    docLink: "/evm/transactions",
    usesChainQuery: true,
  },
  {
    key: "collectibles",
    label: "Collectibles",
    path: `/v1/evm/collectibles/${SAMPLE_ADDRESS}`,
    docLink: "/evm/collectibles",
    usesChainQuery: true,
  },
  {
    key: "token_info",
    label: "Token Info",
    path: `/v1/evm/token-info/${SAMPLE_TOKEN}`,
    docLink: "/evm/token-info",
    usesChainQuery: true,
  },
  {
    key: "token_holders",
    label: "Token Holders",
    path: null, // built dynamically with chain_id in path
    docLink: "/evm/token-holders",
    usesChainQuery: false,
  },
  {
    key: "defi_positions",
    label: "DeFi Positions",
    path: `/v1/evm/defi/positions/${SAMPLE_ADDRESS}`,
    docLink: "/evm/defi-positions",
    usesChainQuery: true,
  },
];

function toDisplayName(apiName) {
  if (DISPLAY_NAMES[apiName]) return DISPLAY_NAMES[apiName];
  return apiName
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function isTestnet(chain) {
  const testnetTags = ["testnet", "devnet"];
  if (chain.tags.some((t) => testnetTags.includes(t))) return true;
  // Infer from name for untagged chains
  const testnetNames = ["testnet", "sepolia", "fuji", "amoy"];
  return testnetNames.some((n) => chain.name.includes(n));
}

function hasAnySupport(chain) {
  return ENDPOINTS.some(
    (ep) => chain[ep.key] && chain[ep.key].supported
  );
}

function buildUrl(endpoint, chainId) {
  if (endpoint.key === "token_holders") {
    return `${API_BASE}/v1/evm/token-holders/${chainId}/${SAMPLE_TOKEN}`;
  }
  const sep = endpoint.path.includes("?") ? "&" : "?";
  return `${API_BASE}${endpoint.path}${sep}chain_ids=${chainId}`;
}

function generatePage(chain) {
  const displayName = toDisplayName(chain.name);
  const chainId = chain.chain_id;
  const tags = chain.tags.length > 0 ? chain.tags.join(", ") : "none";

  const supportedEndpoints = ENDPOINTS.filter(
    (ep) => chain[ep.key] && chain[ep.key].supported
  );
  const unsupportedEndpoints = ENDPOINTS.filter(
    (ep) => !chain[ep.key] || !chain[ep.key].supported
  );

  // Build endpoint support table
  const tableRows = ENDPOINTS.map((ep) => {
    const supported = chain[ep.key] && chain[ep.key].supported;
    const icon = supported ? "✓" : "✗";
    return `| [${ep.label}](${ep.docLink}) | ${icon} |`;
  }).join("\n");

  // Build example sections for each supported endpoint
  const examples = supportedEndpoints
    .map((ep) => {
      const url = buildUrl(ep, chainId);
      return `### ${ep.label}

<CodeGroup>

\`\`\`bash cURL
curl -X GET "${url}" \\
  -H "X-Sim-Api-Key: YOUR_API_KEY"
\`\`\`

\`\`\`javascript JavaScript
const response = await fetch("${url}", {
  headers: { "X-Sim-Api-Key": "YOUR_API_KEY" }
});
const data = await response.json();
\`\`\`

\`\`\`python Python
import requests

response = requests.get(
    "${url}",
    headers={"X-Sim-Api-Key": "YOUR_API_KEY"}
)
data = response.json()
\`\`\`

</CodeGroup>`;
    })
    .join("\n\n");

  return `---
title: "${displayName}"
sidebarTitle: "${displayName}"
description: "Sim API endpoints and examples for ${displayName} (chain ID ${chainId})."
---

## Chain Details

| Property | Value |
|----------|-------|
| **Chain ID** | \`${chainId}\` |
| **API Name** | \`${chain.name}\` |
| **Tags** | ${chain.tags.length > 0 ? chain.tags.map((t) => `\`${t}\``).join(", ") : "—"} |

## Supported Endpoints

| Endpoint | Supported |
|----------|-----------|
${tableRows}

## Example Requests

Use \`chain_ids=${chainId}\` to query ${displayName} specifically.

${examples}

## See Also

- [Supported Chains](/evm/supported-chains) — full list of chains and endpoint support
${supportedEndpoints.map((ep) => `- [${ep.label} API](${ep.docLink}) — endpoint reference and parameters`).join("\n")}
`;
}

async function main() {
  const targetChain = process.argv[2];

  console.log("Fetching supported chains from API...");
  const res = await fetch(`${API_BASE}/v1/evm/supported-chains`);
  const data = await res.json();

  let chains = data.chains.filter(hasAnySupport);
  console.log(`Found ${chains.length} chains with endpoint support.`);

  if (targetChain) {
    chains = chains.filter((c) => c.name === targetChain);
    if (chains.length === 0) {
      console.error(`Chain "${targetChain}" not found or has no supported endpoints.`);
      process.exit(1);
    }
  }

  // Generate .mdx files
  for (const chain of chains) {
    const content = generatePage(chain);
    const filePath = join(ROOT, "chains", `${chain.name}.mdx`);
    writeFileSync(filePath, content);
    console.log(`  Created ${chain.name}.mdx`);
  }

  // Update docs.json navigation
  const docsJsonPath = join(ROOT, "docs.json");
  const docsJson = JSON.parse(readFileSync(docsJsonPath, "utf-8"));

  const mainnets = chains
    .filter((c) => !isTestnet(c))
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((c) => `chains/${c.name}`);

  const testnets = chains
    .filter((c) => isTestnet(c))
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((c) => `chains/${c.name}`);

  const blockchainsGroup = {
    group: "Blockchains",
    pages: [
      { group: "EVM Mainnets", pages: mainnets },
      ...(testnets.length > 0 ? [{ group: "EVM Testnets", pages: testnets }] : []),
    ],
  };

  const groups = docsJson.navigation.tabs[0].groups;

  // Remove existing Blockchains group if present
  const existingIdx = groups.findIndex((g) => g.group === "Blockchains");
  if (existingIdx !== -1) {
    groups.splice(existingIdx, 1);
  }

  // Insert before "Resources"
  const resourcesIdx = groups.findIndex((g) => g.group === "Resources");
  if (resourcesIdx !== -1) {
    groups.splice(resourcesIdx, 0, blockchainsGroup);
  } else {
    groups.push(blockchainsGroup);
  }

  writeFileSync(docsJsonPath, JSON.stringify(docsJson, null, 2) + "\n");
  console.log(`\nUpdated docs.json navigation.`);
  console.log(
    `  Mainnets: ${mainnets.length} chains, Testnets: ${testnets.length} chains`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
