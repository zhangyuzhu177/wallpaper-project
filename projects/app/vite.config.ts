import path, { resolve } from 'node:path'
import process from 'node:process'

import uni from '@dcloudio/vite-plugin-uni'
import { defineConfig, loadEnv } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default ({ mode }: any) => {
  const nodeEnv = {
    ...loadEnv(mode, path.relative(__dirname, '../server'), 'APP'),
    ...loadEnv(mode, path.relative(__dirname, '../server'), 'RSA_PUBLIC'),
  }

  process.env = {
    ...process.env,
    // 默认配置
    ...{
      VITE_CLIENT_PORT: '5001',
      VITE_CLIENT_BASE: '/',
      VITE_API_BASE: '/api',
      VITE_PROXY_TARGET: 'http://localhost:3000/api',
    },
    // 后端服务读取的配置
    ...Object.keys(nodeEnv).reduce((newObj, key) => {
      newObj[`VITE_${key}`] = nodeEnv[key]
      return newObj
    }, {} as Record<string, string>),
    // 环境变量
    ...loadEnv(mode, path.relative(__dirname, '../shared')),
    VITE_MODE: mode,
  }

  return defineConfig({
    // transpileDependencies: ['@dcloudio/uni-ui'],

    base: process.env.VITE_CLIENT_BASE || '/',
    define: {
      'process.env': {},
    },

    server: {
      host: '0.0.0.0',
      port: Number.parseInt(process.env.VITE_CLIENT_PORT!),
      proxy: {
        [process.env.VITE_API_BASE as string]: {
          target: process.env.VITE_PROXY_TARGET,
          changeOrigin: true,
          rewrite: path => path.replace(new RegExp(`^${process.env.VITE_API_BASE}`), ''),
          secure: false,
        },
      },
    },

    resolve: {
      alias: {
        '~': resolve(__dirname, './src'),
      },
    },

    plugins: [
      uni(),

      // 自动导入模块
      AutoImport({
        imports: [
          'vue',
          'uni-app',
        ],
        dts: 'src/types/auto-imports.d.ts',
        dirs: [
          'src/hooks',
          'src/api',
        ],
      }),
    ],
  })
}
