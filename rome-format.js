import {Rome} from '@rometools/js-api'
import romeToolsWasmModule from '@rometools/wasm-nodejs'
import {LinesAndColumns} from 'lines-and-columns'

function throwDiagnosticsError(text, diagnostics) {
  const [error] = diagnostics
  if (!error) {
    return
  }

  const linesAndColumns = new LinesAndColumns(text)
  const [start, end] = error.location.span.map((index) => {
    const {line, column} = linesAndColumns.locationForIndex(index)
    return {line: line + 1, column: column + 1}
  })

  throw Object.assign(
    new SyntaxError(
      `${`${error.description} (${start.line}`}:${start.column})`,
    ),
    {
      loc: {start, end},
    },
  )
}

let rome
function format(text, configuration, file = 'file.tsx') {
  // Based on `Rome.create`
  if (!rome) {
    romeToolsWasmModule.main()
    const workspace = new romeToolsWasmModule.Workspace()
    rome = new Rome(romeToolsWasmModule, workspace)
  }

  rome.applyConfiguration(configuration)

  let result

  try {
    result = rome.formatContent(text, {filePath: file})
  } catch (error) {
    throw error?.stackTrace ?? error
  }

  throwDiagnosticsError(text, result.diagnostics)

  return result.content
}

export default format
