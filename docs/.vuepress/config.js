module.exports = {
  title: '虎比大雄的笔记',
  description: '虎比大雄的笔记,个人博客,vue3,react,vue2,webpack,node,前端',
  head: [
    ['meta', { name: 'keywords', content: '前端博客，个人笔记，vuepress使用' }],
    ['link', { rel: 'icon', href: '/assets/img/favicon.ico' }],
  ],

  themeConfig: {
    logo: '/assets/img/logo.png',
    nav: [{
      text: '主页',
      link: '/'
    },
    {
      text: '关于',
      link: '/about/'
    },
    { text: 'github', link: 'https://baidu.com', target: '_self', rel: '' },
    {
      text: '语言',
      items: [
        {
          text: 'Group1', items: [
            {
              text: 'About',
              link: '/about/'
            },
            {
              text: 'Guide',
              link: '/guide/'
            },
          ]
        },
        { text: 'Group2', items: [/*  */] }
      ]
    },
    ],
    sidebar: 'auto',
    search: true,
    searchMaxSuggestions: 10,
    lastUpdated: '更新时间', // string | boolean 最后更新时间
    //  // 默认值是 true 。设置为 false 来禁用所有页面的 下一篇 链接
    //  nextLinks: false,
    //  // 默认值是 true 。设置为 false 来禁用所有页面的 上一篇 链接
    //  prevLinks: false
  },
}