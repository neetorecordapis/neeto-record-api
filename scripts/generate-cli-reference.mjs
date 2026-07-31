import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const catalogPath = join(root, "cli", "catalog.json");
const snippetsDir = join(root, "snippets", "cli");
const overviewPath = join(root, "cli-reference", "overview.mdx");

const catalog = JSON.parse(readFileSync(catalogPath, "utf8"));

const escapeCell = (value) => String(value ?? "").replace(/\|/g, "\\|");

const commandPathParts = (command) => command.replace(/^neetorecord\s+/, "").split(/\s+/);

const flagLabel = (flag) =>
  flag.shorthand ? `\`--${flag.name}, -${flag.shorthand}\`` : `\`--${flag.name}\``;

const flagsTable = (flags) => {
  const header =
    "| Flag | Type | Required | Default | Description |\n" +
    "| --- | --- | --- | --- | --- |";
  const rows = flags.map((flag) => {
    const type = flag.type ? `\`${flag.type}\`` : "";
    const required = flag.required ? "Yes" : "";
    const def = flag.default ? `\`${flag.default}\`` : "";
    return `| ${flagLabel(flag)} | ${type} | ${required} | ${def} | ${escapeCell(flag.description)} |`;
  });
  return [header, ...rows].join("\n");
};

const writeSnippet = (command, flags) => {
  const parts = commandPathParts(command);
  const filePath = join(snippetsDir, `${parts.join("/")}.mdx`);
  mkdirSync(dirname(filePath), { recursive: true });
  writeFileSync(filePath, `${flagsTable(flags)}\n`);
  return parts;
};

let snippetCount = 0;
const overviewGroups = [];

const walk = (entry, topGroup) => {
  const isLeaf = !entry.subcommands || entry.subcommands.length === 0;

  if (isLeaf) {
    if (topGroup && topGroup !== entry) {
      topGroup.commands.push({ command: entry.command, description: entry.description });
    }
    if (entry.flags && entry.flags.length > 0) {
      writeSnippet(entry.command, entry.flags);
      snippetCount += 1;
    }
    return;
  }

  for (const sub of entry.subcommands) {
    walk(sub, topGroup);
  }
};

rmSync(snippetsDir, { recursive: true, force: true });

for (const group of catalog) {
  const overviewGroup = {
    command: group.command,
    description: group.description,
    commands: [],
  };
  overviewGroups.push(overviewGroup);
  if (group.subcommands && group.subcommands.length > 0) {
    walk(group, overviewGroup);
  } else {
    overviewGroup.commands.push({ command: group.command, description: group.description });
    if (group.flags && group.flags.length > 0) {
      writeSnippet(group.command, group.flags);
      snippetCount += 1;
    }
  }
}

const groupToPage = {
  "neetorecord analytics": "/cli-reference/analytics",
  "neetorecord folders": "/cli-reference/folders",
  "neetorecord recording-requests": "/cli-reference/recording-requests",
  "neetorecord recordings": "/cli-reference/recordings",
  "neetorecord tags": "/cli-reference/tags",
  "neetorecord team-members": "/cli-reference/team-members",
};
const utilityPage = "/cli-reference/utility";

const utilityGroups = new Set([
  "neetorecord completion",
  "neetorecord doctor",
  "neetorecord login",
  "neetorecord logout",
  "neetorecord setup",
  "neetorecord update",
  "neetorecord version",
  "neetorecord whoami",
]);

const warnings = [];

const resolvePage = (groupCommand) => {
  if (groupToPage[groupCommand]) return groupToPage[groupCommand];
  if (!utilityGroups.has(groupCommand)) {
    warnings.push(
      `No page mapping for group "${groupCommand}"; linking to ${utilityPage}. ` +
        "Add it to groupToPage in scripts/generate-cli-reference.mjs.",
    );
  }
  return utilityPage;
};

const overviewSection = (group) => {
  const page = resolvePage(group.command);
  const title = group.command.replace(/^neetorecord\s+/, "");
  const rows = group.commands
    .map((c) => `| [\`${c.command}\`](${page}) | ${escapeCell(c.description)} |`)
    .join("\n");
  return (
    `### ${title}\n\n` +
    `${group.description}\n\n` +
    "| Command | Description |\n| --- | --- |\n" +
    `${rows}\n`
  );
};

const globalFlags = [
  { name: "json", description: "Output as JSON" },
  { name: "quiet", description: "Output raw data only (no envelope)" },
  { name: "toon", description: "Output in TOON format (token-optimized for AI agents)" },
  { name: "subdomain", description: "Override saved subdomain" },
];

const globalFlagsSection =
  "## Global flags\n\n" +
  "These flags work on every command and are left out of the per-command flag tables below. " +
  "See [Output formats](/cli/output-formats) for details.\n\n" +
  "| Flag | Description |\n| --- | --- |\n" +
  globalFlags.map((f) => `| \`--${f.name}\` | ${escapeCell(f.description)} |`).join("\n");

const overview =
  "---\n" +
  'title: "Commands overview"\n' +
  'description: "Every neetorecord command grouped by resource, with links to the full reference."\n' +
  "---\n\n" +
  `${globalFlagsSection}\n\n` +
  overviewGroups.map(overviewSection).join("\n");

mkdirSync(dirname(overviewPath), { recursive: true });
writeFileSync(overviewPath, overview);

console.log(`Generated ${snippetCount} flag-table snippets and cli-reference/overview.mdx`);

for (const warning of warnings) {
  console.error(`Warning: ${warning}`);
}
