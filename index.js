import format from './rome-format.js'
import languages from './languages.js'
import getRomeConfiguration from './get-rome-configuration.js'

const parserName = 'rome'
const astFormat = parserName

const parse = async (text, options) => ({
  text: await format(text, getRomeConfiguration(options), options.filepath),
  range: [0, text.length],
})

const print = (path) => path.node.text

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
    [astFormat]: {
      print,
      willPrintOwnComments: () => true,
    },
  },
}
