# Repository Guidelines

This repo is a **standard**, not an application. It answers one question: can this version go live?

## What belongs here

- Dimensions with stable gate ids
- `catalog.json` / `gates.json` / generated `STATUS.md`
- Examples that map a real ship onto ids
- Checks that fail on missing ids, missing changelog sections, uncited block gates, dead links, and secrets

## What does not belong here

- Secrets, live env files, installer binaries, host addresses
- How-to-write-code practices (those live in [build-standard](https://github.com/miounet11/build-standard))
- Whether an insight became a citable law (that lives in [creativity-is-engineering](https://github.com/miounet11/creativity-is-engineering))
- New dimensions named observe / secrets / rollback / host / compat

## How to add a dimension

See [CONTRIBUTING.md](./CONTRIBUTING.md). First commit should make `npm run verify` red.

## Voice

One question per repo. Cite gate ids. Lead with what is true.
