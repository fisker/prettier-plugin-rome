# prettier-plugin-rome

> Prettier plugin runs rome.

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
