import {Rome} from '@rometools/js-api'
import romeToolsWasmModule from '@rometools/wasm-nodejs'

let rome
function format(text, configuration, file = 'file.tsx') {
  // Based on `Rome.create`
  if (!rome) {
    romeToolsWasmModule.main()
    const workspace = new romeToolsWasmModule.Workspace()
    rome = new Rome(romeToolsWasmModule, workspace)
  }

  rome.applyConfiguration(configuration)

  const {content: formatted} = rome.formatContent(text, {filePath: file})

  return formatted
}

export default format
