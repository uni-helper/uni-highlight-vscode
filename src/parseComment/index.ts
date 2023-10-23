import { COMMENT_PRE, commentPreReg } from '../constants'
import { parsePlatform } from './parsePlatform'

export function parseComment(code: string) {
  if (code.trim().length === 0)
    return

  const commentResults = [...code.matchAll(commentPreReg)]
  if (commentResults.length === 0)
    return

  const commentAST = []
  for (let i = 0; i < commentResults.length; i++) {
    const item = commentResults[i]

    const index = item.index!
    const [self, commentPre, _space, prefix, _platform] = item

    if (!COMMENT_PRE.includes(commentPre))
      continue

    const platform = _platform.trim()

    const lineNumber = code.substring(0, index).split('\n').length

    if (platform && prefix !== '#endif') {
      const prefixStart = self.indexOf(prefix) + index
      const prefixEnd = prefixStart + prefix.length
      commentAST.push({
        start: prefixStart,
        end: prefixEnd,
        type: 'prefix',
        row: prefix,
        line: lineNumber,
      })
      const platforms = parsePlatform(platform, commentPre)
      if (!platforms)
        continue

      if (platforms.length > 1) {
        const orRex = /\|\|/g
        const orResult = [...platform.matchAll(orRex)]
        const offset = index + self.indexOf(_platform) + 1
        orResult.forEach((element) => {
          const orStart = offset + element.index!
          const orEnd = orStart + 2
          commentAST.push({
            start: orStart,
            end: orEnd,
            type: 'prefix',
            row: element[0],
            line: lineNumber,
          })
        })
      }
      platforms.forEach((element) => {
        const platformStart = self.indexOf(element) + index
        const platformEnd = platformStart + element.length
        commentAST.push({
          start: platformStart,
          end: platformEnd,
          type: 'platform',
          row: element,
          line: lineNumber,
        })
      })
    }
    else {
      const start = self.indexOf(prefix) + index
      const end = start + prefix.length
      commentAST.push({
        start,
        end,
        row: prefix,
        type: 'prefix',
        line: lineNumber,
      })
    }
  }
  return commentAST
}
