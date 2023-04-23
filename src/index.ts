import { commands, workspace } from 'vscode'
import { getVscodeRange } from './getVscodeRange'
import { setPlatformColor } from './setPlatformColor'
import { debounce } from './utils'

function main() {
  const { highlightRange, editor } = getVscodeRange()!

  setPlatformColor(highlightRange, editor)
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
