import * as vscode from 'vscode'

export class HoverProvider implements vscode.HoverProvider {
  private platformLabels: { [key: string]: { color: string, label: string } }

  constructor(platformLabels: { [key: string]: { color: string, label: string } }) {
    this.platformLabels = platformLabels
  }

  provideHover(document: vscode.TextDocument, position: vscode.Position): vscode.ProviderResult<vscode.Hover> {
    const platformKeys = Object.keys(this.platformLabels)
    const platformPrefixes = Array.from(new Set(platformKeys.map(key => `${key.split('-')[0]}-`)))
    const regexPattern = `(${platformPrefixes.join('|')})\\w+`
    const regexPatternWithNoPrefix = `(${platformKeys.join('|')})`
    const combinedRegexPattern = `(${regexPattern}|${regexPatternWithNoPrefix})`
    const wordRange = document.getWordRangeAtPosition(position, new RegExp(combinedRegexPattern))
    if (wordRange) {
      const word = document.getText(wordRange)
      const platformInfo = this.platformLabels[word]
      const platformName = platformInfo ? platformInfo.label : word
      return new vscode.Hover(`**${platformName}**`)
    }
    return null
  }
}
