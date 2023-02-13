

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

Unless you explicitly state otherwise, any contribution intentionally submitted for inclusion in the work by you, as defined in the Apache-2.0 license, shall be dual licensed as above, without any additional terms or conditions.
