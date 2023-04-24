import { describe, expect, it } from 'vitest'
import { getPlatformInfo } from './../src/getPlatformInfo'

describe('getPlatformInfo', () => {
  it('get // #endif', () => {
    const code = `
    // #endif
    `
    const result = getPlatformInfo(code)
    expect(result).toMatchInlineSnapshot(`
      [
        {
          "end": 14,
          "start": 8,
          "type": "prefix",
        },
      ]
    `)
  })
  it('be OK', () => {
    const jsCode = `
    // #ifdef PLATFORM_IOS
    // #endif
    `
    expect(getPlatformInfo(jsCode)).toMatchInlineSnapshot(`
      [
        {
          "end": 14,
          "start": 8,
          "type": "prefix",
        },
        {
          "end": 27,
          "row": "PLATFORM_IOS",
          "start": 15,
          "type": "unPlatform",
        },
        {
          "end": 41,
          "start": 35,
          "type": "prefix",
        },
      ]
    `)
    const htmlCode = `
    <!-- #ifdef H5 -->
    <!-- #endif -->
    `
    expect(getPlatformInfo(htmlCode)).toMatchInlineSnapshot(`
      [
        {
          "end": 16,
          "start": 10,
          "type": "prefix",
        },
        {
          "color": "#e5c07b",
          "end": 19,
          "start": 17,
          "type": "platform",
        },
        {
          "end": 39,
          "start": 33,
          "type": "prefix",
        },
      ]
    `)
    const cssCode = `
    /* #ifdef MP */
    /* #endif */
    `
    expect(getPlatformInfo(cssCode)).toMatchInlineSnapshot(`
      [
        {
          "end": 14,
          "start": 8,
          "type": "prefix",
        },
        {
          "color": "#2aae67",
          "end": 17,
          "start": 15,
          "type": "platform",
        },
        {
          "end": 34,
          "start": 28,
          "type": "prefix",
        },
      ]
    `)
  })
  it('be OK with ||', () => {
    const code = `
    // #ifdef PLATFORM_IOS || PLATFORM_ANDROID
    // #endif
    `
    expect(getPlatformInfo(code)).toMatchInlineSnapshot(`
      [
        {
          "end": 14,
          "start": 8,
          "type": "prefix",
        },
        {
          "end": 30,
          "start": 28,
          "type": "prefix",
        },
        {
          "end": 27,
          "row": "PLATFORM_IOS",
          "start": 15,
          "type": "unPlatform",
        },
        {
          "end": 47,
          "row": "PLATFORM_ANDROID",
          "start": 31,
          "type": "unPlatform",
        },
        {
          "end": 61,
          "start": 55,
          "type": "prefix",
        },
      ]
    `)
  })
})
