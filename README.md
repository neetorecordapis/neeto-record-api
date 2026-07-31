# NeetoRecord API Docs

This repository contains the documentation for the
[NeetoRecord APIs](https://apidocs.neetorecord.com/getting-started/introduction), built using
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
