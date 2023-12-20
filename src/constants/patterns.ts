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

export const patterns = fileExtensions.map(createFilePattern)
