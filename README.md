# ritual/1

`ritual/1` is a small JSON format for an organisation's **present tense** — the
recurring, witnessed, consequence-bearing acts it *practises*, recorded in a
fragment a stranger can validate offline. `backlog/1` (a.k.a. `intent/1`) says
what an organisation intends to do; `shipped/1` says what it did; `ritual/1`
says what it keeps doing.

This repository is the format's vendor-neutral home: the specification, the
JSON Schema, the conformance corpus and a dependency-free checker, and nothing
else. **Canon lives in flashyos `packages/ritual`**; every file here that *is*
the format is a byte-identical copy of it, and [FlashyLabs/Rites-Network](https://github.com/FlashyLabs/Rites-Network)
renders it at [rites.network](https://rites.network). A change to what a valid
`ritual/1` document is is made in canon and re-vendored here, never edited in
place — `test/vendor-drift.test.mjs` fails on drift.

## Quick start

Node 22, no install.

```bash
node vendor-ritual.mjs check <fragment.json>              # ok, or names the refusal and exits 1
node vendor-ritual.mjs metrics <fragment.json>            # the counted figures beside the raw ones
node vendor-ritual.mjs check https://your-domain.example  # fetches /.well-known/ritual.json the way a stranger would
```

`check <https://domain>` needs a network; the tests do not. A failed fetch is
reported as this machine's view, never as a fact about the domain — a proxy
refusal and a down host are indistinguishable from here.

## The four refusals that outrank everything else

Quoted from `SPEC.md` §1. Each is enforced in the checker *and* in the
transition functions, so a caller who builds a fragment in memory and never
validates it cannot climb the ladder by assertion.

**1 · Agents observe; humans consecrate.** A `performer` is an `agent/` acting
`for` an `org/` or `person/`; `consecration.by` is a `person/` and nothing
else. There is no code path by which an agent approves an observance into
consequence.

**2 · Unwitnessed practice moves nothing.** `witnessed` needs a party who is
neither the performer nor its principal, signing with a basis of their own — a
copy of the performer's evidence is one source counted twice. Consecrating an
unwitnessed observance is refused outright.

**3 · An observance carries no value and no standing.** Money words, amounts
and scores are refused at any depth. Accrual belongs in `reward/1`; standing is
derived from what others assert, never carried by the act.

**4 · The log is append-only.** A correction is a new `void` observance naming
the one it supersedes. Nothing is edited; nothing is deleted.

## The anti-metric

Raw observance volume is the number a faucet inflates. `metrics()` ships
`witnessed` and `consecrated` *with* the raw count, and `project()` carries a
note a renderer may not drop — how many observances actually carry consequence,
so a big raw number cannot be read as a big real one. A subject serves its
*whole* fragment at `/.well-known/ritual.json`, never a metrics summary: a
summary strips the evidence URLs a stranger checks and hands them the
flattering digits, which is the anti-metric rule run backwards.

## Layout

| Path | What lives there |
|---|---|
| `SPEC.md` | The normative specification: the four refusals, the shape, the state ladder, the transitions, serving. |
| `schema/ritual-1.schema.json` | JSON Schema (draft 2020-12) for the fragment shape. Schema-valid is well-formed, not necessarily permitted — the cross-field rules live in the checker. |
| `vendor-ritual.mjs` | The dependency-free checker and transition kit: `checkFragment`, `observe`/`witness`/`consecrate`, `metrics`/`project`, and the CLI. `node:` builtins only. |
| `conformance/corpus.json` | The conformance vectors: 23 cases, 4 valid and 19 refused, each naming the rule it exercises and (for a refusal) the phrase its problem must contain. |
| `test/conformance.test.mjs` | `node --test`: runs the checker over every corpus case and asserts the documented pass/refuse split. |
| `test/vendor-drift.test.mjs` | `node --test`: asserts every vendored file is byte-identical to canon; UNKNOWN (skips) when the canon checkout is absent. |
| `tools/lint.mjs` | `node --check` over every `.mjs` in the tree. |
| `flashyos.roles.json`, `directory.fragment.json`, `MESH.md` | This property's AAO charter and its `directory/1` node. |

## Links

- **Canon:** flashyos `packages/ritual` — the source the four format files here are vendored from, byte for byte.
- **Reference renderer:** [FlashyLabs/Rites-Network](https://github.com/FlashyLabs/Rites-Network) — renders the format at [rites.network](https://rites.network), keeps its own `ritual/1` calendar, and vendors the same four files.
- **Sibling estate standards:** `intent/1` (a subject's future tense — what it intends to do next; [FlashyLabs/intent-spec](https://github.com/FlashyLabs/intent-spec)), `shipped/1` (the past tense, sealed), `aao/0.1` (the Agentic Autonomous Organisation charter). Each is a separate format with its own repository; `ritual/1` is the present tense beside them and imports none of their vocabulary.

## Coupling to value

Deliberately absent. When a consecrated observance should accrue an
entitlement, write a `reward/1` entry whose `basis` is the observance's
evidence URL. The caps, the venue refusal and the payability rules all live
there — never in `ritual/1`. See `SPEC.md` §4.

## Status

Draft. Version 1 is implemented and in use in one estate (rites.network keeps
the reference calendar); it has **no independent adopter yet**, and it is not
published as a standard until it does. Version 1 is frozen: the document shape
under `ritual/1` does not change — a change to what a valid document is mints
`ritual/2`, never edits version 1.

The vendored file travels by copy, so being unpublished as a package costs an
adopter nothing: copy `vendor-ritual.mjs` and run it with bare Node.

Licensed under Apache-2.0 (holder Agente Labs); the estate register in flashyos `tools/estate-licences.mjs` is the authority.
