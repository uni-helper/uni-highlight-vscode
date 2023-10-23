import { commands, window } from 'vscode'
import type { TextDocument, TextEditor } from 'vscode'
import { getPlatformInfo } from './../src/getPlatformInfo'
import type { HighlightRange } from './transformPlatform'
import { transformPlatform } from './transformPlatform'
import { setPlatformColor } from './setPlatformColor'

export class Ranges {
  value!: HighlightRange
  editor!: TextEditor
  document!: TextDocument
  code!: string
  constructor() {
    this.getContext()
    this.hasPlatformList()
  }

  getContext() {
    const editor = window.activeTextEditor
    if (!editor)
      return
    this.editor = editor
    const document = editor?.document
    if (!document)
      return
    this.document = document
    this.code = document.getText()
  }

  public get platformInfo() {
    return getPlatformInfo(this.code)
  }

  public get platformList() {
    return Array.from(new Set(this.platformInfo.filter(item => item.type === 'platform').map(item => item.row)))
  }

  getVscodeRange() {
    this.value = transformPlatform(this.platformInfo, this.editor)
  }

  hasPlatformList() {
    if (this.platformList.length)
      commands.executeCommand('setContext', 'uni.hasComment', true)
    else
      commands.executeCommand('setContext', 'uni.hasComment', false)
  }

  public setColor() {
    this.getVscodeRange()
    setPlatformColor(this.value, this.editor)
  }
}
