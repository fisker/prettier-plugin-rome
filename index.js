import format from './rome-format.js'
import languages from './languages.js'

const parse = async (original, options) => ({
  type: 'root',
  text: await format(original, options),
  range: [0, original.length],
})

const print = (path) => path.node.text

const parserName = 'rome'
const astFormat = parserName
export default {
  languages: languages.map((language) => ({
    ...language,
    parsers: [parserName],
  })),
  parsers: {
    [parserName]: {
      parse,
      astFormat,
      locStart: (node) => node.range[0],
      locEnd: (node) => node.range[1],
    },
  },
  printers: {
    [astFormat]: {print},
  },
}
