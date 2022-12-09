import path from 'node:path'
import languages from './languages.js'

// https://github.com/rome/tools/blob/cf98b46b9822f1f6cf2331c34ea5797af4ee9336/crates/rome_service/src/file_handlers/mod.rs
const supportedExtensions = new Set([
  '.js',
  '.mjs',
  '.cjs',
  '.jsx',
  '.ts',
  '.mts',
  '.cts',
  '.tsx',
  // '.json',
])

const DEFAULT_FILE_NAME = 'source.tsx'

function getRomeFilename(filename) {
  if (!filename) {
    return DEFAULT_FILE_NAME
  }

  const lowercasedFilename = filename.toLowerCase()
  const extension = path.extname(lowercasedFilename)

  if (supportedExtensions.has(extension)) {
    return `source${extension}`
  }

  const basename = path.basename(lowercasedFilename)
  const matchedLanguage = languages.find(
    (language) =>
      language.filenames?.includes(basename) ||
      language.extensions.includes(extension),
  )

  const matchedExtension = matchedLanguage?.extensions[0]

  return matchedExtension ? `source${matchedExtension}` : DEFAULT_FILE_NAME
}

export default getRomeFilename
