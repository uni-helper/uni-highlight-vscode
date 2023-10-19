import type { ExtensionContext, TextEditor } from 'vscode'
import { commands, languages, window, workspace } from 'vscode'
import { getVscodeRange } from './getVscodeRange'
import { setPlatformColor } from './setPlatformColor'
import { debounce } from './utils'
import { CommentFoldingRangeProvider } from './CommentFoldingRangeProvider'
import { foldOtherPlatformComment } from './foldOtherPlatformComment'

function main() {
  const editor = window.activeTextEditor
  if (!editor)
    return

  const highlightRange = getVscodeRange(editor)
  setPlatformColor(highlightRange, editor)
}

function onActiveEditorChanged(editor: TextEditor | undefined) {
  if (editor)
    main()
}

function setupEventListeners() {
  window.onDidChangeActiveTextEditor(onActiveEditorChanged)
  workspace.onDidChangeTextDocument(debounce(main, 500))
}

export function activate(context: ExtensionContext) {
  main()
  setupEventListeners()

  context.subscriptions.push(
    languages.registerFoldingRangeProvider(
      [{ pattern: '**/*.*', scheme: 'file' }],
      new CommentFoldingRangeProvider(),
    ),
    commands.registerCommand('uni.comment.reload', () => {
      main()
    }),
    commands.registerCommand('uni.comment.fold-other-platform', () => {
      foldOtherPlatformComment(context)
    }),
  )
}

export function deactivate() {

}
