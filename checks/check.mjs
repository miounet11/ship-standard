#!/usr/bin/env node
// Self-check for this standard repo. The standard must pass its own doc-system gates.
import { readFile, readdir, stat } from 'node:fs/promises';
import { join, dirname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const failures = [];
const warnings = [];

const fail = (code, msg) => failures.push(`${code}: ${msg}`);
const warn = (code, msg) => warnings.push(`${code}: ${msg}`);

async function readText(p) {
  return readFile(join(ROOT, p), 'utf8');
}

async function listFiles(dir = '.', acc = []) {
  const entries = await readdir(join(ROOT, dir), { withFileTypes: true });
  for (const e of entries) {
    if (e.name.startsWith('.') || e.name === 'node_modules') continue;
    const rel = dir === '.' ? e.name : `${dir}/${e.name}`;
    if (e.isDirectory()) await listFiles(rel, acc);
    else acc.push(rel);
  }
  return acc;
}

const catalog = JSON.parse(await readText('catalog.json'));
const gatesDoc = JSON.parse(await readText('gates.json'));
const pkg = JSON.parse(await readText('package.json'));
const dimensionIds = new Set(catalog.dimensions.map((d) => d.id));
const byId = new Map(gatesDoc.gates.map((g) => [g.id, g]));

for (const d of catalog.dimensions) {
  try {
    await stat(join(ROOT, d.path));
  } catch {
    fail('CATALOG-MISSING', `catalog lists ${d.path} but the file does not exist`);
  }
}

if (catalog.version !== gatesDoc.version) {
  fail('VERSION-DRIFT', `catalog.json ${catalog.version} != gates.json ${gatesDoc.version}`);
}
if (pkg.version !== gatesDoc.version) {
  fail('VERSION-DRIFT', `package.json ${pkg.version} != gates.json ${gatesDoc.version}`);
}

const changelog = await readText('CHANGELOG.md');
if (!changelog.includes(`## ${catalog.version}`)) {
  fail('VERSION-CHANGELOG', `CHANGELOG.md has no section ## ${catalog.version}`);
}

const stageNames = new Set(Object.keys(gatesDoc.stages));
for (const [level, def] of Object.entries(gatesDoc.levels)) {
  if (!/^L[0-3]$/.test(level)) fail('LEVEL-NAME', `unexpected level ${level}`);
  for (const s of def.stages) {
    if (!stageNames.has(s)) fail('LEVEL-STAGE', `${level} references unknown stage ${s}`);
  }
}
if (gatesDoc.levels.L3.stages.length !== stageNames.size) {
  fail('LEVEL-COVERAGE', 'L3 must cover every stage, otherwise some gates never block');
}
for (const d of catalog.dimensions) {
  const applies = gatesDoc.applies[d.id];
  if (!applies) fail('APPLIES-MISSING', `gates.json applies has no entry for dimension ${d.id}`);
  else if (!['all', 'opt-in'].includes(applies)) {
    fail('APPLIES-VALUE', `${d.id} applies must be "all" or "opt-in", got "${applies}"`);
  }
}
for (const id of gatesDoc.nonWaivable) {
  const g = byId.get(id);
  if (!g) fail('NONWAIVABLE-ORPHAN', `nonWaivable lists ${id}, which is not a gate`);
  else if (g.deprecated) fail('NONWAIVABLE-DEPRECATED', `nonWaivable lists deprecated ${id}`);
}

const coveredStages = new Set(Object.values(gatesDoc.levels).flatMap((l) => l.stages));
for (const g of gatesDoc.gates) {
  if (!coveredStages.has(g.stage)) {
    fail('GATE-UNREACHABLE', `${g.id} has stage ${g.stage}, which no level includes`);
  }
}

const seen = new Set();
for (const g of gatesDoc.gates) {
  if (seen.has(g.id)) fail('GATE-DUP', `duplicate gate id ${g.id}`);
  seen.add(g.id);
  if (!dimensionIds.has(g.dimension)) {
    fail('GATE-ORPHAN', `${g.id} points at unknown dimension "${g.dimension}"`);
    continue;
  }
  if (!gatesDoc.severities[g.severity]) fail('GATE-SEVERITY', `${g.id} has unknown severity ${g.severity}`);
  if (!gatesDoc.stages[g.stage]) fail('GATE-STAGE', `${g.id} has unknown stage ${g.stage}`);
  if (g.deprecated && !g.supersededBy) fail('GATE-DEPRECATED', `${g.id} is deprecated without supersededBy`);
  const doc = await readText(`dimensions/${g.dimension}.md`);
  if (!doc.includes(g.id)) {
    fail('GATE-UNDOCUMENTED', `${g.id} is in gates.json but not written in dimensions/${g.dimension}.md`);
  }
}

for (const d of catalog.dimensions) {
  const doc = await readText(d.path);
  const items = doc.split('\n').filter((l) => /^- \[[ x]\]/.test(l));
  for (const line of items) {
    if (!/`[A-Z]+-\d+`/.test(line)) {
      fail('GATE-UNNUMBERED', `${d.path}: checklist item without gate id -> ${line.trim().slice(0, 60)}`);
    } else {
      const id = line.match(/`([A-Z]+-\d+)`/)[1];
      if (!seen.has(id)) fail('GATE-UNREGISTERED', `${d.path}: ${id} is not in gates.json`);
      if (byId.get(id)?.deprecated) {
        fail('GATE-DEPRECATED-ACTIVE', `${d.path}: active checklist cites deprecated ${id}`);
      }
    }
  }
}

const allFiles = await listFiles();
const mdFiles = allFiles.filter((f) => f.endsWith('.md'));
const exampleFiles = allFiles.filter((f) => f.startsWith('examples/') && !f.includes('.template.'));

const localPrefixes = new Set([...seen].map((id) => id.split('-')[0]));
const cited = new Set();
for (const f of exampleFiles) {
  const text = await readText(f);
  for (const m of text.matchAll(/`([A-Z]+-\d+)`/g)) {
    const id = m[1];
    if (seen.has(id)) {
      cited.add(id);
      continue;
    }
    if (localPrefixes.has(id.split('-')[0])) {
      fail('GATE-UNREGISTERED', `${f}: cites unregistered ${id}`);
    }
  }
}

for (const g of gatesDoc.gates) {
  if (g.deprecated) continue;
  if (g.severity !== 'block') continue;
  if (g.evidence === 'none') continue;
  if (!cited.has(g.id)) {
    fail('GATE-UNCITED', `${g.id} is an active block gate with no example citation`);
  }
}

const readme = await readText('README.md');
if (!/build-standard/.test(readme) || !/creativity-is-engineering/.test(readme)) {
  fail('DOC-1', 'README.md must name build-standard and creativity-is-engineering');
}
if (!catalog.related?.['ability-harness'] || !catalog.related?.['review-harness']) {
  fail('RELATED-MISSING', 'catalog.related must name ability-harness and review-harness');
}
if (!/ability-harness/.test(readme) || !/review-harness/.test(readme)) {
  fail('RELATED-MISSING', 'README.md must name ability-harness and review-harness');
}

for (const f of mdFiles) {
  if (/最新|latest-version|FINAL/i.test(f)) {
    fail('DOC-5', `file name suggests a moving target: ${f}`);
  }
  const text = await readText(f);

  const headings = text.split('\n').filter((l) => /^##\s+\S/.test(l)).map((l) => l.trim());
  const dupes = headings.filter((h, i) => headings.indexOf(h) !== i);
  if (dupes.length) fail('DOC-DUP-HEADING', `${f}: repeated heading ${[...new Set(dupes)].join(', ')}`);

  for (const line of text.split('\n')) {
    if (/^#{1,6}\s.*最新/.test(line)) fail('DOC-5', `${f}: heading claims 最新 -> ${line.trim()}`);
  }

  for (const m of text.matchAll(/\[[^\]]*\]\((\.\.?\/[^)#\s]+)/g)) {
    const target = resolve(dirname(join(ROOT, f)), m[1]);
    try {
      await stat(target);
    } catch {
      fail('LINK-DEAD', `${f}: dead relative link ${m[1]}`);
    }
  }

  if (/\b(sk-[A-Za-z0-9]{16,}|AKIA[0-9A-Z]{12,}|ghp_[A-Za-z0-9]{20,})\b/.test(text)) {
    fail('SECRET', `${f}: looks like a credential`);
  }
  if (/\b\d{1,3}(\.\d{1,3}){3}\b/.test(text) && !/0\.0\.0\.0|127\.0\.0\.1/.test(text)) {
    warn('HOST-IN-DOC', `${f}: contains a bare IP address`);
  }
}

try {
  const status = await readText('STATUS.md');
  if (!/Generated by/.test(status)) fail('DOC-2', 'STATUS.md is missing the generated banner');
  if (!status.includes(catalog.version)) {
    fail('DOC-2', `STATUS.md does not show catalog version ${catalog.version} — run npm run status`);
  }
} catch {
  fail('DOC-2', 'STATUS.md is missing — run npm run status');
}

const rel = (p) => relative(process.cwd(), p) || '.';
const active = gatesDoc.gates.filter((g) => !g.deprecated);
console.log(`ship-standard self-check (${rel(ROOT)})`);
console.log(`  dimensions: ${catalog.dimensions.length}`);
console.log(`  gates:      ${gatesDoc.gates.length} (${active.length} active, ${gatesDoc.gates.length - active.length} deprecated)`);
console.log(`  markdown:   ${mdFiles.length}`);
console.log(`  cited:      ${cited.size} ids in examples`);

for (const w of warnings) console.log(`  warn  ${w}`);
for (const f of failures) console.log(`  FAIL  ${f}`);

if (failures.length) {
  console.log(`\n${failures.length} blocking problem(s).`);
  process.exit(1);
}
console.log(`\nall gates green${warnings.length ? ` (${warnings.length} warning)` : ''}.`);
