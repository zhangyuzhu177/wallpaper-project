// uno.config.ts
import process from 'node:process'
import {
  type Preset,
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

import { presetApplet, presetRemRpx, transformerAttributify } from 'unocss-applet'

// @see https://unocss.dev/presets/legacy-compat
// import { presetLegacyCompat } from '@unocss/preset-legacy-compat'

const isMp = process.env?.UNI_PLATFORM?.startsWith('mp') ?? false

const presets: Preset[] = []
if (isMp) {
  // 使用小程序预设
  presets.push(presetApplet(), presetRemRpx())
}
else {
  presets.push(
    // 非小程序用官方预设
    presetUno(),
    // 支持css class属性化
    presetAttributify(),
  )
}
export default defineConfig({
  presets: [
    ...presets,
    // 支持图标，需要搭配图标库，eg: @iconify-json/carbon, 使用 `<button class="i-carbon-sun dark:i-carbon-moon" />`
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
    // 将颜色函数 (rgb()和hsl()) 从空格分隔转换为逗号分隔，更好的兼容性app端，example：
    // `rgb(255 0 0)` -> `rgb(255, 0, 0)`
    // `rgba(255 0 0 / 0.5)` -> `rgba(255, 0, 0, 0.5)`
    // 与群友的正常写法冲突，先去掉！（2024-05-25）
    // presetLegacyCompat({
    //   commaStyleColorFunction: true,
    // }) as Preset,
  ],
  /**
   * 自定义快捷语句
   * @see https://github.com/unocss/unocss#shortcuts
   */
  shortcuts: [
    ['full', 'w-full h-full'],
    ['center', 'flex justify-center items-center'],
    ['absolute-x-center', 'absolute left-1/2 translate-x--1/2'],
    ['absolute-y-center', 'absolute top-1/2 translate-y--1/2'],
    ['absolute-center', 'absolute-x-center absolute-y-center'],
    ['text-xs', 'text-12px leading-18px'],
    ['text-sm', 'text-14px leading-20px'],
    ['text-md', 'text-16px leading-24px'],
    ['text-lg', 'text-18px leading-26px'],
    ['text-xl', 'text-20px leading-30px'],
    ['text-2xl', 'text-24px leading-36px'],
    ['text-3xl', 'text-28px leading-42px'],
    ['text-4xl', 'text-32px leading-48px'],
    ['text-5xl', 'text-40px leading-54px'],
    ['text-6xl', 'text-48px leading-60px'],
    ['subtitle-1', 'text-lg font-600'],
    ['subtitle-2', 'text-md font-600'],
    ['subtitle-3', 'text-sm font-500'],
    ['subtitle-4', 'text-xs font-500'],
    ['icon', 'size-5 text-grey-6'],
    ['icon:hover', 'icon hover:text-primary-1'],
  ],
  transformers: [
    // 启用 @apply 功能
    transformerDirectives(),
    // 启用 () 分组功能
    // 支持css class组合，eg: `<div class="hover:(bg-gray-400 font-medium) font-(light mono)">测试 unocss</div>`
    transformerVariantGroup(),
    // Don't change the following order
    transformerAttributify({
      // 解决与第三方框架样式冲突问题
      prefixedOnly: true,
      prefix: 'fg',
    }),
  ],
  rules: [
    [
      'p-safe',
      {
        padding:
          'env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)',
      },
    ],
    ['pt-safe', { 'padding-top': 'env(safe-area-inset-top)' }],
    ['pb-safe', { 'padding-bottom': 'env(safe-area-inset-bottom)' }],
  ],
  theme: {
    colors: {
      primary: { 1: '#0068B8', 2: '#257EDA', 3: '#004C9A', 4: '#E3EFFD' },
      grey: { 1: '#FFFFFF', 2: '#F7F9FC', 3: '#E4E7EC', 4: '#D0D5DD', 5: '#98A2B3', 6: '#667185', 7: '#475367', 8: '#344054', 9: '#1D2739' },
      alerts: {
        success: { 1: '#0F973D', 2: '#04802E', 3: '#E7F6EC' },
        error: { 1: '#D42620', 2: '#BA110B', 3: '#FBEAE9' },
        warning: { 1: '#F3A218', 2: '#AD6F07', 3: '#FEF6E7' },
      },
      white: { 0: '#FFFFFF00', 1: '#FFFFFF1A', 2: '#FFFFFF33', 3: '#FFFFFF4D', 4: '#FFFFFF66', 5: '#FFFFFF80', 6: '#FFFFFF99', 7: '#FFFFFFB3', 8: '#FFFFFFCC', 9: '#FFFFFFE6', 10: '#FFFFFF' },
      black: { 0: '#00000000', 1: '#0000001A', 2: '#00000033', 3: '#0000004D', 4: '#00000066', 5: '#00000080', 6: '#00000099', 7: '#000000B3', 8: '#000000CC', 9: '#000000E6', 10: '#000000' },
    },
  },
})

/**
 * 最终这一套组合下来会得到：
 * mp 里面：mt-4 => margin-top: 32rpx  == 16px
 * h5 里面：mt-4 => margin-top: 1rem == 16px
 *
 * 如果是传统方式写样式，则推荐设计稿设置为 750，这样设计稿1px，代码写1rpx。
 * rpx是响应式的，可以让不同设备的屏幕显示效果保持一致。
 */
