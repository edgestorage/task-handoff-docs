#!/usr/bin/env node
// Validate the published skill between its sources, the built release, and the install guides:
//   - `docs/public/.well-known/skills/` is flat: SKILL.md plus references/*.md, and the release
//     version is injected at build time (the source must not pin one)
//   - the built `index.json` lists every published file with matching sha256 digests and a
//     `<date>-<content-hash>` release label, and the built `SKILL.md` is the source plus only the
//     injected `metadata.version` line
//   - every relative link in SKILL.md and references/ resolves, and every reference is linked
//     from SKILL.md (no orphan modules)
//   - both install guides download exactly the published files
// Runs as part of `npm run docs:build`, after the release is built into the site output.
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const skillName = "taskhandoff";
const sourceDirectory = path.join("docs", "public", ".well-known", "skills");
const releaseDirectory = path.join("docs", ".vitepress", "dist", ".well-known", "skills");
const guides = ["docs/zh/guide/thctl-skill.md", "docs/en/guide/thctl-skill.md"];
const versionPattern = /^\d{8}-[0-9a-f]{12}$/;
const problems = [];

function fail(message) {
  problems.push(message);
}

function listFiles(base, relative = "") {
  const files = [];
  for (const entry of fs.readdirSync(path.join(base, relative), { withFileTypes: true })) {
    const next = relative ? `${relative}/${entry.name}` : entry.name;
    if (entry.isDirectory()) files.push(...listFiles(base, next));
    else files.push(next);
  }
  return files.sort();
}

function readFile(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function sha256(file) {
  return createHash("sha256").update(fs.readFileSync(file)).digest("hex");
}

function frontmatter(contents) {
  const block = /^---\r?\n([\s\S]*?)\r?\n---/.exec(contents);
  if (!block) return undefined;
  const values = {};
  let section;
  for (const rawLine of block[1].split(/\r?\n/)) {
    if (!rawLine.trim() || rawLine.trim().startsWith("#")) continue;
    const indent = rawLine.length - rawLine.trimStart().length;
    const trimmed = rawLine.trim();
    if (indent === 0) {
      const top = /^([A-Za-z0-9_-]+):\s*(.*)$/.exec(trimmed);
      section = top && !top[2] ? top[1] : undefined;
      if (top && top[2]) values[top[1]] = top[2].replace(/^"|"$/g, "");
      continue;
    }
    if (section !== "metadata") continue;
    const nested = /^([A-Za-z0-9_-]+):\s*(.*)$/.exec(trimmed);
    if (nested && nested[2]) values[`metadata.${nested[1]}`] = nested[2].replace(/^"|"$/g, "");
  }
  return values;
}

// The published layout must stay flat: thctl resolves `files` against the index directory.
const sourceFiles = listFiles(path.join(root, sourceDirectory));
for (const file of sourceFiles) {
  if (file === "SKILL.md" || /^references\/[^/]+\.md$/.test(file)) continue;
  fail(`${sourceDirectory}/${file} is not publishable; only SKILL.md and references/*.md are allowed at the skills root`);
}
if (!sourceFiles.includes("SKILL.md")) fail(`${sourceDirectory}/SKILL.md is missing`);

const sourceSkill = readFile(`${sourceDirectory}/SKILL.md`);
const sourceMetadata = frontmatter(sourceSkill);
if (!sourceMetadata) fail(`${sourceDirectory}/SKILL.md has no frontmatter`);
else {
  if (sourceMetadata.name !== skillName) fail(`${sourceDirectory}/SKILL.md frontmatter name is ${JSON.stringify(sourceMetadata.name)}, expected ${JSON.stringify(skillName)}`);
  if (!sourceMetadata.description) fail(`${sourceDirectory}/SKILL.md frontmatter needs a description`);
  if (sourceMetadata["metadata.version"]) fail(`${sourceDirectory}/SKILL.md must not pin metadata.version; the release label is injected at build time`);
}

// Relative links must resolve inside the skill.
for (const file of sourceFiles.filter((candidate) => candidate.endsWith(".md"))) {
  const contents = readFile(`${sourceDirectory}/${file}`);
  for (const match of contents.matchAll(/\]\((\.[^)\s]*)\)/g)) {
    const target = match[1].split("#")[0];
    if (!target) continue;
    const resolved = path.posix.normalize(path.posix.join(path.posix.dirname(file), target));
    if (resolved.startsWith("..")) fail(`${file} links outside the skill directory: ${target}`);
    else if (!sourceFiles.includes(resolved)) fail(`${file} links to missing file: ${target}`);
  }
}

// Every reference module must be reachable from the entry point.
for (const file of sourceFiles.filter((candidate) => candidate.startsWith("references/") && candidate.endsWith(".md"))) {
  if (!sourceSkill.includes(file)) fail(`${file} is not linked from SKILL.md`);
}

// The built release must match the sources and be internally consistent.
let entry;
try {
  const document = JSON.parse(readFile(`${releaseDirectory}/index.json`));
  const entries = Array.isArray(document.skills) ? document.skills : [];
  if (entries.length !== 1) fail(`index.json must publish exactly one skill, found ${entries.length}`);
  entry = entries.find((candidate) => candidate.name === skillName);
  if (!entry) fail(`index.json has no ${JSON.stringify(skillName)} entry`);
} catch (error) {
  fail(`cannot read ${releaseDirectory}/index.json (${error.message}); run \`npm run docs:build\``);
}

if (entry) {
  if (!versionPattern.test(String(entry.version))) {
    fail(`index.json version ${JSON.stringify(entry.version)} must look like <yyyymmdd>-<12 hex content hash>`);
  }
  const published = [...(entry.files ?? [])].sort();
  for (const file of sourceFiles.filter((candidate) => !published.includes(candidate))) fail(`index.json is missing ${file}`);
  for (const file of published.filter((candidate) => !sourceFiles.includes(candidate))) fail(`index.json lists ${file}, which is not a source file`);
  for (const file of sourceFiles.filter((candidate) => published.includes(candidate))) {
    const digest = sha256(path.join(root, releaseDirectory, ...file.split("/")));
    if (entry.integrity?.[file] !== digest) fail(`index.json integrity does not match the built ${file} (run \`npm run docs:build\`)`);
    if (file !== "SKILL.md" && digest !== sha256(path.join(root, sourceDirectory, ...file.split("/")))) {
      fail(`the built ${file} is stale (run \`npm run docs:build\`)`);
    }
  }
  const builtMetadata = frontmatter(readFile(`${releaseDirectory}/SKILL.md`));
  if (builtMetadata?.["metadata.version"] !== entry.version) {
    fail(`${releaseDirectory}/SKILL.md metadata.version is ${JSON.stringify(builtMetadata?.["metadata.version"])} but index.json publishes ${JSON.stringify(entry.version)}`);
  }
  // The published body must be the source plus nothing but the injected version line; a stale or
  // mismatched copy would otherwise publish the wrong text under a fresh label.
  const builtSkill = readFile(`${releaseDirectory}/SKILL.md`);
  const injectedVersion = /^metadata:\n  version: "[^"\n]+"\n/m;
  if (!injectedVersion.test(builtSkill)) {
    fail(`${releaseDirectory}/SKILL.md has no injected metadata.version line (run \`npm run docs:build\`)`);
  } else if (builtSkill.replace(injectedVersion, "") !== sourceSkill) {
    fail(`the built ${releaseDirectory}/SKILL.md body differs from ${sourceDirectory}/SKILL.md (run \`npm run docs:build\`)`);
  }
}

// Both install guides must download exactly what the release publishes.
for (const guide of guides) {
  let contents;
  try {
    contents = readFile(guide);
  } catch {
    fail(`${guide} is missing`);
    continue;
  }
  const loop = /for\s+\w+\s+in\s+([\s\S]*?);\s*do/.exec(contents);
  if (!loop) {
    fail(`${guide} has no download loop to compare against index.json`);
  } else {
    const downloadList = loop[1].replace(/\\\r?\n/g, " ").split(/\s+/).filter(Boolean).sort();
    for (const file of sourceFiles.filter((candidate) => !downloadList.includes(candidate))) fail(`${guide} does not download ${file}`);
    for (const file of downloadList.filter((candidate) => !sourceFiles.includes(candidate))) fail(`${guide} downloads ${file}, which is not a published file`);
  }
  // Published paths are `/.well-known/skills/<file>`; a nested `/taskhandoff/...` path is the bug
  // this check exists to catch, because thctl resolves files against the index directory.
  for (const match of contents.matchAll(/\/\.well-known\/skills\/([A-Za-z0-9._-]+)(?:\/([A-Za-z0-9._/-]+))?/g)) {
    const [, head, tail] = match;
    if (tail === undefined) {
      if (head !== "index.json" && !sourceFiles.includes(head)) fail(`${guide} links to ${head}, which is not a published file`);
    } else if (head === skillName) {
      fail(`${guide} uses the nested ${skillName}/ layout; thctl resolves files against the index directory, so they must be published flat`);
    } else if (!sourceFiles.includes(`${head}/${tail}`)) {
      fail(`${guide} links to ${head}/${tail}, which is not a published file`);
    }
  }
}

if (problems.length) {
  console.error(`check-skill-docs: ${problems.length} problem(s)`);
  for (const problem of problems) console.error(`  - ${problem}`);
  process.exit(1);
}
console.log(`check-skill-docs: ${skillName} ${entry.version} is consistent (${sourceFiles.length} files, ${guides.length} install guides)`);
