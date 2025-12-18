# Copilot Instructions for @1inch/sdks Monorepo

## 🏗️ Architecture Overview

This is a **multi-language SDK monorepo** for 1inch Protocol with independent TypeScript packages and Solidity contracts. The key design principle is **modular independence**: each SDK can be built, tested, and published separately without affecting others.

### Project Structure
- **`typescript/sdk-core`** - Shared domain objects and utilities used by all SDKs
  - Core types: `Address`, `HexString`, `CallInfo`, domain value objects with validation
  - Re-exported to all consumer SDKs as peer dependency
  - Pattern: Immutable domain classes with static factory methods and validators
  
- **`typescript/aqua`** - Aqua Protocol SDK for liquidity management
  - Encodes/decodes protocol operations: `ship`, `dock`, `push`, `pull`
  - Parses contract events
  
- **`typescript/swap-vm`** - Swap VM Protocol SDK for token swapping
  - Transaction builders and instruction system for swaps
  - Order and trait management (MakerTraits, TakerTraits)
  
- **`contracts/src`** - Solidity smart contracts (tested with Foundry)
- **`contracts/lib/@1inch/`** - Installed protocol contracts as dependencies

### Dependency Flow
```
aqua SDK → depends on → sdk-core
swap-vm SDK → depends on → sdk-core
sdk-core → no dependencies (except external utilities)
```

## 🛠️ Build & Development Workflow

### Essential Commands
```bash
# First-time setup (REQUIRED - contracts must be built before lint/test)
pnpm install
pnpm build:contracts  # Forge compilation; output: dist/contracts/

# Daily development
pnpm build            # All SDKs via tsdown (generates CJS + ESM)
pnpm test             # Vitest (unit + coverage)
pnpm test:e2e         # Separate e2e test suites (local forked EVM)
pnpm lint             # ESLint with license header checks
pnpm lint:fix         # Auto-fix linting issues
pnpm lint:types       # tsc type-check across all packages

# For PR/CI work (incremental)
pnpm affected:build   # Only build changed SDKs
pnpm affected:test    # Only test changed SDKs
pnpm affected:lint    # Only lint changed SDKs
```

### Build System Details
- **Monorepo manager:** NX (configured in `nx.json`)
- **Workspaces:** pnpm (root `pnpm-workspace.yaml` declares `typescript/*` as packages)
- **TypeScript compilation:** tsdown (bundles TypeScript → CJS + ESM + .d.ts)
  - Each SDK's `build` target runs `tsdown` in its directory
  - Output: `{packageRoot}/dist/`
- **Testing:** Vitest (configured per-SDK in `vitest.config.mts`)
  - Unit tests: `src/**/*.{test,spec}.ts`
  - E2E tests: separate config file, tests against forked EVM
- **Contracts:** Foundry/Forge (`foundry.toml`)
  - Solc version: 0.8.30
  - Output: `dist/contracts/`
  - License headers required (checked by eslint-plugin-license-header)

## 📦 SDK Package Patterns

### Publishing & Versioning
- **Independent versioning:** Each SDK has separate version tags
  - Format: `{sdk-name}/v*.*.*` (e.g., `aqua/v1.0.0`, `swap-vm/v1.1.0`)
  - SDK version NOT auto-bumped if dependencies change
- **Build output:** Each SDK exports both CommonJS and ESM via `exports` field in package.json
  - Main entry: `./dist/index.js` (CJS), `./dist/index.mjs` (ESM)
  - Sub-export example (sdk-core): `./test-utils` for test helpers

### Domain Objects Pattern
All SDKs use immutable domain classes from `sdk-core` for type safety:

```typescript
// Example: Address domain object (from sdk-core)
class Address {
  constructor(val: string)  // validates via viem's isAddress
  toString(): Hex           // get raw hex value
  equal(other: Address): boolean
  isNative(): boolean
  isZero(): boolean
  static fromBigInt(val: bigint): Address
}

// Usage in SDKs: new Address('0x...') enforces validation at construction
```

Common domain classes: `Address`, `HexString`, `CallInfo`, `NetworkEnum`

### Test Utilities Export
`sdk-core` exports a secondary entry point for test helpers:
```json
"./test-utils": { "types": "./dist/test-utils/index.d.ts", ... }
```

Use this in other SDKs for shared test setup (e.g., `test-wallet.ts`, `addresses.ts`).

## 🔍 Key Code Patterns

### 1. Domain Value Objects (sdk-core)
- **Location:** `typescript/sdk-core/src/domains/`
- **Pattern:** Immutable classes with validation in constructor, static factories, toJSON for serialization
- **Example:** `Address`, `HexString`
- **Why:** Type-safe across SDKs, prevents invalid states, validation happens early

### 2. Contract Interaction (aqua/swap-vm SDKs)
- **Location:** `typescript/{aqua,swap-vm}/src/{sdk-name}-contract/`
- **Pattern:** Contract class with methods for each protocol operation (e.g., `ship()`, `dock()` in Aqua)
- **Returns:** `CallInfo` object (to, data, value for transaction building)
- **ABI imports:** Auto-generated from Solidity contracts, stored in `src/abi/` as TypeScript

### 3. Event Parsing
- **Location:** `src/events/` in protocol SDKs
- **Pattern:** Event decoders that parse contract event logs
- **Tool:** viem's log parsing utilities

### 4. Constants & Multi-Chain Support
- **Pattern:** `NetworkEnum` for chain IDs, contract address maps per chain
- **Example:** `AQUA_CONTRACT_ADDRESSES[NetworkEnum.ETHEREUM]`
- **Location:** `src/aqua-protocol-contract/constants.ts`

## 🧪 Testing Standards

### Vitest Configuration
- **Environment:** Node.js (not jsdom)
- **Globals:** true (no import of describe/it/expect needed)
- **Coverage exclusions:** `index.ts`, `constants.ts`, `types.ts` (re-exports don't need coverage)
- **Coverage path:** Reports go to `../../coverage/typescript/{sdk-name}`

### E2E Testing
- Separate config: `vitest.e2e.config.mts`
- Requires local EVM fork (setup in test file)
- Run with: `pnpm test:e2e` or individual SDK `pnpm aqua:test:e2e`

### Test Patterns
```typescript
// Standard test structure
import { describe, it, expect } from 'vitest'

describe('Component', () => {
  it('should handle valid input', () => {
    const result = operation(validInput)
    expect(result).toEqual(expectedOutput)
  })

  it('should throw on invalid input', () => {
    expect(() => operation(invalidInput)).toThrow('Expected error message')
  })
})
```

## 📋 Common Tasks

### Adding a New SDK
1. Create folder under `typescript/{sdk-name}/`
2. Add `package.json` with `@1inch/sdk-{name}` name, dependencies on sdk-core
3. Create `project.json` (copy from aqua/swap-vm and adjust)
4. Create `tsconfig.json`, `vitest.config.mts`, `eslint.config.mjs`
5. Verify `pnpm install && pnpm build:contracts && pnpm build` works

### Modifying Domain Objects (sdk-core)
- Add to `src/domains/{name}.ts`
- Add tests to `src/domains/{name}.test.ts`
- Export from `src/domains/index.ts`
- All SDKs will automatically re-export via their index.ts

### Adding Contract Functionality
1. Update Solidity contract in `contracts/src/{protocol}/`
2. Run `pnpm build:contracts` (generates new ABIs)
3. Update SDK's `src/abi/{contract}.abi.ts`
4. Add methods to contract class in `src/{sdk-name}-contract/`
5. Add tests and event parsers as needed

### Fixing Lint Issues
- License header missing: Add SPDX comment at top of file
  ```typescript
  // SPDX-License-Identifier: LicenseRef-Degensoft-Aqua-Source-1.1
  ```
- Type errors: Run `pnpm lint:types` to see full tsc output
- ESLint fixes: `pnpm lint:fix` auto-corrects most issues

## 🚀 Release Process

Each SDK releases independently via GitHub Actions:
1. Go to Actions → "Release" workflow
2. Choose SDK + version bump (patch/minor/major/prerelease)
3. Workflow auto-commits, tags (e.g., `aqua/v1.0.0`), and publishes to npmjs + GitHub Packages
4. Prerelease bumps use `next` dist-tag; normal releases use default

**Important:** Dependent SDKs are NOT auto-bumped (NX `updateDependents=never`).

## ⚠️ Critical Notes

- **Always run `pnpm build:contracts` after pulling** if contract files changed
- **License headers required** in all `.ts` and `.sol` files (checked by linter)
- **Don't manually edit generated ABIs** in `src/abi/` - they're auto-generated from contracts
- **Use domain objects** (Address, HexString) for type safety; avoid raw strings for crypto values
- **Test coverage excludes re-export files** (index.ts, constants.ts, types.ts) - add real tests elsewhere
