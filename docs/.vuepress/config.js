module.exports = {
  // base:'/',
  base: '/myBlog/',
  title: '虎比大雄的笔记',
  description: '虎比大雄的笔记,个人博客,vue3,react,vue2,webpack,node,前端',
  head: [
    ['meta', {
      name: 'keywords',
      content: '前端博客，个人笔记，vuepress使用'
    }],
    ['link', {
      rel: 'icon',
      href: '/assets/img/favicon.ico'
    }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    // ['link', { rel: 'apple-touch-icon', href: '/icons/apple-touch-icon-152x152.png' }],
    // ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
    ['meta', { name: 'msapplication-TileImage', content: '/icons/144.png' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
  ],
  plugins: {
    '@vuepress/pwa': {
      serviceWorker: true,
      updatePopup: {
        message: "发现垃圾桶内容更新",
        buttonText: "刷新"
      }
    },
    '@vssue/vuepress-plugin-vssue': {
      // 设置 `platform` 而不是 `api`
      platform: 'github-v4',

      // 其他的 Vssue 配置
      owner: 'dajiangjunok',
      repo: 'myBlog',
      clientId: '08a3426ef7c9f7314ff8',
      clientSecret: 'e97acceed130b4ddcca392ec7db01d7159a06c7b',
    },
  },
  themeConfig: {
    logo: '/assets/img/logo.png',
    nav: [{
      text: '主页',
      link: '/'
    },
    {
      text: 'VuePress',
      link: '/vuepress/'
    },
    {
      text: '语言',
      items: [{
        text: 'Group1',
        items: [{
          text: 'VuePress',
          link: '/vuepress/'
        },
        {
          text: 'Guide',
          link: '/guide/'
        },
        {
          text: '留言',
          link: '/note/'
        },
        ]
      }]
    },
    {
      text: 'github',
      link: 'https://github.com/dajiangjunok',
      rel: ''
    }
    ],
    sidebar: 'auto',
    search: true,
    searchMaxSuggestions: 10,
    lastUpdated: '更新时间', // string | boolean 最后更新时间
    //  // 默认值是 true 。设置为 false 来禁用所有页面的 下一篇 链接
    //  nextLinks: false,
    //  // 默认值是 true 。设置为 false 来禁用所有页面的 上一篇 链接
    //  prevLinks: false
    '/zh/': {
      serviceWorker: {
        updatePopup: {
          message: "发现垃圾桶内容更新",
          buttonText: "刷新"
        }
      }
    }
  },
}