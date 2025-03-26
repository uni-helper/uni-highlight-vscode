import { workspace } from 'vscode'
import { isObject } from '@antfu/utils'
import { builtinPlatforms } from '../builtinPlatforms'

// 定义接口以描述可能的对象结构
interface PlatformConfig {
  color?: string
  label?: string
}

const config = workspace.getConfiguration('uni-highlight').get('platform')

const SETTING = isObject(config)
  ? Object.fromEntries(
    Object.entries(config).map(([key, value]) => {
      if (typeof value === 'string')
        return [key, { color: value, label: key }]

      if (isObject(value) && typeof (value as PlatformConfig).color === 'string')
        return [key, { color: (value as PlatformConfig).color, label: (value as PlatformConfig).label ?? key }]

      return [key, { color: '#859900', label: key }] // 默认颜色
    }),
  )
  : {}

export const HIGHTLIGHT_COLOR = {
  prefix: '#859900',
  platform: {
    ...Object.assign(
      {},
      ...Object.keys(builtinPlatforms).map(key => ({ [key]: builtinPlatforms[key].color })),
      ...Object.keys(SETTING).map(key => ({ [key]: SETTING[key].color })),
    ),
  },
}

export const PLATFORM_LABELS = {
  ...builtinPlatforms,
  ...SETTING,
}

export const PLATFORM_LIST = Object.keys(HIGHTLIGHT_COLOR.platform) as Platform[]
export const COMMENT_PRE = ['//', '/*', '<!--']

export type Platform = keyof typeof HIGHTLIGHT_COLOR.platform
