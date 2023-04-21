import { describe, expect, it } from 'vitest'
import { parsePlatform } from '../../src/parseComment/parsePlatform'
import { parseComment } from './../../src/parseComment'

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
  it('should parse more comment', () => {
    const code = `
    // #ifdef APP-PLUS || APP-PLUS-NVUE
    // #endif
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
          "end": 26,
          "row": "||",
          "start": 24,
          "type": "prefix",
        },
        {
          "end": 23,
          "row": "APP-PLUS",
          "start": 15,
          "type": "platform",
        },
        {
          "end": 40,
          "row": "APP-PLUS-NVUE",
          "start": 27,
          "type": "platform",
        },
        {
          "end": 54,
          "row": "#endif",
          "start": 48,
          "type": "prefix",
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
    expect(parsePlatform(jsCode, '//')).toStrictEqual(['APP-PLUS'])
    expect(parsePlatform(htmlCode, '<!--')).toStrictEqual(['H5'])
    expect(parsePlatform(cssCode, '/*')).toStrictEqual(['H5'])
    expect(parsePlatform(errorCode, '/*')).toStrictEqual(['H5asd'])
  })
  it('should parse more platform', () => {
    const code = 'APP-PLUS || APP-PLUS-NVUE'
    expect(parsePlatform(code, '//')).toStrictEqual(['APP-PLUS', 'APP-PLUS-NVUE'])
  })
})
