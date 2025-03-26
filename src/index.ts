import type { ExtensionContext } from 'vscode'
import { commands, languages, window, workspace } from 'vscode'
import { Ranges } from './getVscodeRange'
import { CommentFoldingRangeProvider } from './CommentFoldingRangeProvider'
import { foldOtherPlatformComment } from './foldOtherPlatformComment'
import { HoverProvider } from './HoverProvider'
import { patterns } from './constants'
import { PLATFORM_LABELS } from './constants/platform'

function setupEventListeners() {
  window.onDidChangeActiveTextEditor(() => new Ranges())
  workspace.onDidChangeTextDocument(() => new Ranges())
}

export function activate(context: ExtensionContext) {
  new Ranges()
  setupEventListeners()

  // 读取用户配置的平台名称
  const customPlatformConfig = workspace.getConfiguration('uni-highlight').get('platform', {}) as { [key: string]: { color: string, label: string } }
  // 处理自定义平台配置
  const processedCustomPlatformConfig: { [key: string]: { color: string, label: string } } = {}
  for (const key in customPlatformConfig) {
    if (typeof customPlatformConfig[key] === 'string') {
      processedCustomPlatformConfig[key] = { color: customPlatformConfig[key] as string, label: key }
    }
    else {
      processedCustomPlatformConfig[key] = {
        color: (customPlatformConfig[key] as { color: string, label?: string }).color,
        label: (customPlatformConfig[key] as { color: string, label?: string }).label ?? key,
      }
    }
  }

  // 合并内置平台和自定义平台
  const mergedPlatformLabels: any = { ...PLATFORM_LABELS, ...processedCustomPlatformConfig }

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
    languages.registerHoverProvider(patterns, new HoverProvider(mergedPlatformLabels)),
  )
}

export function deactivate() {}
