import { describe, expect, it } from 'vitest'
import { getPlatformInfo } from './../src/getPlatformInfo'

describe('should', () => {
  it('exported', () => {
    const code = `
    // #ifdef APP-PLUS
    // #endif
    `
    expect(getPlatformInfo(code)).toMatchInlineSnapshot(`
      [
        {
          "color": "#859900",
          "end": 14,
          "start": 8,
          "type": "#ifdef",
        },
        {
          "color": "#80bd00",
          "end": 24,
          "start": 14,
          "type": " APP-PLUS ",
        },
        {
          "color": "#859900",
          "end": 38,
          "start": 32,
          "type": "#endif",
        },
      ]
    `)
  })
  it('exported', () => {
    const code = `
    // #ifdef MP-Alipay
    // #endif
    `
    expect(getPlatformInfo(code)).toMatchInlineSnapshot(`
      [
        {
          "color": "#859900",
          "end": 14,
          "start": 8,
          "type": "#ifdef",
        },
        {
          "color": "#859900",
          "end": 38,
          "start": 32,
          "type": "#endif",
        },
      ]
    `)
  })
})
