import { workspace } from 'vscode'
import { isObject } from '../utils'

const config = workspace.getConfiguration('uni-highlight').get('platform')
const SETTING = isObject(config) ? config : {}

export const HIGHTLIGHT_COLOR = {
  prefix: '#859900',
  platform: Object.assign(
    {
      'VUE3': '#41b883',
      'APP-PLUS': '#80bd00',
      'APP-PLUS-NVUE': '#41b883',
      'APP-NVUE': '#41b883',
      'APP-ANDROID': '#80bd00',
      'APP-IOS': '#d9774b',
      'H5': '#e5c07b',
      'MP-WEIXIN': '#2aae67',
      'MP-ALIPAY': '#ff6a00',
      'MP-BAIDU': '#2932e1',
      'MP-TOUTIAO': '#f04142',
      'MP-LARK': '#00d6b9',
      'MP-QQ': '#025aef',
      'MP-KUAISHOU': '#ff5005',
      'MP-JD': '#e21e17',
      'MP-360': '#00aa48',
      'MP': '#2aae67',
      'QUICKAPP-WEBVIEW': '#4497ff',
      'QUICKAPP-WEBVIEW-UNION': '#4497ff',
      'QUICKAPP-WEBVIEW-HUAWEI': '#e60214',
    },
    SETTING,
  ),
}

export const PLATFORM_LIST = Object.keys(HIGHTLIGHT_COLOR.platform) as Platform[]
export const COMMENT_PRE = ['//', '/*', '<!--']

export type Platform = keyof typeof HIGHTLIGHT_COLOR.platform
