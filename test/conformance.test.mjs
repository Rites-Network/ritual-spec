// The conformance corpus, run against the vendored checker.
//
// `conformance/corpus.json` is the executable specification: every case names
// the rule it exercises. An `ok` case must validate clean; a `reject` case
// must produce a problem whose text contains the case's `expect` phrase —
// matched on a distinctive phrase rather than an exact string, so wording can
// improve without the corpus going stale, and never on a problem COUNT, which
// would pass for the wrong reason. A non-JS implementation proves itself by
// agreeing with every verdict here.
//
// This suite is self-contained: the corpus and the checker are both vendored
// into this repository, so it needs no sibling checkout and no network. It
// asserts the documented pass/refuse split as a floor, so a case silently
// vanishing from the corpus is a failure rather than a smaller green run.
//
// `node:` builtins only, no install.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { checkFragment } from '../vendor-ritual.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const corpus = JSON.parse(readFileSync(join(ROOT, 'conformance', 'corpus.json'), 'utf8'));

// The documented split, measured from the corpus as vendored on 2026-09-30.
// A change to canon that adds or removes a case re-vendors the corpus AND
// updates these numbers; the drift test catches the re-vendor, these catch a
// case quietly disappearing.
const EXPECTED_TOTAL = 23;
const EXPECTED_OK = 4;
const EXPECTED_REJECT = 19;

test('the corpus has the documented shape', () => {
  assert.ok(Array.isArray(corpus.cases), 'corpus.cases is not an array');
  const ok = corpus.cases.filter((c) => c.verdict === 'ok');
  const reject = corpus.cases.filter((c) => c.verdict === 'reject');
  const verdicts = new Set(corpus.cases.map((c) => c.verdict));

  assert.deepEqual([...verdicts].sort(), ['ok', 'reject'], 'unexpected verdict value in the corpus');
  assert.equal(corpus.cases.length, EXPECTED_TOTAL, 'corpus case count changed');
  assert.equal(ok.length, EXPECTED_OK, 'ok-case count changed');
  assert.equal(reject.length, EXPECTED_REJECT, 'reject-case count changed');

  // Every reject case carries the phrase the refusal must contain — a reject
  // with no `expect` would pass on any problem at all, including the wrong one.
  for (const c of reject) {
    assert.equal(typeof c.expect, 'string', `reject case "${c.name}" has no expect phrase`);
    assert.ok(c.expect.length > 0, `reject case "${c.name}" has an empty expect phrase`);
  }
});

test('the vendored checker agrees with every corpus verdict', () => {
  let ok = 0;
  let reject = 0;
  for (const c of corpus.cases) {
    const problems = checkFragment(c.fragment);
    if (c.verdict === 'ok') {
      ok++;
      assert.deepEqual(problems, [], `expected "${c.name}" to validate clean, got:\n  ${problems.join('\n  ')}`);
    } else {
      reject++;
      assert.ok(problems.length > 0, `expected "${c.name}" to be refused, but it validated clean`);
      assert.ok(
        problems.join(' | ').includes(c.expect),
        `"${c.name}" was refused, but no problem contained "${c.expect}":\n  ${problems.join('\n  ')}`,
      );
    }
  }
  // The counts the run actually exercised, not the ones declared above — proof
  // the loop measured every case rather than short-circuiting.
  assert.equal(ok, EXPECTED_OK, 'fewer ok cases were exercised than expected');
  assert.equal(reject, EXPECTED_REJECT, 'fewer reject cases were exercised than expected');
});
