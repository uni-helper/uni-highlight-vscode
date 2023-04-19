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
          "type": "ifdef",
        },
        {
          "color": "#e06c75",
          "end": 23,
          "start": 15,
          "type": "APP-PLUS",
        },
        {
          "color": "#859900",
          "end": 37,
          "start": 31,
          "type": "endif",
        },
      ]
    `)
  })
})
