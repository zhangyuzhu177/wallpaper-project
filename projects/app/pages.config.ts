import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'

export default defineUniPages({
  globalStyle: {
    navigationStyle: 'default',
    navigationBarTitleText: 'picme',
    navigationBarBackgroundColor: '#f8f8f8',
    navigationBarTextStyle: 'black',
    backgroundColor: '#FFFFFF',
  },
  easycom: {
    autoscan: true,
    custom: {
      '^fg-(.*)': '@/components/fg-$1/fg-$1.vue',
      '^wd-(.*)': 'wot-design-uni/components/wd-$1/wd-$1.vue',
      '^(?!z-paging-refresh|z-paging-load-more)z-paging(.*)':
        'z-paging/components/z-paging$1/z-paging$1.vue',
    },
  },
  // 如果不需要tabBar，可以注释掉这个配置，或者直接删除
  tabBar: {
    color: '#4B5563',
    selectedColor: '#3E7BFA',
    backgroundColor: '#FFFFFF',
    borderStyle: 'black',
    height: '63px',
    fontSize: '12px',
    iconWidth: '24px',
    spacing: '4px',
    list: [
      {
        iconPath: 'static/tabbar/default/home.png',
        selectedIconPath: 'static/tabbar/active/home.png',
        pagePath: 'pages/home/index',
        text: '首页',
      },
      {
        iconPath: 'static/tabbar/default/classify.png',
        selectedIconPath: 'static/tabbar/active/classify.png',
        pagePath: 'pages/classify/index',
        text: '分类',
      },
      {
        iconPath: 'static/tabbar/default/user.png',
        selectedIconPath: 'static/tabbar/active/user.png',
        pagePath: 'pages/user/index',
        text: '我的',
      },
    ],
  },
})
