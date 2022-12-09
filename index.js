import format from './rome-format.js'
import languagesWithoutParser from './languages.js'
import getRomeConfiguration from './get-rome-configuration.js'
import getRomeFilename from './get-rome-filename.js'

const parserName = 'rome'
const astFormat = parserName

const parse = (text, _, options) => ({
  text: format(
    text,
    getRomeConfiguration(options),
    getRomeFilename(options.filepath),
  ),
  range: [0, text.length],
})

const print = (path) => path.getNode().text

export const languages = languagesWithoutParser.map((language) => ({
  ...language,
  parsers: [parserName],
}))

export const parsers = {
  [parserName]: {
    parse,
    astFormat,
    locStart: (node) => node.range[0],
    locEnd: (node) => node.range[1],
  },
}

export const printers = {
  [astFormat]: {
    print,
    willPrintOwnComments: () => true,
  },
}

export default {languages, parsers, printers}
