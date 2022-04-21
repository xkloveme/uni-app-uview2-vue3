/*
 * @Author: xkloveme
 * @Date: 2022-04-21 14:31:03
 * @LastEditTime: 2022-04-21 15:00:57
 * @LastEditors: xkloveme
 * @Description: 插件中心
 * @FilePath: /uni-app-uview2-vue3/build/index.ts
 * @Copyright © xkloveme
 */
import vue from '@vitejs/plugin-vue'
import uni from '@dcloudio/vite-plugin-uni'
import ViteRestart from 'vite-plugin-restart'
import AutoImport from 'unplugin-auto-import/vite'
import Inspect from 'vite-plugin-inspect'
import Unocss from 'unocss/vite'
import UniMeta from './vite-plugin-uni-meta'
import UniProvider from './vite-plugin-uni-provider'
import Espower from './vite-plugin-espower'
import GitVersion from './vite-plugin-version'
import SetupExtend from './vite-plugin-setup-extend'
function isTest() {
  return process.env.NODE_ENV === 'test'
}
export default function createVitePlugins(viteEnv, isBuild = false) {
  const { VITE_APP_ENV } = viteEnv
  const vitePlugins = [
    Inspect(), //vite分析工具
    UniMeta(), //自动生成页面meta信息和路由并注册pages.json
    UniProvider(), //自动注册页面全局组件
    SetupExtend(), //setup扩展
    Unocss(),
    ViteRestart({
      restart: ['src/pages.js', 'src/app.config.ts'],
    }),
    AutoImport({
      imports: [
        'vue',
        'uni-app',
        { '@/app/index': ['app'] },
        { 'power-assert': [['default', 'assert']] },
      ],
      dts: 'declare/auto-imports.d.ts',
    }),
    isTest() ||
      uni({
        vueOptions: {
          reactivityTransform: true,
        },
      }),
  ]
  VITE_APP_ENV === 'development' && vitePlugins.push(Espower())
  isBuild && vitePlugins.push(GitVersion(viteEnv))
  return vitePlugins
}
