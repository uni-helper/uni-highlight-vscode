import type { ExtensionContext } from 'vscode'
import { commands, languages, workspace } from 'vscode'
import { getVscodeRange } from './getVscodeRange'
import { setPlatformColor } from './setPlatformColor'
import { debounce } from './utils'
import { CommentFoldingRangeProvider } from './CommentFoldingRangeProvider'

function main() {
  const { highlightRange, editor } = getVscodeRange()!

  setPlatformColor(highlightRange, editor)
}

export function activate(context: ExtensionContext) {
  main()

  workspace.onDidChangeTextDocument(debounce(main, 500))

  commands.registerCommand('uni.comment.reload', () => {
    main()
  })
  context.subscriptions.push(
    languages.registerFoldingRangeProvider(
      [{ pattern: '**/*.*', scheme: 'file' }],
      new CommentFoldingRangeProvider(),
    ),
  )
}

export function deactivate() {

}
