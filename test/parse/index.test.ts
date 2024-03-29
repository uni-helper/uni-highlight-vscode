import { describe, expect, it, vi } from 'vitest'
import { parsePlatform } from '../../src/parseComment/parsePlatform'
import { parseComment } from '../../src/parseComment'

vi.mock('vscode', () => {
  return {
    workspace: {
      getConfiguration: () => {
        return {
          get: vi.fn(),
        }
      },
    },
  }
})

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
          "line": 2,
          "row": "#ifdef",
          "start": 8,
          "type": "prefix",
        },
        {
          "end": 27,
          "line": 2,
          "row": "APP-PLUSaasd",
          "start": 15,
          "type": "platform",
        },
        {
          "end": 41,
          "line": 3,
          "row": "#endif",
          "start": 35,
          "type": "prefix",
        },
        {
          "end": 55,
          "line": 4,
          "row": "#ifdef",
          "start": 49,
          "type": "prefix",
        },
        {
          "end": 64,
          "line": 4,
          "row": "APP-PLUS",
          "start": 56,
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
          "line": 2,
          "row": "#ifdef",
          "start": 8,
          "type": "prefix",
        },
        {
          "end": 26,
          "line": 2,
          "row": "||",
          "start": 24,
          "type": "prefix",
        },
        {
          "end": 23,
          "line": 2,
          "row": "APP-PLUS",
          "start": 15,
          "type": "platform",
        },
        {
          "end": 40,
          "line": 2,
          "row": "APP-PLUS-NVUE",
          "start": 27,
          "type": "platform",
        },
        {
          "end": 54,
          "line": 3,
          "row": "#endif",
          "start": 48,
          "type": "prefix",
        },
      ]
    `)
    const code2 = `
    // #ifdef APP-PLUS || APP-PLUS-NVUE || APP-PLUS-NVUE
    // #endif
    `
    expect(parseComment(code2)).toMatchInlineSnapshot(`
      [
        {
          "end": 14,
          "line": 2,
          "row": "#ifdef",
          "start": 8,
          "type": "prefix",
        },
        {
          "end": 26,
          "line": 2,
          "row": "||",
          "start": 24,
          "type": "prefix",
        },
        {
          "end": 43,
          "line": 2,
          "row": "||",
          "start": 41,
          "type": "prefix",
        },
        {
          "end": 23,
          "line": 2,
          "row": "APP-PLUS",
          "start": 15,
          "type": "platform",
        },
        {
          "end": 40,
          "line": 2,
          "row": "APP-PLUS-NVUE",
          "start": 27,
          "type": "platform",
        },
        {
          "end": 40,
          "line": 2,
          "row": "APP-PLUS-NVUE",
          "start": 27,
          "type": "platform",
        },
        {
          "end": 71,
          "line": 3,
          "row": "#endif",
          "start": 65,
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
