# ritual/1 — the present tense

Status: **draft**. The estate keeps two tenses already — `backlog/1` is the
future and `shipped/1` is the past — and `docs/tenses.md` explains why they
are shaped differently on purpose. This format is the tense between them:
the recurring, witnessed, consequence-bearing act, happening now, on a
rhythm a stranger can check.

## 0 · Why a third tense

An intention decays unless somebody restates it. A fact about the past is
sealed and never decays. Neither shape fits a practice: a practice is neither
a plan nor a record — it is a rhythm, and its evidence is that the rhythm
holds. A repository whose emitters refresh its fragments every day is
*practising* something; today the estate can only see that practice by its
side effects. ritual/1 gives the practice a first-class record.

The word is chosen deliberately. Ritual is the oldest coordination
technology there is: a prescribed act, performed on a shared calendar, whose
performance is legible to others and whose meaning is conferred by a
community rather than claimed by the performer. Every clause of that
sentence appears below as a validation rule.

## 1 · The four refusals that outrank everything else here

**Agents observe; humans consecrate.** A `performer` is an `agent/` id
acting `for` an `org/` or `person/` who answers — the work layer's own
doctrine, inherited verbatim. A `consecration.by` is a `person/` id and
nothing else. There is no code path by which an agent approves an
observance into consequence, for the same reason there is no argument that
makes `directoryService` write an approved fact: an agent that could
consecrate its own observance would make the consent layer decorative.

**Unwitnessed practice moves nothing.** An observance reaches `witnessed`
only when a party who is neither the performer nor its principal signs it —
and signs with a basis of their **own**. A witness whose basis is a copy of
the performer's evidence is the citation loop `estate-coherence` fails
fragments for, rebuilt one level down: one source, counted twice, looking
like corroboration. Consecrating an unwitnessed observance is refused
outright; `consecrate()` has no flag, argument or caller that skips the
witness.

That rule was stated here, and in a comment beside the code, and **enforced
nowhere** until 4 September 2026: the checker asked only that a basis be an
HTTPS URL, so a witness whose basis was byte-identical to the performer's
evidence validated clean. The corpus even carried a case named for the
copy — and that case tested an *absent* basis, so the name told every reader
the rule was covered while nothing exercised it. Exact equality is refused
now, in the validator rather than in `witness()`, because a caller that
builds a fragment in memory and never validates it must still be unable to
construct one. Exact equality only: a different URL is a different page, and
guessing at near-copies would refuse honest witnesses. Whether two witnesses
across an estate lean on **one** basis is a cross-fragment question no
single-fragment checker can see, and it is the estate tool's half.

**An observance carries no value and no standing.** The money vocabulary is
refused at any depth (the `holding/1` and `reward/1` rule), and so are
`amount`, `aurum`, `gold`, `reward`, `points` and `payout`. Standing words —
`streak`, `rank`, `score`, `level` — are refused as derived-only, because
standing comes from what *others* assert about sealed outcomes and never
from unilateral activity (the magician doctrine). Accrual against
consecrated observances belongs in `reward/1`, where the caps live; keeping
the two formats apart means the coupling has to be *written* by somebody
rather than merely permitted. An observance that could carry its own reward
is a slot machine with liturgical vocabulary.

**The log is append-only.** A correction is a new observance whose
`supersedes` names the old one and whose state is `void`. Nothing is edited;
nothing is deleted. A void that names nothing is a deletion with better
manners, and the validator says so.

## 2 · The shape

A fragment is one subject's calendar: the liturgies it publishes and the
observances performed against them.

```json
{
  "contract": "ritual/1",
  "subject": "org/ritualos",
  "generated": "2026-09-01T06:00:00Z",
  "liturgies": [
    {
      "id": "daily-office",
      "title": "The Daily Office",
      "cadence": "daily",
      "rite": ["refresh the fragment", "seal the log", "dispatch to the merge"],
      "published_by": "person/michael",
      "since": "2026-09-01T00:00:00Z"
    }
  ],
  "observances": [
    {
      "id": "obs-2026-09-01-flashyos",
      "liturgy": "daily-office",
      "performer": "agent/flashyos-ci",
      "for": "org/flashyos",
      "at": "2026-09-01T04:23:00Z",
      "recorded": "2026-09-01T04:23:07Z",
      "evidence": "https://github.com/FlashyLabs/flashyos/actions/runs/17284",
      "state": "witnessed",
      "witness": {
        "by": "org/gda-capital",
        "basis": "https://gda.group/.well-known/flashyos-directory.json",
        "at": "2026-09-01T05:00:00Z"
      }
    }
  ]
}
```

### A liturgy

| Field | Rule |
|---|---|
| `id` | Unique within the fragment |
| `title` | Required — a name a person recognises |
| `cadence` | One of `daily`, `weekly`, `monthly`, `seasonal`, `once`. A closed list, so a new rhythm is a decision |
| `rite` | A non-empty list of steps. A liturgy with no rite is a name with no practice |
| `published_by` | A `person/` id. Publishing a liturgy asks agents to act, and a person answers for the asking |
| `since` | ISO timestamp |

### An observance

| Field | Rule |
|---|---|
| `id` | Unique within the fragment — append-only, a correction is a new observance |
| `liturgy` | Must name a liturgy in this fragment. An observance of nothing is activity, not practice |
| `performer` | An `agent/` id. A person's own act is work, recorded in `shipped/1`; ritual/1 records what agents observe |
| `for` | An `org/` or `person/` id — the principal who answers |
| `at` / `recorded` | ISO timestamps; `recorded` may not precede `at` (the `holding/1` lag rule) |
| `evidence` | An `https://` URL a stranger can open. Without one the observance is a claim, and this format does not carry claims |
| `state` | `performed` → `witnessed` → `consecrated`, or `void`. No state is skippable upward, and a `performed` observance carrying witness or consecration blocks is refused — the ladder is climbed by transition, never by assertion |
| `witness` | Required from `witnessed` up: `{ by, basis, at }`. `by` is an `org/` or `person/` that is neither the performer nor its principal; `basis` is the witness's **own** `https://` URL |
| `consecration` | Required at `consecrated`: `{ by, at }`. `by` is a `person/` id |
| `supersedes` | Required when `void`; must name another observance in this log |

## 3 · The transitions

The package (and the vendored copy — they are the same file) exposes the
ladder as functions, each of which re-validates the whole fragment and
refuses on any problem:

- `observe(fragment, observance)` — the only door in. Arrives `performed`;
  passing `state`, `witness` or `consecration` throws.
- `witness(fragment, id, { by, basis, at })` — a second party signs.
  Self-witness throws.
- `consecrate(fragment, id, { by, at })` — a named human confers
  consequence. A non-`person/` id throws; an unwitnessed observance throws.

Each returns a **new** fragment. Nothing mutates.

## 4 · What version 1 refuses to carry

No money, no amounts, no scores — see §1. When a consecrated observance is
to accrue anything, the accrual is a `reward/1` entry whose `basis` is the
observance's evidence URL, written by an integration a human chose to build.
The two fragments then say, between them, exactly what happened: an act,
witnessed, consecrated, and *separately* an entitlement, capped and
unpayable until a venue exists. Neither format can tell the story alone,
and that is the design.

## 5 · Metrics, and the anti-metric

`metrics()` ships `witnessed` and `consecrated` **with** the raw count so a
renderer cannot take the flattering number alone. Raw observance volume is
the anti-metric: it is the number a faucet inflates, and any surface showing
it without the witnessed share beside it is the failure this format exists
to refuse. `project()` carries a note a renderer may not drop, stating how
many observances carry consequence.

## 6 · Serving

A practising subject serves its fragment — whole and verbatim — at
`/.well-known/ritual.json`. One path, one spelling, exported as
`WELL_KNOWN` by the reference implementation so no consumer retypes it.
The surface is the fragment and never a derived summary: a summary strips
the evidence URLs a stranger verifies and keeps the flattering digits,
which is §5's rule run backwards. `node vendor-ritual.mjs check
<https://domain>` fetches and validates the served copy the way a stranger
would, and is the only check that can tell a committed calendar from a
served one.

## 7 · What this is not, yet

No sealing, no checkpoint leaves, no epochs beyond the cadence word, no
federation of witnesses across fragments, and no publication of this
package. The estate's rule applies: **publication on the first adopter,
never before.** The vendored file travels by copy, which is how every
record format here actually travels, so being unpublished costs an adopter
nothing. Sealing (so an observance can become a `checkpoint/1` leaf) is the
first candidate for version 2, and it will reuse the shared
canonicalisation in `@flashyos/verify` rather than restating it — sealing
rules are shared, never restated.
