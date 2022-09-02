import { defineConfig, loadEnv } from 'vite'
import path from 'path'

import createVitePlugins from './build/index'
// https://vitejs.dev/config/

export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    base: './',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@root': path.resolve(__dirname),
        lodash: 'lodash-es',
      },
      // https://cn.vitejs.dev/config/#resolve-extensions
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    },
    // vite 代理
    server: {
      port: 9527,
      host: true,
      open: false,
      proxy: {
        '/prod-api': {
          // target: 'http://172.31.44.162:8800', // 大屏代理
          target: 'https://cpdev.watone.com.cn:30000/prod-api', // 大屏代理
          changeOrigin: true,
          rewrite: p => p.replace(/^\/prod-api/, ''),
        },
      },
      watch: { ignored: ['**/dist/**'] },
    },
    plugins: createVitePlugins(env, command === 'build'),
  }
})
