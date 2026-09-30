# Security

## Reporting

Email **security@flashylabs** — this is the estate's private channel and the
address is to be confirmed before launch; if it does not resolve, open an issue
that says only "security report, please contact me" and a maintainer will reach
out privately. Do not put the finding in the issue.

Include what you found, how to reproduce it, and what you think the impact is.
No formal disclosure timeline is promised; one will be agreed with you rather
than imposed.

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
