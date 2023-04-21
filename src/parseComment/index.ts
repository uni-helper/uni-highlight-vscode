import { COMMENT_PRE, commentPreReg, commentSufReg } from '../constants'

export function parsePlatform(platform: string, commentPre: string) {
  if (commentPre !== '//') {
    const PlatformResult = [...platform.matchAll(commentSufReg)][0]
    if (!PlatformResult)
      return platform.trim()
    const [_self, _platform, _commentSuf] = PlatformResult
    platform = _platform.trim()
  }
  return platform.trim()
}

export function parseComment(code: string) {
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

    if (platform && prefix !== '#endif') {
      const prefixStart = self.indexOf(prefix) + index
      const prefixEnd = prefixStart + prefix.length
      commentAST.push({
        start: prefixStart,
        end: prefixEnd,
        type: 'prefix',
        row: prefix,
      })
      const platformValue = parsePlatform(platform, commentPre)
      if (!platformValue)
        continue
      const platformStart = self.indexOf(platformValue) + index
      const platformEnd = platformStart + platformValue.length
      commentAST.push({
        start: platformStart,
        end: platformEnd,
        type: 'platform',
        row: platformValue,
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
      })
    }
  }
  return commentAST
}
