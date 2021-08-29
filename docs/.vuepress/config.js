module.exports = {
  title: '虎比大雄的笔记',
  description: 'Just playing around',
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
      { text: 'github', link: 'https://baidu.com', target:'_self', rel:'' },
      {
        text: '语言',
        items: [
          { text: 'Group1', items: [
            {
              text: 'About',
              link: '/about/'
            },
            {
              text: 'Guide',
              link: '/guide/'
            },
          ] },
          { text: 'Group2', items: [/*  */] }
        ]
      },
    ],
    sidebar:'auto',
    search: true,
    searchMaxSuggestions: 10,
    lastUpdated: 'Last Updated', // string | boolean
    //  // 默认值是 true 。设置为 false 来禁用所有页面的 下一篇 链接
    //  nextLinks: false,
    //  // 默认值是 true 。设置为 false 来禁用所有页面的 上一篇 链接
    //  prevLinks: false
  },
}