import { commands, workspace } from 'vscode'
import { getVscodeRange } from './getVscodeRange'
import { setPlatformColor } from './setPlatformColor'
import { debounce } from './utils'

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

  workspace.onDidChangeTextDocument(debounce(main, 500))

  commands.registerCommand('uni.comment.reload', () => {
    main()
  })
}

export function deactivate() {

}
