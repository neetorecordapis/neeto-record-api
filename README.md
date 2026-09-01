# NeetoRecord API Docs

This repository contains the documentation for the
[NeetoRecord APIs](https://apidocs.neetorecord.com/api/introduction), built using
[Mintlify](https://mintlify.com/).

## Development Setup

1. ### Install Mintlify CLI globally

   ```bash
   npm i -g mint
   ```

2. ### Install project dependencies

   ```bash
   yarn install
   ```

3. ### Make code changes in docs folder

4. ### Preview the changes

   ```bash
   yarn docs:preview
   ```

   A local preview will be available at `http://localhost:3000`. You can customize the port using the `--port` flag:

   ```bash
   yarn docs:preview --port 3333
   ```

   DO NOT MAKE CODE CHANGES IN BUNDLED FOLDER.

5. ### Build the API

   After making code changes you must run `yarn build:dev`. This will make changes in the `bundled` folder which is what
   mintlify uses. You should NEVER make changes to the `bundled` folder directly.

   Refer to [llm.md](llm.md) for more info.

## CLI command reference

The pages under `cli-reference/` combine hand written prose with generated flag
tables. Two things are generated from `cli/catalog.json` and must never be
edited by hand, because the next build overwrites them:

- `snippets/cli/**` - the per command flag tables.
- `cli-reference/overview.mdx` - the commands overview.

To refresh them after the CLI ships new commands or flags:

```bash
yarn cli:catalog   # re-snapshots cli/catalog.json from the installed neetorecord binary
yarn cli:build     # regenerates snippets/cli/** and cli-reference/overview.mdx
```

`yarn cli:catalog` reads whichever `neetorecord` is on your `PATH`, so run
`neetorecord update` first or build the binary from the latest `main` of
[neeto-record-cli](https://github.com/neetozone/neeto-record-cli). A stale
binary silently drops newer commands from the docs.

Everything else under `cli-reference/` and `cli/` is hand written. `yarn build`
runs `cli:build` after bundling the OpenAPI specs.

## Publishing

Production documentation is published by synchronizing `origin/main` to the private GitHub repository connected to
Mintlify. Pushes to `main` also trigger that sync in CI (`.neetoci/sync-docs.yml`). `yarn docs:publish` is a manual
re-sync of the same `origin/main` commit; it does not publish the current branch or uncommitted changes.

### Publisher one-time setup

1. Install and sign in to the [1Password CLI](https://developer.1password.com/docs/cli/get-started/), then enable the
   desktop app integration in 1Password under **Settings > Developer > Integrate with 1Password CLI**.

2. Confirm the checked-in `.env` contains the shared 1Password reference for `GITHUB_PAT`. That value is the GitHub
   personal access token for [neetorecordapis](https://github.com/neetorecordapis), which owns the public repository
   connected to Mintlify. The reference uses vault, item, and field IDs. Do not replace the `op://` reference with the token itself.

### Validate without publishing

Verify 1Password CLI access and the shared publishing credential, then run the build and documentation checks against
the latest `origin/main` without pushing:

```bash
yarn docs:publish:check
```

### Publish

Run:

```bash
yarn docs:publish
```

Authenticate when 1Password prompts. The command fetches and validates `origin/main`, safely updates the Mintlify
repository, verifies the pushed commit, and prints the documentation URL. A push to the connected repository triggers
Mintlify's deployment.

During publishing, the GitHub token is injected only into the final Git push process after validation succeeds. During
the check command, it is injected only into a small credential checker that verifies the value without printing it. The
token is not made available to dependency installation or documentation checks, and is not stored in the repository,
Git remote, shell history, or Git credential helpers. Do not run the internal push script directly with a plaintext
`GITHUB_PAT`.
