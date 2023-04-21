import { commentSufReg } from '../constants'

export function parsePlatform(platform: string, commentPre: string): string[] {
  let platforms: string[]
  if (commentPre !== '//') {
    const PlatformResult = [...platform.matchAll(commentSufReg)][0]
    if (!PlatformResult)
      return []
    const [_self, _platform, _commentSuf] = PlatformResult
    platform = _platform.trim()
  }

  if (platform.includes('||'))
    platforms = platform.split('||').map(item => item.trim())

  else
    platforms = [platform.trim()]

  return platforms
}
