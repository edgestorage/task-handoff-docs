#!/usr/bin/env node
// Build the published `taskhandoff` skill release into the site output directory.
//
// `SKILL.md` and `references/*.md` are tracked sources. The release identity and `index.json` are
// generated here and never committed:
//
//   version = <last-change-date>-<content-hash-12>   e.g. `20261005-339d63f220cd`
//
// The date is the day the skill last changed in git, so docs-only commits do not produce a new
// release; the hash covers the published content, so the same content always yields the same
// label and any edit yields a new one. `thctl` decides whether to update by comparing the
// published content digests with the installed copy, so the label does not need to be ordered.
//
// Files must stay flat next to `index.json` (`.well-known/skills/SKILL.md`, `.well-known/skills/references/*.md`):
// `thctl` resolves every `files` entry against the index URL's own directory.
//
// Run through `npm run docs:build` (which builds the site first) or `npm run skills:index`.
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const skillName = "taskhandoff";
const sourceDirectory = path.join("docs", "public", ".well-known", "skills");
const releaseDirectory = path.join(root, "docs", ".vitepress", "dist", ".well-known", "skills");
const indexFile = "index.json";
const description = "Operate TaskHandoff Control Plane through thctl, with feature workflows under references/";
// Minimum CLI that implements `thctl skill install|update`. Older CLIs ignore the field when
// reading the index, but refuse to install releases that require a newer thctl.
const thctlRange = ">=0.0.36";
// Placeholder substituted for `metadata.version` while hashing, so injecting the release label is
// not itself a content change (the hash must be stable across rebuilds).
const versionPlaceholder = "release";

function listFiles(directory, relative = "") {
  const files = [];
  for (const entry of fs.readdirSync(path.join(directory, relative), { withFileTypes: true })) {
    const next = relative ? `${relative}/${entry.name}` : entry.name;
    if (entry.isDirectory()) files.push(...listFiles(directory, next));
    else files.push(next);
  }
  return files.sort();
}

/** Locate the `metadata.version` line inside the YAML frontmatter, with absolute offsets. */
function locateMetadataVersion(contents) {
  const block = /^---\r?\n([\s\S]*?)\r?\n---/.exec(contents);
  if (!block) return undefined;
  let inMetadata = false;
  let offset = block[0].indexOf(block[1]);
  for (const rawLine of block[1].split("\n")) {
    const line = rawLine.endsWith("\r") ? rawLine.slice(0, -1) : rawLine;
    const lineStart = offset;
    const lineEnd = offset + rawLine.length;
    offset = lineEnd + 1;
    if (!line.trim()) continue;
    const indent = line.length - line.trimStart().length;
    const trimmed = line.trim();
    if (indent === 0) {
      inMetadata = /^metadata:\s*$/.test(trimmed);
      continue;
    }
    if (!inMetadata) continue;
    const version = /^version:\s*"?([^"\s]+)"?\s*$/.exec(trimmed);
    if (version) return { lineStart, lineEnd, indent, value: version[1] };
  }
  return undefined;
}

/**
 * Write the release label into frontmatter. Sources omit the version (and usually `metadata`
 * itself); the built copy always carries `metadata.version`.
 */
function withFrontmatterVersion(contents, version) {
  const located = locateMetadataVersion(contents);
  if (!located) {
    const block = /^---\r?\n([\s\S]*?)\r?\n---/.exec(contents);
    if (!block) throw new Error("SKILL.md must start with YAML frontmatter");
    if (/^metadata:\s*$/m.test(block[1])) {
      return contents.replace(/^metadata:\s*$/m, `metadata:\n  version: "${version}"`);
    }
    // No metadata block yet: add one at the end of the frontmatter.
    const closing = block.index + block[0].length - 3;
    return `${contents.slice(0, closing)}metadata:\n  version: "${version}"\n${contents.slice(closing)}`;
  }
  const indentation = " ".repeat(located.indent);
  return `${contents.slice(0, located.lineStart)}${indentation}version: "${version}"${contents.slice(located.lineEnd)}`;
}

/** sha256 over every published file, with the release label normalised out of SKILL.md. */
function contentHash(directory, files) {
  const hash = createHash("sha256");
  for (const file of files) {
    const contents = fs.readFileSync(path.join(directory, ...file.split("/")), "utf8");
    hash.update(file);
    hash.update("\0");
    hash.update(file === "SKILL.md" ? withFrontmatterVersion(contents, versionPlaceholder) : contents);
    hash.update("\0");
  }
  return hash.digest("hex");
}

/** Release date: the day the skill last changed, so unrelated commits publish the same release. */
function releaseDate() {
  for (const args of [
    ["log", "-1", "--format=%cs", "--", sourceDirectory],
    ["log", "-1", "--format=%cs", "HEAD"],
  ]) {
    try {
      const value = execFileSync("git", args, { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
      if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value.replaceAll("-", "");
    } catch {
      // Fall through to the next source: git may be unavailable or the clone shallow.
    }
  }
  const epoch = Number(process.env.SOURCE_DATE_EPOCH);
  const date = Number.isFinite(epoch) && epoch > 0 ? new Date(epoch * 1000) : new Date();
  return `${date.getUTCFullYear()}${String(date.getUTCMonth() + 1).padStart(2, "0")}${String(date.getUTCDate()).padStart(2, "0")}`;
}

if (!fs.existsSync(path.join(releaseDirectory, "SKILL.md"))) {
  throw new Error(`Missing ${path.relative(root, releaseDirectory)}/SKILL.md — run \`npm run docs:build\` (it builds the site first) instead of building the release on its own.`);
}

const files = listFiles(releaseDirectory).filter((file) => file !== indexFile);
if (!files.includes("SKILL.md")) throw new Error(`${skillName}/SKILL.md is missing`);
const skillPath = path.join(releaseDirectory, "SKILL.md");
const version = `${releaseDate()}-${contentHash(releaseDirectory, files).slice(0, 12)}`;
fs.writeFileSync(skillPath, withFrontmatterVersion(fs.readFileSync(skillPath, "utf8"), version));
const integrity = Object.fromEntries(files.map((file) => [
  file,
  createHash("sha256").update(fs.readFileSync(path.join(releaseDirectory, ...file.split("/")))).digest("hex"),
]));
const document = { skills: [{ name: skillName, description, version, thctl: thctlRange, files, integrity }] };
const target = path.join(releaseDirectory, indexFile);
fs.writeFileSync(target, `${JSON.stringify(document, null, 2)}\n`);
console.log(`Wrote ${path.relative(root, target)} (${skillName} ${version}, ${files.length} files)`);
