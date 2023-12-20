import type { ExtensionContext } from 'vscode'
import { commands, languages, window, workspace } from 'vscode'
import { Ranges } from './getVscodeRange'
import { CommentFoldingRangeProvider } from './CommentFoldingRangeProvider'
import { foldOtherPlatformComment } from './foldOtherPlatformComment'
import { patterns } from './constants'

function setupEventListeners() {
  window.onDidChangeActiveTextEditor(() => new Ranges())
  workspace.onDidChangeTextDocument(() => new Ranges())
}

export function activate(context: ExtensionContext) {
  new Ranges()
  setupEventListeners()

  context.subscriptions.push(
    languages.registerFoldingRangeProvider(
      patterns,
      new CommentFoldingRangeProvider(),
    ),
    commands.registerCommand('uni.comment.reload', () => {
      new Ranges()
    }),
    commands.registerCommand('uni.comment.fold-other-platform', () => {
      foldOtherPlatformComment()
    }),
  )
}

export function deactivate() {}
