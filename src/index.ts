import { commands, workspace } from 'vscode'
import { getVscodeRange } from './getVscodeRange'
import { setPlatformColor } from './setPlatformColor'

function main() {
  const { platformInfo, editor } = getVscodeRange()!

  if (!platformInfo)
    return

  platformInfo.forEach((platformInfo) => {
    setPlatformColor(platformInfo, editor)
  })
}

export function activate() {
  main()

  workspace.onDidChangeTextDocument(() => {
    main()
  })

  commands.registerCommand('diffCompiler.reload', () => {
    main()
  })
}

export function deactivate() {

}
