/*!
 * config file for `prettier`
 *
 * update: wget -O prettier.config.js https://git.io/fjVjd
 * document: https://prettier.io/docs/en/options.html
 */
import url from 'node:url'
import prettierConfig from '@fisker/prettier-config'

export default {
  ...prettierConfig,
  plugins: [url.fileURLToPath(new URL('./index.js', import.meta.url))],
}
