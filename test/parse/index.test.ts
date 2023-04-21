import { describe, expect, it } from 'vitest'
import { parseComment, parsePlatform } from './../../src/parseComment'

describe('parseComment', () => {
  it('should parse comment', () => {
    const code = `
    // #ifdef APP-PLUSaasd
    // #endif    
    /* #ifdef APP-PLUS */
    `
    expect(parseComment(code)).toMatchInlineSnapshot(`
      [
        {
          "end": 14,
          "row": "#ifdef",
          "start": 8,
          "type": "prefix",
        },
        {
          "end": 27,
          "row": "APP-PLUSaasd",
          "start": 15,
          "type": "platform",
        },
        {
          "end": 41,
          "row": "#endif",
          "start": 35,
          "type": "prefix",
        },
        {
          "end": 59,
          "row": "#ifdef",
          "start": 53,
          "type": "prefix",
        },
        {
          "end": 68,
          "row": "APP-PLUS",
          "start": 60,
          "type": "platform",
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
