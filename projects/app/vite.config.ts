import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    transpileDependencies: ['@dcloudio/uni-ui'],
    plugins: [
      uni(),

      // 自动导入模块
      AutoImport({
        imports: [
          'vue',
          'uni-app',
        ],
        dts: 'src/types/auto-imports.d.ts',
      }),
    ],
    resolve: {
      alias: {
        '~': resolve(__dirname, './src'),
      },
    },
  }
})
