import type { TextDocument, TextEditor } from 'vscode'
import type { HighlightRange } from './transformPlatform'
import { commands, window } from 'vscode'
import { getPlatformInfo } from './../src/getPlatformInfo'
import { setPlatformColor } from './setPlatformColor'
import { transformPlatform } from './transformPlatform'

export class Ranges {
  value!: HighlightRange
  editor!: TextEditor
  document!: TextDocument
  code!: string

  static platformInfo: ReturnType<typeof getPlatformInfo>
  static platformList: string[]
  constructor() {
    this.getContext()
    if (!this.code)
      return
    this.setPlatformData()
    this.hasPlatformList()
    this.setColor()
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

  setPlatformData() {
    Ranges.platformInfo = getPlatformInfo(this.code)
    Ranges.platformList = Array.from(new Set(Ranges.platformInfo.filter(item => item.type === 'platform').map(item => item.row)))
  }

  hasPlatformList() {
    if (Ranges.platformList.length)
      commands.executeCommand('setContext', 'uni.hasComment', true)
    else
      commands.executeCommand('setContext', 'uni.hasComment', false)
  }

  getVscodeRange() {
    this.value = transformPlatform(Ranges.platformInfo, this.editor)
  }

  setColor() {
    this.getVscodeRange()
    setPlatformColor(this.value, this.editor)
  }
}
