import { describe, expect, it } from 'vitest'
import { parseComment, parsePlatform } from './../../src/parseComment'

describe.skip('parseComment', () => {
  it('should parse comment', () => {
    const code = `
    // #ifdef APP-PLUSaasd
    // #endif    
    /* #ifdef APP-PLUS */
    `
    expect(parseComment(code)).toMatchInlineSnapshot(`
      [
        {
          "end": 27,
          "platform": "APP-PLUSaasd",
          "start": 5,
          "type": "#ifdef",
        },
        {
          "end": 41,
          "start": 32,
          "type": "#endif",
        },
        {
          "end": 71,
          "platform": "APP-PLUS",
          "start": 50,
          "type": "#ifdef",
        },
      ]
    `)
  })
  it('should parse platform', () => {
    const jsCode = `
    APP-PLUS
    `
    const htmlCode = 'H5 -->'
    const cssCode = 'H5 */'
    const errorCode = 'H5asd */'
    expect(parsePlatform(jsCode, '//')).toBe('APP-PLUS')
    expect(parsePlatform(htmlCode, '<!--')).toBe('H5')
    expect(parsePlatform(cssCode, '/*')).toBe('H5')
    expect(parsePlatform(errorCode, '/*')).toBe('H5asd')
  })
})
