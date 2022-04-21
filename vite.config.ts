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
      open: true,
      proxy: {
        // https://cn.vitejs.dev/config/#server-proxy
        '/dev-api': {
          // target: 'http://localhost:8080',
          // target: 'http://vue.ruoyi.vip/prod-api', // ruoyi官方
          // target: 'https://gscgj.gongshu.gov.cn/prod-api', // 线上
          // target: 'http://192.168.11.9:8081', // 吴金莉
          // target: 'http://172.18.39.191:33223/', // 线上
          // target: 'http://172.18.39.200:33020/prod-api', // 测试
          target: 'http://21.254.250.161:8085', // 郭帅帅
          // target: 'http://192.168.11.237:8085', // 陶海峰
          // target: 'http://192.168.11.9:8084', // 吴金莉
          // target: 'http://wujl.vaiwan.com', // 吴金莉远程
          // target: 'http://192.168.11.63:8084', // 马天浩
          // target: 'http://192.168.11.74:8085', // 贾祺鑫
          // target: 'http://192.168.11.6:8085', // 郭帅帅
          // target: 'http://192.168.11.80:8085', // 范元龙
          changeOrigin: true,
          rewrite: p => p.replace(/^\/dev-api/, ''),
        },
        '/dataV-api': {
          // target: 'http://172.18.46.69:8900', // 大屏代理
          target: 'http://172.18.39.191:33222', // 大屏代理
          changeOrigin: true,
          rewrite: p => p.replace(/^\/dataV-api/, ''),
        },
      },
      watch: { ignored: ['**/dist/**'] },
    },
    plugins: createVitePlugins(env, command === 'build'),
  }
})
