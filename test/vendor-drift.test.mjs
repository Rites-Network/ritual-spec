// Byte-identity with canon.
//
// The four files that ARE the format here — vendor-ritual.mjs, SPEC.md,
// schema/ritual-1.schema.json and conformance/corpus.json — are vendored
// byte-identical from flashyos `packages/ritual`, which is canon for
// ritual/1. This repository renders and distributes the format; it does not
// fork it, so a change to what a valid document IS is made in canon and
// re-vendored here, never edited in place.
//
// A stale copy does not fail loudly — it disagrees, silently, about whichever
// field somebody has just changed in canon. This test is the thing that makes
// the copy safe: it reads canon out of a sibling checkout and asserts every
// vendored file matches it byte for byte.
//
// When the sibling checkout is absent it reports UNKNOWN and skips — it never
// reports a pass it could not run. `node:` builtins only, no install.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CANON = join(ROOT, '..', 'flashyos', 'packages', 'ritual');

// The vendored files, at their path relative to the repository root, which is
// also their path relative to canon.
const VENDORED = [
  'vendor-ritual.mjs',
  'SPEC.md',
  'schema/ritual-1.schema.json',
  'conformance/corpus.json',
];

test('every vendored format file is byte-identical to canon (or UNKNOWN)', () => {
  if (!existsSync(CANON)) {
    console.log(
      'UNKNOWN: canon checkout flashyos/packages/ritual is absent; cannot verify byte-identity of the vendored format bundle',
    );
    return;
  }

  for (const rel of VENDORED) {
    const here = join(ROOT, rel);
    const there = join(CANON, rel);
    assert.ok(existsSync(here), `vendored file is missing here: ${rel}`);
    assert.ok(existsSync(there), `canon file is missing (checkout incomplete?): ${rel}`);
    const mine = readFileSync(here);
    const canon = readFileSync(there);
    assert.ok(
      mine.equals(canon),
      `${rel} has drifted from canon flashyos/packages/ritual — re-vendor it, never hand-edit`,
    );
  }
});
