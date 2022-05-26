import { defineConfig, presetUno, presetAttributify, presetIcons } from 'unocss'
import { times } from 'lodash'
import path from 'path'

export default defineConfig({
  theme: {
    spacing: [
      ...['none', 'xs', 'sm', 'DEFAULT', 'lg', 'xl'],
      ...times(8).map(n => n + 2 + 'xl'),
    ].reduce((o, k, i) => {
      if (process.env.UNI_PLATFORM?.startsWith('mp')) o[k] = (i * 10).toFixed(2) + 'rpx'
      else o[k] = (i / 3.2).toFixed(2) + 'rem'
      return o
    }, {}),
  },
  presets: [presetUno(), presetAttributify(), presetIcons()],
  shortcuts: {
    'flex-center': 'flex flex-row justify-center items-center',
    'flex-center-col': 'flex flex-col justify-center items-center',
  },
  postprocess: [
    // 小程序不需要属性选择器
    process.env.UNI_PLATFORM?.startsWith('mp') &&
      (util => {
        if (!util.selector.startsWith('[')) return
        util.selector = undefined
        util.entries = []
      }),
  ].filter(e => !!e),
  include: [path.resolve(__dirname, 'src', '**')],
})
