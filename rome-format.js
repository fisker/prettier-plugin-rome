import {Rome, BackendKind} from '@rometools/js-api'

function getRomeConfig(prettierOptions = {}) {
  return {
    formatter: {
      enabled: true,
      formatWithErrors: true,
      lineWidth: prettierOptions.printWidth,
      indentStyle: prettierOptions.useTabs ? 'tab' : 'space',
      indentSize: prettierOptions.tabWidth,
    },
    javascript: {
      formatter: {
        quoteStyle: prettierOptions.singleQuote ? 'single' : 'double',
        quoteProperties:
          {
            'as-needed': 'asNeeded',
            consistent: 'asNeeded',
          }[prettierOptions.quoteProps] ?? prettierOptions.quoteProps,
        trailingComma: prettierOptions.trailingComma,
        // semicolons: prettierOptions.semi ? 'always' : 'asNeeded',
      },
    },
  }
}

async function format(text, options) {
  const configuration = getRomeConfig(options)

  const rome = await Rome.create({backendKind: BackendKind.NODE})
  await rome.applyConfiguration(configuration)

  const {content: formatted} = await rome.formatContent(text, {
    filePath: options.filepath ?? 'file.tsx',
  })

  return formatted
}

export default format
