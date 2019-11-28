# Status file browser

This monorepo contains a frontend and backend implementation for browsing debian control files, specifically the one located in `/var/lib/dpkg/status`. A mock file is included within the repo, so you don't need to have a debian system to enjoy this application.

## Getting started

**With npm**
```bash
npm install
npx lerna bootstrap # Install dependencies for packages
npx lerna run start # Run start script for packages
```

**With Yarn**
```bash
yarn
yarn lerna bootstrap # Install dependencies for packages
yarn lerna run start # Run start script for packages
```

To run scripts for a specific package use the following syntax:
`yarn lerna run <scriptname> --scope <packagename>`

**Example:**

```bash
yarn lerna run test --scope api
```

## Requirements

- Node >=v8.16.2
- npm or Yarn

## Technology used

### Frontend
- React
- TypeScript

### Backend
- NodeJS with Koa
- TypeScript