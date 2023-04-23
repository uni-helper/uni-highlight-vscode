import type { TextEditor } from 'vscode'
import { DecorationRangeBehavior, MarkdownString, window } from 'vscode'
import { HIGHTLIGHT_COLOR } from './constants'
import type { HighlightRange } from './transformPlatform'

const UnderlineDecoration = window.createTextEditorDecorationType({
  textDecoration: 'none; border-bottom: 1px dashed currentColor',
  cursor: 'pointer',
  rangeBehavior: DecorationRangeBehavior.ClosedClosed,
})

const prefixColorDecoration = window.createTextEditorDecorationType({
  color: HIGHTLIGHT_COLOR.prefix,
  rangeBehavior: DecorationRangeBehavior.ClosedClosed,
})

const platformColorDecoration = window.createTextEditorDecorationType({
  color: HIGHTLIGHT_COLOR.platform['MP-WEIXIN'],
  rangeBehavior: DecorationRangeBehavior.ClosedClosed,
})

function initDecorations(editor: TextEditor) {
  editor.setDecorations(UnderlineDecoration, [])
  editor.setDecorations(platformColorDecoration, [])
  editor.setDecorations(prefixColorDecoration, [])
}

export function setPlatformColor(
  highlightRange: HighlightRange,
  editor: TextEditor,
) {
  const { prefix, platform, unPlatform } = highlightRange

  initDecorations(editor)

  editor.setDecorations(
    prefixColorDecoration,
    prefix,
  )
  editor.setDecorations(
    platformColorDecoration,
    platform,
  )

  editor.setDecorations(
    UnderlineDecoration,
    unPlatform.map(item => ({
      range: item.range,
      hoverMessage: new MarkdownString(`
### [@uni-helper](https://github.com/uni-helper/uni-highlight-vscode)\n
~~${item.row}~~ 不是一个有效的平台, 请检查是否拼写错误\n
***
详情请查看[文档](https://uniapp.dcloud.net.cn/tutorial/platform.html)
`),
    })),
  )
}
