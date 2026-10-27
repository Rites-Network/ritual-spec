<!-- estate-hygiene:begin — emitted by tools/estate-hygiene-files.mjs in AgenteLabs/flashyos; regenerate, never edit -->
# Security

## Reporting a vulnerability

Report it privately, never in a public issue, pull request or chat channel.
Two routes, and both reach the same people:

- **Email michael@flashygroup.com** — the estate's one disclosure address, the same one
  published at https://flashynetwork.com/security/
  and in https://flashynetwork.com/.well-known/security.txt.
  One route across every repository is deliberate: a researcher who finds two
  addresses and picks the worse one has been failed by us, not by their choice.
- **GitHub → Security → Report a vulnerability** on this repository, which
  opens a private advisory only the maintainers can read. If that button is
  missing, private vulnerability reporting has not been enabled on this
  repository yet; use the email route and say so in the report.

Include what you found, how to reproduce it and what you believe the impact
is. Do not include real credentials, private keys or production data: nothing
here needs them to reproduce a finding.

## What to expect

| | |
|---|---|
| Acknowledgement | within 72 hours |
| An assessment, and what we are doing | agreed with you, in writing |
| Publication | a window agreed with you, never imposed |

If we miss the acknowledgement window, say so publicly. A window nobody is
held to is worse than none, because it asks a reporter to wait on a promise
that was never load-bearing.

## Supported versions

The default branch only. There is no maintained release line behind it: a
finding against the default branch is in scope, a finding against an older
tag or a fork is a reason to update.

## A committed credential is rotated, never removed

If a report is that a secret reached this repository, the fix is rotation at
the issuer. Deleting the file, rewriting history or force-pushing is not a
fix: the value is burned the moment it lands and stays burned, because
history, forks, caches and mirrors keep it. Say which secret, and we rotate
it before anything else.

## About this document

The sections above are emitted by [`tools/estate-hygiene-files.mjs`](https://github.com/AgenteLabs/flashyos/blob/main/tools/estate-hygiene-files.mjs)
in AgenteLabs/flashyos from one template the whole estate shares, and
`--check` fails when they drift.
Regenerate them; never edit them here. Anything below the marker is this
repository's own and is kept as written.
<!-- estate-hygiene:end — everything below is this repository’s own -->

## What this repository is

A specification, a JSON Schema, a conformance corpus and a checker that reads a
JSON file. It runs no service, holds no data and has no dependencies. The
checker's `check <https://domain>` command makes one outbound https request to a
domain you name, to fetch `/.well-known/ritual.json`, with a timeout and a size
cap.

## What is a vulnerability here

- A fragment the checker accepts that `SPEC.md` says is refused, or the
  reverse — in particular:
  - an observance reaching `witnessed` where the witness is the performer or
    its principal, or on a basis that merely copies the performer's evidence;
  - an observance reaching `consecrated` from an unwitnessed state, or with a
    `consecration.by` that is not a `person/` id;
  - a money, amount or standing value carried anywhere in the fragment and not
    refused;
  - an edited or deleted observance treated as valid rather than requiring a
    superseding `void`.
- `check <https://domain>` reading a network failure as a valid or an invalid
  fragment rather than as this machine's inability to reach the domain.
- A body that exceeds the size cap being read in full.
- Any input to `check` that causes code execution rather than a refusal.

## What is not

`ritual/1` is a publication format. Anyone can fetch a subject's served
fragment — that is the point. Publishing a file at a domain proves someone can
write to that host and nothing more; it is not an identity or an authorisation.
A fragment is somebody else's input: validate before you act on one.
