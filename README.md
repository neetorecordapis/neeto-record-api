# NeetoRecord API Docs

This repository contains the documentation for the [NeetoRecord APIs](https://apidocs.neetorecord.com/getting-started/introduction), built using [Mintlify](https://mintlify.com/).

## Project Overview

The documentation includes:

- **Getting Started Guide**: Introduction, authentication, subdomain identification, pagination,
  HTTP response codes and quick start tutorials
- **Recordings API**: Endpoints for listing recordings in your workspace

## Project Structure

```
neeto-record-api/
├── api-reference/         # API endpoint documentation
│   └── recordings/        # Recordings API documentation
├── assets/                # Static assets (favicon, images)
├── bundled/               # Generated OpenAPI bundles (auto-generated)
│   └── recordings.yaml
├── schemas/               # Contains reusable schema definitions
│   ├── common.yaml        # Shared schemas used across multiple endpoints
│   └── recording.yaml     # Schemas related to recordings
├── docs/                  # OpenAPI specification files
│   └── recordings.yaml
├── getting-started/       # Getting started guides
├── snippets/              # Reusable content snippets
├── scripts/               # Build and automation scripts
│   └── bundle.sh          # Script to bundle OpenAPI specs using Redocly
├── docs.json              # Mintlify configuration
├── theme.css              # Custom theme styling
└── package.json           # Project dependencies and scripts
```

## Installation

1. **Install Mintlify CLI globally:**

   ```bash
   npm i -g mint
   ```

2. **Install project dependencies:**
   ```bash
   yarn install
   ```

## Development Setup

To preview the documentation locally:

```bash
yarn docs:preview
```

A local preview will be available at `http://localhost:3000`. You can customize the port using the `--port` flag:

```bash
yarn docs:preview --port 3333
```

### Auto-rebuilding OpenAPI Specifications

The project uses nodemon to automatically rebuild OpenAPI specifications when changes are made to the source files. Start the development build process:

```bash
yarn build:dev
```

This will:

- Watch for changes in `.yaml` files
- Automatically bundle OpenAPI specifications using `@redocly/cli`
- Generate bundled files in the `bundled/` directory
- Ignore changes in the `bundled/` directory to prevent infinite loops

## Development Workflow

1. **Start the auto-rebuild process:**

   ```bash
   yarn build:dev
   ```

2. **Start the documentation preview:**

   ```bash
   yarn docs:preview
   ```

3. **Make changes to your documentation files** - both the preview and bundled files will update automatically

## API Documentation Structure

The documentation is organized into the following main sections:

- **Getting Started**: Introduction, authentication, and basic setup guides
- **Recordings API**: List and manage recordings in your workspace

### Other references

- https://github.com/mintlify/docs
- https://mintlify.com/docs
- https://mintlify.com/docs/reusable-snippets
