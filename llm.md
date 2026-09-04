# LLM Guidelines for NeetoRecord API Docs

## MCP Documentation Rules

1. **`mcp/introduction.mdx`, `mcp/authentication.mdx`, `mcp/connect.mdx` and `mcp/troubleshooting.mdx` follow the shared neeto MCP template.** Every neeto product runs the same MCP server stack, so every neeto docs site carries the same sections, tables, client list and troubleshooting entries on these four pages, with only the product name, its resources, its help center and its support address swapped. The NeetoCal pages in neeto-cal-api are the reference copy. Change the shared wording in every product's docs or in none.

2. **The server endpoint is always the product's own connect host, `https://connect.neetorecord.com/mcp/messages`.** Never document a workspace subdomain host such as `https://YOUR_SUBDOMAIN.neetorecord.com/mcp/messages`. The credential selects the workspace, not the host.

3. **The documented clients are Claude, ChatGPT, Claude Code, Codex, Cursor, Gemini CLI, VS Code, Windsurf and Antigravity.** Antigravity is documented with an API key only. Do not add or drop a client on one product's docs alone.

4. **`mcp/examples.mdx` and `mcp/tools.mdx` are product specific.** Tool names and descriptions come from the product's `app/tools/*.rb`, never from another product's docs.
