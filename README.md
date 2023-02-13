# Node.js & TypeScript Template
This repository template makes it easier to create a new NPM library, package or application using Node.js and TypeScript. It comes with several developer tools pre-configured and ready to use, so it's easier to get started.

## Features
  - [x] [Node.js](https://nodejs.org/) and [TypeScript](https://www.typescriptlang.org/) [v4.9](https://www.typescriptlang.org/docs/handbook/release-notes/overview.html) support
  - [x] Support for [GitHub Codespaces](https://github.com/features/codespaces)
  - [x] Continuous integration with [GitHub Actions](https://github.com/features/actions) and [Codesandbox CI](https://codesandbox.io/ci)
  - [x] Auto-bundled, minified source code with [Webpack](https://webpack.js.org/)
  - [x] Auto-generated documentation for TypeScript code with [TypeDoc](https://typedoc.org/)
  - [x] Auto-formatted code with [ESLint](https://eslint.org/)
  - [x] Unit testing and code coverage with [Vitest](https://vitest.dev/) framework
  - [x] Dependency updates with [Renovate](https://github.com/marketplace/renovate)

## Getting started
```shell
gh repo create {repo-name} --public --clone --template neoncitylights/node-ts-template
```

 1. Open up Visual Studio Code
 2. Click on the 'Search' icon on the primary left side bar. This opens up [project-wide search](https://code.visualstudio.com/docs/editor/codebasics#_search-across-files) so you can mass find-and-replace.
    1. `{library-author}`: Replace this with your GitHub/npm username, or the name of your organization.
    2. `{library-name}`: Replace this with the name of your library.
    3. replace instances of `neonctylights/node-ts-template` in the README.md badges with your repository.
 3. Delete this `README.md`, and rename [`LIBRARY.md`](./LIBRARY.md) to `README.md`.

## Configure
 - Configure NPM package: [`package.json`](./package.json) • [[docs](https://docs.npmjs.com/cli/v9/configuring-npm/package-json), [website](https://docs.npmjs.com/)]
 - Configure ESLint (code formatter + linter): [`.eslintrc.js`](./eslintrc.js) • [[docs](https://eslint.org/docs/latest/user-guide/configuring/), [website](https://eslint.org/)]
 - Configure Vitest (testing framework): [`vitest.config.ts`](./vitest.config.ts) • [[docs](https://vitest.dev/config/), [website](https://vitest.dev/)]
 - Configure TypeDoc (documentation generator): [`typedoc.json`](./typedoc.json) • [[docs](https://typedoc.org/guides/options/), [website](https://typedoc.org/)]
 - Configure Webpack (bundler): [`webpack.config.js`](./webpack.config.js) • [[docs](https://webpack.js.org/configuration/), [website](https://webpack.js.org/)]

## License
This software is licensed under the MIT license ([`LICENSE-MIT`](./LICENSE) or http://opensource.org/licenses/MIT).

### Contribution
Unless you explicitly state otherwise, any contribution intentionally submitted for inclusion in the work by you, as defined in the MIT license, shall be licensed as above, without any additional terms or conditions.