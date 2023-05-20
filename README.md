# frontend-common

Shared hooks, utilities, and other logic for Ribly frontends (e.g. web and mobile).

## Running tests

Tests can be run using:

```
npm run test
```

## Checking code standards

The code can be auto formatted (by prettier) via:

```
npm run format
```

The code can be linted (via eslint) with:

```
npm run lint
npm run lint:fix
```

The code's types can be checked with:

```
npm run typecheck
```

## Building locally

This package is transpiled from TypeScript to JavaScript in order to be used by
its consumers. If you would like to see the code that is generated this can be done with:

```
npm run build
```

## Commit formatting

This repo uses semantic release in order to generate and maintain a change log.
This means that commit messages must adhere to [Conventional
Commit](https://www.conventionalcommits.org/en/v1.0.0/) guidelines.

The prefixes for these commit messages include: `feat:`, `fix:`, `build:`,
`chore:`, `ci:`, `docs:`, `style:`, `refactor:`, `perf:`, `test:`.
