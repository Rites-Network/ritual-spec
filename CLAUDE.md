# ritual-spec — the vendor-neutral home of `ritual/1`

## What makes this repository different

**It renders the format; it does not fork it.** `SPEC.md`,
`schema/ritual-1.schema.json`, `conformance/corpus.json` and `vendor-ritual.mjs`
are byte-identical copies of **canon**, flashyos `packages/ritual`. There is no
emitter, no site, no state here — this is the specification and only the
specification. The reference renderer is
[FlashyLabs/Rites-Network](https://github.com/FlashyLabs/Rites-Network), which
serves the format at [rites.network](https://rites.network) and vendors the same
four files.

**A change to what a valid document IS is made in canon first**, then
re-vendored here, then re-vendored in Rites-Network. Never edit the four format
files in this repository: `test/vendor-drift.test.mjs` asserts byte-identity
against canon and fails on drift, reporting UNKNOWN (never a pass) when the
canon checkout is absent beside this one.

**Dependency-free is a rule, not a preference.** `node:` builtins only, Node 22,
ESM. There is no `dependencies` key and no install step in CI. A check that
needs an install is a check that can quietly not run.

## The four refusals of ritual/1 (SPEC.md §1)

1. **Agents observe; humans consecrate.** `consecration.by` is a `person/` and
   nothing else; a `performer` is an `agent/`.
2. **Unwitnessed practice moves nothing.** `witnessed` needs a third party
   signing with a basis of their own; a copy of the performer's evidence is one
   source counted twice.
3. **An observance carries no value and no standing.** Money, amounts and
   scores are refused at any depth. Accrual is `reward/1`.
4. **The log is append-only.** A correction is a new `void` observance naming
   the one it supersedes.

## Commands

```bash
npm run lint    # node --check over every .mjs (tools/lint.mjs walks the tree)
npm test        # node --test test/ — conformance corpus + vendor drift
node vendor-ritual.mjs check <fragment.json>
node vendor-ritual.mjs check https://<domain>   # needs a network; nothing else here does
```

## Rules — each enforced by a test

- **The four format files are byte-identical to canon.**
  `test/vendor-drift.test.mjs`; UNKNOWN when flashyos is absent, never a pass.
- **The checker agrees with every corpus verdict**, and the documented
  pass/refuse split (23 cases: 4 valid, 19 refused) is asserted as a floor so a
  case cannot vanish silently. `test/conformance.test.mjs`.
- **Every `.mjs` parses.** `tools/lint.mjs` runs `node --check` over the tree.
- **The licence is Apache-2.0 (holder Agente Labs).** The estate register in
  flashyos `tools/estate-licences.mjs` is the authority, not a decision made
  here. `README.md`'s last line states it in those words.

## Status

Draft. Version 1 is implemented and in use in one estate; it has no independent
adopter yet, and it is not published as a standard until it does. Version 1 is
frozen — a change to what a valid document is mints `ritual/2`, never edits
version 1.

## House rules — true in every repository in this estate

**`main` is not necessarily the default branch.** Ask, every time:
`git symbolic-ref --short refs/remotes/origin/HEAD`.

**Say which branch you measured.** Reading the working tree tells you about your
checkout, not the repository.

**Re-vendor before you trust a vendored change.** Files named `vendor-*.mjs` are
byte-identical copies; a stale copy disagrees silently.

**No secret in a file, a repo, or an artifact.** Secret Manager only.

**The licence is declared once**, in `tools/estate-licences.mjs` in flashyos. Do
not decide this repository's licence inside it.

**A generated file is regenerated, never hand-edited.**

**Report what happened, including when it is worse than expected.**
