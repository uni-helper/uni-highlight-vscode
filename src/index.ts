import type { ExtensionContext } from 'vscode'
import { commands, languages, window, workspace } from 'vscode'
import { Ranges } from './getVscodeRange'
import { debounce } from './utils'
import { CommentFoldingRangeProvider } from './CommentFoldingRangeProvider'
import { foldOtherPlatformComment } from './foldOtherPlatformComment'

function onActiveEditorChanged() {
  const range = new Ranges()
  range.setColor()
}

function setupEventListeners() {
  window.onDidChangeActiveTextEditor(onActiveEditorChanged)
  workspace.onDidChangeTextDocument(debounce(() => {
    const range = new Ranges()
    range.setColor()
  }, 500))
}

export function activate(context: ExtensionContext) {
  const range = new Ranges()
  range.setColor()
  setupEventListeners()

  context.subscriptions.push(
    languages.registerFoldingRangeProvider(
      [{ pattern: '**/*.*', scheme: 'file' }],
      new CommentFoldingRangeProvider(),
    ),
    commands.registerCommand('uni.comment.reload', () => {
      range.setColor()
    }),
    commands.registerCommand('uni.comment.fold-other-platform', () => {
      const range = new Ranges()
      foldOtherPlatformComment(context, range.platformList)
    }),
  )
}

export function deactivate() {

}
