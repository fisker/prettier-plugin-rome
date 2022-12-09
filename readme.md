# prettier-plugin-rome

[![Build Status][github_actions_badge]][github_actions_link]
[![Coverage][coveralls_badge]][coveralls_link]
[![Npm Version][package_version_badge]][package_link]
[![MIT License][license_badge]][license_link]

[github_actions_badge]: https://img.shields.io/github/workflow/status/fisker/prettier-plugin-rome/CI/master?style=flat-square
[github_actions_link]: https://github.com/fisker/prettier-plugin-rome/actions?query=branch%3Amaster
[coveralls_badge]: https://img.shields.io/coveralls/github/fisker/prettier-plugin-rome/master?style=flat-square
[coveralls_link]: https://coveralls.io/github/fisker/prettier-plugin-rome?branch=master
[license_badge]: https://img.shields.io/npm/l/git-hooks-list.svg?style=flat-square
[license_link]: https://github.com/fisker/prettier-plugin-rome/blob/master/license
[package_version_badge]: https://img.shields.io/npm/v/git-hooks-list.svg?style=flat-square
[package_link]: https://www.npmjs.com/package/git-hooks-list

> Prettier plugin runs [Rome](https://rome.tools/).

## Installation

```bash
yarn add prettier prettier-plugin-rome --dev
```

## Usage

```js
// prettier.config.cjs
module.exports = {
  plugins: ['prettier-plugin-rome'],
  overrides: [
    {
      files: '**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}',
      options: {
        parser: 'rome',
      },
    },
  ],
}
```
