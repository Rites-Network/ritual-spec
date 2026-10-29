# Contributing

This repository holds the `ritual/1` specification and nothing else — the
normative text, the JSON Schema, the conformance corpus and a dependency-free
checker. If what you want is a feature — a site, a renderer, a calendar of your
own — it belongs in the reference renderer,
[FlashyLabs/Rites-Network](https://github.com/FlashyLabs/Rites-Network). If what
you want changes what a valid `ritual/1` document *is*, it is a specification
change, and it is made in **canon** — flashyos `packages/ritual` — first.

## The files here are vendored, not authored

`vendor-ritual.mjs`, `SPEC.md`, `schema/ritual-1.schema.json` and
`conformance/corpus.json` are byte-identical copies of canon. Do not edit them
here: a change made in this repository is a change the next re-vendor silently
discards, and `test/vendor-drift.test.mjs` fails on any drift from canon while
a canon checkout sits beside this one.

The order a normative change is made in:

1. **Canon** (`flashyos/packages/ritual`) — state the rule in `SPEC.md`, add it
   to the schema if the shape changes, implement it in `vendor-ritual.mjs`, and
   add a corpus case that fails without it.
2. **Re-vendor here** — copy the four files across byte for byte and update the
   documented pass/refuse counts in `test/conformance.test.mjs` if the corpus
   grew or shrank.
3. **Re-vendor in Rites-Network** — the reference renderer carries the same
   four files.

## Running it

Node 22. Nothing to install.

```bash
npm run lint                                    # node --check over every .mjs
npm test                                        # node --test test/
node vendor-ritual.mjs check conformance/corpus.json   # or any fragment file
```

## What a change needs

- **A test that fails without it.** Not a test that exercises the code; one
  that would have caught the thing. A corpus case asserts the *exact* verdict —
  clean, or a problem containing a named phrase.
- **A reason in the commit message.** What was wrong, not what you did.
- **No dependencies.** `node:` builtins only, Node 22, ESM. A pull request
  adding a `dependencies` key or an install step to CI will be declined however
  good the library is.

## What will be declined

- A checker here that refuses something `SPEC.md` does not name, or accepts
  something it does — this repository is the specification, not a second one.
- Anything that lets an `agent/` consecrate, or an observance reach `witnessed`
  on the performer's own evidence.
- Any money, amount or standing vocabulary carried in the fragment — accrual is
  `reward/1`, standing is derived from what others assert.
- An edit or delete of an observance — a correction is a new `void` observance
  that supersedes the old one.
- A metrics summary served in place of the whole fragment.
- A change to the licence. It is Apache-2.0 (holder Agente Labs), declared once
  in the estate register in flashyos `tools/estate-licences.mjs`; that register
  is the authority, not a decision made in this repository.

## Commit messages

End with the attribution lines your tooling requires, if any. State the branch
you tested on if it is not the default.
