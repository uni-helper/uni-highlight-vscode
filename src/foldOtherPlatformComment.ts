import { commands, window } from 'vscode'
import { Ranges } from './getVscodeRange'
import type { PlatformInfo } from './getPlatformInfo'

export async function foldOtherPlatformComment() {
  const { platformList, platformInfo } = Ranges
  if (!platformList.length) {
    window.showWarningMessage('该页面没有有效的uni条件编译代码')
    return
  }

  const platform = await window.showQuickPick([
    'ALL',
    ...platformList,
  ])
  if (!platform)
    return

  const { fold, unfold } = getFoldLines(platform, platformInfo)

  await commands.executeCommand('editor.unfold', {
    levels: 1,
    direction: 'up',
    selectionLines: unfold,
  })
  await commands.executeCommand('editor.fold', {
    levels: 1,
    direction: 'up',
    selectionLines: fold,
  })
}

function getFoldLines(platform: string, platformInfo: PlatformInfo[]) {
  const platformStarts = platformInfo.filter(({ type }) => type === 'platform')

  if (platform === 'ALL') {
    return {
      fold: [],
      unfold: platformStarts.map(({ line }) => line - 1),
    }
  }

  const fold = platformStarts.filter(({ row }) => row !== platform).map(({ line }) => line - 1)
  const unfold = platformStarts.filter(({ row }) => row === platform).map(({ line }) => line - 1)

  return { fold, unfold }
}
