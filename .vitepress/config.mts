import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({

  base: "/",
  appearance: 'dark',
  title: "main中世界",
  description: "代码库",
  titleTemplate: '代码库',
  lang: 'zh-CN',
  //侧边栏文字更改(移动端)
  sidebarMenuLabel: '目录',


  // 地址栏icon
  head: [["link", { rel: "icon", href: "/icon.png" }]],
  themeConfig: {
    // 添加背景颜色渐变
    // backgroundColors: ['#000', '#00f'],
    // backgroundGradientDirection: '45deg',
    // '文章目录',
    outlineTitle: '页面大纲',
    // outline 定义展示的标题级别
    outline: [2, 6],
    // 搜索 
    // 设置搜索框的样式
    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "搜索代码",
            buttonAriaLabel: "搜索代码",
          },
          modal: {
            noResultsText: "未找到相关结果",
            resetButtonTitle: "清除查询条件",
            footer: {
              selectText: "选择",
              navigateText: "切换",
            },
          },
        },
      },
    },
    // https://vitepress.dev/reference/default-theme-config
    logo: "/icon.png",
    // 导航栏
    nav: [
      { text: '首页', link: '/' },
      { text: 'npm包', link: '/code/npm.md' },
      // 二级导航栏
      {
        text: '代码仓库',
        items: [
          { text: '前端 代码片段', link: '/code/forward/forwrdOverview' },
          { text: '后端 代码片段', link: '/code/back/Overview' }
        ]
      },
      // 语言切换
      // SVG 图标
      { text: '网页模板', link: 'https://mywebsite.ljjk.love/' },
      { text: '博客', link: 'https://www.ljjk.love/' },
      { text: "关于", link: "/Life/Selfinfo" }
    ],

    // 文章左边目录
    sidebar: [
      { text: '介绍', link: '/code/Preface.md' },
      {
        text: '前端',
        collapsed: false,
        items: [
          { text: '总览', link: '/code/forward/forwrdOverview' },
          { text: 'css', link: '/code/forward/css.md' },
          { text: 'Sass', link: '/code/forward/Sass.md' },
          { text: 'jacaScript', link: '/code/forward/javascript.md' },
          { text: 'typeScrpit', link: '/code/forward/typeScrpit.md' },
          { text: 'vue2', link: "/code/forward/vue2.md" },
          { text: 'vue3', link: '/code/forward/vue3.md' },

        ]

      },
      {
        text: '后端',
        collapsed: true,
        items: [
          { text: '总览', link: '/code/back/Overview' },
          { text: 'git常用命令', link: '/code/back/gitOrder.md' },
          { text: 'springboot', link: '/code/back/springboot.md' },
        ]
      },
      {
        text: '数据库',
        collapsed: true,
        items: [
          { text: '总览', link: '/code/back/Overview' },
          { text: 'git常用命令', link: '/code/back/gitOrder.md' },
          { text: 'springboot', link: '/code/back/springboot.md' },
        ]
      },
      {
        text: '运维',
        collapsed: true,
        items: [
          { text: 'nginx配置', link: '/code/back/Nginx.md' },
        ]

      },

    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/jskilyj' }
    ],

    // 页脚配置
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    lastUpdated: true, // 修改这一行配置
    // 页脚
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-2024 备案号：<a href="https://beian.miit.gov.cn/" target="_blank">豫ICP备2024059788号</a>',
    },



  },


})
