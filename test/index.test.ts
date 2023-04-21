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
          "color": "#859900",
          "end": 14,
          "start": 8,
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
          "color": "#859900",
          "end": 14,
          "start": 8,
        },
        {
          "color": undefined,
          "end": 27,
          "start": 15,
          "type": "platform",
        },
        {
          "color": "#859900",
          "end": 41,
          "start": 35,
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
          "color": "#859900",
          "end": 16,
          "start": 10,
        },
        {
          "color": "#e5c07b",
          "end": 19,
          "start": 17,
          "type": "platform",
        },
        {
          "color": "#859900",
          "end": 39,
          "start": 33,
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
          "color": "#859900",
          "end": 14,
          "start": 8,
        },
        {
          "color": "#2aae67",
          "end": 17,
          "start": 15,
          "type": "platform",
        },
        {
          "color": "#859900",
          "end": 34,
          "start": 28,
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
          "color": "#859900",
          "end": 14,
          "start": 8,
        },
        {
          "color": "#859900",
          "end": 30,
          "start": 28,
        },
        {
          "color": undefined,
          "end": 27,
          "start": 15,
          "type": "platform",
        },
        {
          "color": undefined,
          "end": 47,
          "start": 31,
          "type": "platform",
        },
        {
          "color": "#859900",
          "end": 61,
          "start": 55,
        },
      ]
    `)
  })
})
