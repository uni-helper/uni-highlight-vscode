const fileExtensions = [
  '.vue',
  '.nvue',
  '.uvue',
  '.pug',
  '.jsx',
  '.tsx',
  '.js',
  '.ts',
  '.uts',
  '.less',
  '.css',
  '.stylus',
  '.scss',
  '.sass',
  '.json',
]

function createFilePattern(extension: string) {
  return {
    pattern: `**/*${extension}`,
    scheme: 'file',
  }
}

/** 折叠文件黑名单 */
export const foldBlacklist = [
  '.uvue',
  '.uts',
]

export const patterns = fileExtensions.map(createFilePattern)
