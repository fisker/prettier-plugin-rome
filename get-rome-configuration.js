function getRomeConfiguration(prettierOptions = {}) {
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
        semicolons: prettierOptions.semi ? 'always' : 'asNeeded',
      },
    },
  }
}

export default getRomeConfiguration
