import {Rome} from '@rometools/js-api'
import romeToolsWasmModule from '@rometools/wasm-nodejs'

let workspace
function format(text, configuration, file = 'file.tsx') {
  // Based on `Rome.create`
  if (!workspace) {
    romeToolsWasmModule.main()
    workspace = new romeToolsWasmModule.Workspace()
  }

  const rome = new Rome(romeToolsWasmModule, workspace)

  rome.applyConfiguration(configuration)

  const {content: formatted} = rome.formatContent(text, {filePath: file})

  return formatted
}

export default format
