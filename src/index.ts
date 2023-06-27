import type { ExtensionContext } from 'vscode'
import { commands, languages, window, workspace } from 'vscode'
import { getVscodeRange } from './getVscodeRange'
import { setPlatformColor } from './setPlatformColor'
import { debounce } from './utils'
import { CommentFoldingRangeProvider } from './CommentFoldingRangeProvider'

function main() {
  const { highlightRange, editor } = getVscodeRange()!

  setPlatformColor(highlightRange, editor)
}

function setupEventListeners() {
  window.onDidChangeActiveTextEditor(debounce(main, 0))

  workspace.onDidChangeTextDocument(debounce(main, 500))
}

export function activate(context: ExtensionContext) {
  main()
  setupEventListeners()

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
