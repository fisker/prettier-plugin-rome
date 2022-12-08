/*!
 * config file for `prettier`
 *
 * update: wget -O prettier.config.js https://git.io/fjVjd
 * document: https://prettier.io/docs/en/options.html
 */
const prettierConfig = require('@fisker/prettier-config')

module.exports = {
  ...prettierConfig,
  plugins: [require.resolve('.')],
}
