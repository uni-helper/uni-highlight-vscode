import type { ExtensionContext } from 'vscode'
import { commands, languages, window, workspace } from 'vscode'
import { Ranges } from './getVscodeRange'
import { CommentFoldingRangeProvider } from './CommentFoldingRangeProvider'
import { foldOtherPlatformComment } from './foldOtherPlatformComment'
import { HoverProvider } from './HoverProvider'
import { patterns } from './constants'
import { PLATFORM_LABELS } from './constants/platform'

type PlatformConfigValue = string | { color: string, label?: string }

function setupEventListeners() {
  window.onDidChangeActiveTextEditor(() => new Ranges())
  workspace.onDidChangeTextDocument(() => new Ranges())
}

export function activate(context: ExtensionContext) {
  new Ranges()
  setupEventListeners()

  // 读取用户配置的平台名称
  const customPlatformConfig = workspace.getConfiguration('uni-highlight').get('platform', {}) as { [key: string]: PlatformConfigValue }
  // 处理自定义平台配置
  const processedCustomPlatformConfig: { [key: string]: PlatformConfigValue } = {}

  for (const key in customPlatformConfig) {
    const value = customPlatformConfig[key]
    if (typeof value === 'string') {
      processedCustomPlatformConfig[key] = { color: value, label: key }
    }
    else if (typeof value === 'object' && value !== null) {
      processedCustomPlatformConfig[key] = {
        color: value.color,
        label: value.label ?? key,
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
