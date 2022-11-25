import {Rome, BackendKind} from '@rometools/js-api'

async function format(text, configuration, file = 'file.tsx') {
  const rome = await Rome.create({backendKind: BackendKind.NODE})

  await rome.applyConfiguration(configuration)

  const {content: formatted} = await rome.formatContent(text, {filePath: file})

  return formatted
}

export default format
