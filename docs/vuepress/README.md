---
navbar: true
---

## VuePress
## VuePress

### vuepress是什么

两部分组成

* 第一部分是一个**静态网站**生成器，它包含 **Vue 驱动**的主题系统和**插件 API**
* 另一部分书写技术文档而优化的**默认主题**
* 每一个由 VuePress 生成的页面都带有预渲染好的 HTML，具有**非常好的加载性能**【首屏加载】和**搜索引擎优化**（SEO）。同时，一旦页面被加载，Vue 将接管这些静态内容，并将其转换成一个完整的单页应用（SPA），其他的页面则会只在用户浏览到的时候才按需加载。
* 在构建时，我们会为应用创建一个服务端渲染（SSR）的版本，然后通过虚拟访问每一条路径来渲染对应的HTML。借鉴Nuxt



借鉴Nuxt，为什么不直接使用Nuxt开发

* VuePress 能做的事情，Nuxt 理论上确实能够胜任，但 Nuxt 是为构建应用程序而生的，而 VuePress 则专注在以内容为中心的静态网站上，同时提供了一些为技术文档定制的开箱即用



### 开发前准备

* VuePress 需要 node >=  8.6

* ```js
  // 创建并进入一个新目录
  mkdir vuepress-starter && cd vuepress-starter
  // 进行初始化
  yarn init 
  // 将 VuePress 安装为本地依赖
  yarn add -D vuepress 
  // 创建你的第一篇文档
  mkdir docs && echo '# Hello VuePress' > docs/README.md
  // 在 package.json 中添加一些 scripts【启动指令】
  {
    "scripts": {
      "docs:dev": "vuepress dev docs",
      "docs:build": "vuepress build docs"
    }
  }
  //启动本地服务
  yarn docs:dev 
  
  
  
  // 为什么不全局安装 VuePress？？
  官方文档明确说明不推荐全局安装VuePress
  // 为什么使用yarn
  官方文档明确说明 如果你的现有项目依赖了 webpack 3.x，我们推荐使用 Yarn 而不是 npm 来安装 VuePress。因为在这种情形下，npm 会生成错误的依赖树。
  // 具体推荐yarn可参考：  https://blog.csdn.net/hyupeng1006/article/details/93881364
  ```

  

### 目录结构

```js
.
├── docs
│   ├── .vuepress (可选的)
│   │   ├── components (可选的)
│   │   ├── theme (可选的)
│   │   │   └── Layout.vue
│   │   ├── public (可选的)
│   │   ├── styles (可选的)
│   │   │   ├── index.styl
│   │   │   └── palette.styl
│   │   ├── templates (可选的, 谨慎配置)
│   │   │   ├── dev.html
│   │   │   └── ssr.html
│   │   ├── config.js (可选的)
│   │   └── enhanceApp.js (可选的)
│   │ 
│   ├── README.md
│   ├── guide
│   │   └── README.md
│   └── config.md
│ 
└── package.json

// 类似Nuxt 文件结构文件夹名，文件名要严格遵守以上大小写，否则可能编译出错
```

- `docs/.vuepress`: 用于存放全局的配置、组件、静态资源等。
- `docs/.vuepress/components`: 该目录中的 Vue 组件将会被自动注册为全局组件。
- `docs/.vuepress/theme`: 用于存放本地主题。
- `docs/.vuepress/styles`: 用于存放样式相关的文件。
- `docs/.vuepress/styles/index.styl`: 将会被自动应用的全局样式文件，会生成在最终的 CSS 文件结尾，具有比默认样式更高的优先级。
- `docs/.vuepress/styles/palette.styl`: 用于重写默认颜色常量，或者设置新的 stylus 颜色常量。
- `docs/.vuepress/public`: 静态资源目录。
- `docs/.vuepress/templates`: 存储 HTML 模板文件。
- `docs/.vuepress/templates/dev.html`: 用于开发环境的 HTML 模板文件。
- `docs/.vuepress/templates/ssr.html`: 构建时基于 Vue SSR 的 HTML 模板文件。
  - 当你想要去自定义 `templates/ssr.html` 或 `templates/dev.html` 时，最好基于 [默认的模板文件 (opens new window)](https://github.com/vuejs/vuepress/blob/master/packages/%40vuepress/core/lib/client/index.dev.html)来修改，否则可能会导致构建出错。
- `docs/.vuepress/config.js`: 配置文件的入口文件，也可以是 `YML` 或 `toml`。
- `docs/.vuepress/enhanceApp.js`: 客户端应用的增强。



#### 页面默认路由

以上目录结构，我们将 `docs` 目录作为**入口目录** ，下面文件的相对路径是相对docs目录

| 文件的相对路径     | 页面路由地址   |
| ------------------ | -------------- |
| `/README.md`       | `/`            |
| `/guide/README.md` | `/guide/`      |
| `/config.md`       | `/config.html` |



### 基本配置

一个 VuePress 网站必要的配置文件是 `.vuepress/config.js`，它应该导出一个 JavaScript 对象

```js
module.exports = {
  title: 'Hello VuePress',
  description: 'Just playing around'
}

// 对于上述的配置，如果你运行起 dev server，你应该能看到一个页面，它包含一个页头，里面包含一个标题和一个搜索框。VuePress 内置了基于headers 的搜索 —— 它会自动为所有页面的标题、h2 和 h3 构建起一个简单的搜索索引。
```



#### 主题配置

一个 VuePress 主题应该负责整个网站的布局和交互细节   

* 对自定义主题感兴趣可以参考【https://vuepress.vuejs.org/zh/theme/ 】文档，  这里主要以默认主题学习使用
* 默认主题也并不是开箱即食，傻瓜式自动生成，也需要手动进行一些配置
  * 默认主题提供了一些选项，让你可以去自定义导航栏（navbar）、 侧边栏（sidebar）和 首页（homepage） 等





#### 应用级别的配置

由于 VuePress 是一个标准的 Vue 应用，你可以通过创建一个 `.vuepress/enhanceApp.js` 文件来做一些应用级别的配置，当该文件存在的时候，会被导入到应用内部。`enhanceApp.js` 应该 `export default` 一个钩子函数，并接受一个包含了一些应用级别属性的对象作为参数。你可以使用这个钩子来安装一些附加的 Vue 插件、注册全局组件，或者增加额外的路由钩子等： 具体参考【https://vuepress.vuejs.org/zh/plugin/option-api.html#enhanceappfiles】

```js
// 使用异步函数也是可以的
export default ({
  Vue, // VuePress 正在使用的 Vue 构造函数
  options, // 附加到根实例的一些选项
  router, // 当前应用的路由实例
  siteData, // 站点元数据
  isServer // 当前应用配置是处于 服务端渲染 或 客户端
}) => {
  // ...做一些其他的应用级别的优化
}
```



### 静态资源

#### 相对路径

VuePress会将所有的  Markdown  文件通过webpack编译成 vue 组件。  我们书写一切静态资源的时候尽可能的使用相对路径

注：你也使用 `~` 前缀来明确地指出这是一个 webpack 的模块请求，这将允许你通过 webpack 别名来引用文件或者 npm 的依赖

* 别名的配置`.vuepress/config.js` 中 [configureWebpack](https://vuepress.vuejs.org/zh/config/#configurewebpack) 来配置

  * ```js
    module.exports = {
      configureWebpack: {
        resolve: {
          alias: {
            '@alias': 'path/to/some/dir'
          }
        }
      }
    }
    ```

#### 公共资源

有时，你可能需要提供一个静态资源，但是它们并不直接被你的任何一个 markdown 文件或者主题组件引用 —— 举例来说，favicons 和 PWA 的图标，在这种情形下，你可以将它们放在 `.vuepress/public` 中， 它们最终会被复制到生成的静态文件夹中

#### 基础路径

如果你的网站会被部署到一个**非根路径**，你将需要在 `.vuepress/config.js` 中设置 `base`，举例来说，如果你打算将你的网站部署到 `https://foo.github.io/bar/`，那么 `base` 的值就应该被设置为 `"/bar/"` (应当总是以斜杠开始，并以斜杠结束)。

有了基础路径（Base URL），如果你希望引用一张放在 `.vuepress/public` 中的图片，你需要使用这样路径：`/bar/image.png`，然而，一旦某一天你决定去修改 `base`，这样的路径引用将会显得异常脆弱。为了解决这个问题，VuePress 提供了内置的一个 helper **`$withBase`**（它被注入到了 Vue 的原型上），可以帮助你生成正确的路径：

```html
<img :src="$withBase('/foo.png')" alt="foo">

<!-- 以上在Markdown 文件中也可食用。一个 base 路径一旦被设置，它将会自动地作为前缀插入到 .vuepress/config.js 中所有以 / 开始的资源路径中。-->
```



### 默认主题配置

#### 首页

默认的主题提供了一个首页（Homepage）的布局 (用于 [这个网站的主页](https://vuepress.vuejs.org/zh/))。想要使用它，需要在你的根级 `README.md` 的 [YAML front matter](https://vuepress.vuejs.org/zh/guide/markdown.html#front-matter) 指定 `home: true`。以下是一个如何使用的例子：

```yaml
---
home: true
heroImage: /hero.png
heroText: Hero 标题
tagline: Hero 副标题
actionText: 快速上手 →
actionLink: /zh/guide/
features:
- title: 简洁至上
  details: 以 Markdown 为中心的项目结构，以最少的配置帮助你专注于写作。
- title: Vue驱动
  details: 享受 Vue + webpack 的开发体验，在 Markdown 中使用 Vue 组件，同时可以使用 Vue 来开发自定义主题。
- title: 高性能
  details: VuePress 为每个页面预渲染生成静态的 HTML，同时在页面被加载的时候，将作为 SPA 运行。
footer: MIT Licensed | Copyright © 2018-present Evan You
---
```

你可以将相应的内容设置为 `null` 来禁用标题和副标题。

任何 `YAML front matter` 之后额外的内容将会以普通的 markdown 被渲染，并插入到 `features` 的后面



#### 导航栏

导航栏可能包含你的**页面标题**、**搜索框**、 **导航栏链接**、**多语言切换**、**仓库链接**，它们均取决于你的配置。

##### 导航栏logo

你可以通过 `themeConfig.logo` 增加导航栏 Logo ，Logo 可以被放置在**公共文件目录**：

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    logo: '/assets/img/logo.png',
  }
}
```

##### 导航栏链接

你可以通过 `themeConfig.nav` 增加一些导航栏链接:

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'External', link: 'https://google.com' },
    ]
  }
}
```

外部链接 `` 标签的特性将默认包含`target="_blank" rel="noopener noreferrer"`，你可以提供 `target` 与 `rel`，它们将被作为特性被增加到 `` 标签上：

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    nav: [
      { text: 'External', link: 'https://google.com', target:'_self', rel:'' },
      { text: 'Guide', link: '/guide/', target:'_blank' }
    ]
  }
}
```

当你提供了一个 `items` 数组而不是一个单一的 `link` 时，它将显示为一个 `下拉列表` ：

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    nav: [
      {
        text: 'Languages',
        ariaLabel: 'Language Menu',
        items: [
          { text: 'Chinese', link: '/language/chinese/' },
          { text: 'Japanese', link: '/language/japanese/' }
        ]
      }
    ]
  }
}
```

此外，你还可以通过嵌套的 `items` 来在 `下拉列表` 中设置分组：

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    nav: [
      {
        text: 'Languages',
        items: [
          { text: 'Group1', items: [/*  */] },
          { text: 'Group2', items: [/*  */] }
        ]
      }
    ]
  }
}
```

##### 禁用导航栏

你可以使用 `themeConfig.navbar` 来禁用所有页面的导航栏：

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    navbar: false
  }
}
```

你也可以通过 `YAML front matter` 来禁用某个指定页面的导航栏：

```yaml
---
navbar: false
---
```

#### 侧边栏

想要使 侧边栏（Sidebar）生效，需要配置 `themeConfig.sidebar`，基本的配置，需要一个包含了多个链接的数组：

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    sidebar: [
      '/',
      '/page-a',
      ['/page-b', 'Explicit link text']
    ]
  }
}
```

你可以省略 `.md` 拓展名，同时以 `/` 结尾的路径将会被视为 `*/README.md`，这个链接的文字将会被自动获取到（无论你是声明为页面的第一个 header，还是明确地在 `YAML front matter` 中指定页面的标题）。如果你想要显示地指定链接的文字，使用一个格式为 `[link, text]` 的数组



##### 嵌套的标题链接

默认情况下，侧边栏会自动地显示由当前页面的标题（headers）组成的链接，并按照页面本身的结构进行嵌套，你可以通过 `themeConfig.sidebarDepth` 来修改它的行为。默认的深度是 `1`，它将提取到 `h2` 的标题，设置成 `0` 将会禁用标题（headers）链接，同时，最大的深度为 `2`，它将同时提取 `h2` 和 `h3` 标题。

也可以使用 `YAML front matter` 来为某个页面重写此值：

```yaml
---
sidebarDepth: 2
---
```

##### 显示所有页面的标题链接

默认情况下，侧边栏只会显示由当前活动页面的标题（headers）组成的链接，你可以将 `themeConfig.displayAllHeaders` 设置为 `true` 来显示所有页面的标题链接：

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    displayAllHeaders: true // 默认值：false
  }
}
```

##### 活动的标题链接

默认情况下，当用户通过滚动查看页面的不同部分时，嵌套的标题链接和 URL 中的 Hash 值会实时更新，这个行为可以通过以下的配置来禁用：

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    activeHeaderLinks: false, // 默认值：true
  }
}
// 当你禁用此选项时，此功能的相应脚本将不会被加载,可作为性能优化的点
```

##### 侧边栏分组

你可以通过使用**对象**来将侧边栏划分成多个组：

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    sidebar: [
      {
        title: 'Group 1',   // 必要的
        path: '/foo/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 1,    // 可选的, 默认值是 1
        children: [
          '/'
        ]
      },
      {
        title: 'Group 2',
        children: [ /* ... */ ],
        initialOpenGroupIndex: -1 // 可选的, 默认值是 0
      }
    ]
  }
}
```

侧边栏的每个子组默认是可折叠的，你可以设置 `collapsable: false` 来让一个组永远都是展开状态。

一个侧边栏的子组配置同时支持 `sidebarDepth`字段用于重写默认显示的侧边栏深度(`1`)。**嵌套的侧边栏分组也是支持的**

##### 多个侧边栏

如果你想为不同的页面组来显示不同的侧边栏，首先，将你的页面文件组织成下述的目录结构

```text
.
├─ README.md
├─ contact.md
├─ about.md
├─ foo/
│  ├─ README.md
│  ├─ one.md
│  └─ two.md
└─ bar/
   ├─ README.md
   ├─ three.md
   └─ four.md
```

接着，遵循以下的侧边栏配置：

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    sidebar: {
      '/foo/': [
        '',     /* /foo/ */
        'one',  /* /foo/one.html */
        'two'   /* /foo/two.html */
      ],

      '/bar/': [
        '',      /* /bar/ */
        'three', /* /bar/three.html */
        'four'   /* /bar/four.html */
      ],

      // fallback
      '/': [
        '',        /* / */
        'contact', /* /contact.html */
        'about'    /* /about.html */
      ]
    }
  }
}

// 确保 fallback 侧边栏被最后定义。VuePress 会按顺序遍历侧边栏配置来寻找匹配的配置。也就是说月通用的路径越要写在后面
```

##### 自动生成侧栏

如果你希望自动生成一个仅仅包含了当前页面标题（headers）链接的侧边栏，你可以通过 `YAML front matter` 来实现：

```yaml
---
sidebar: auto
---
```

你也可以通过配置来在所有页面中启用它：

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    sidebar: 'auto'
  }
}
```

##### 禁用侧边栏

你可以通过 `YAML front matter` 来禁用指定页面的侧边栏：

```yaml
---
sidebar: false
---
```

#### 搜索框

##### 内置搜索

你可以通过设置 `themeConfig.search: false` 来禁用默认的搜索框，或是通过 `themeConfig.searchMaxSuggestions` 来调整默认搜索框显示的搜索结果数量

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    search: false,
    searchMaxSuggestions: 10
  }
}
```

你可以通过在页面的 frontmatter 中设置 tags 来优化搜索结果：

```yaml
---
tags:
  - 配置
  - 主题
  - 索引
---
```

你可以通过在页面的 frontmatter 中设置 search 来对单独的页面禁用内置的搜索框：

```yaml
---
search: false
---
```

**注：内置搜索只会为页面的标题、`h2` 、 `h3` 以及 `tags` 构建搜索索引。 如果你需要全文搜索，你可以使用`Algolia 搜索`**

##### Algolia 搜索 

你可以通过 `themeConfig.algolia` 选项来用 **Algolia 搜索** (opens new window)替换内置的搜索框。要启用 Algolia 搜索，你需要至少提供 `apiKey` 和 `indexName`：

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    algolia: {
      apiKey: '<API_KEY>',
      indexName: '<INDEX_NAME>'
    }
  }
}
 
// 不同于开箱即用的 内置搜索，Algolia 搜索 (opens new window)需要你在使用之前将你的网站提交给它们用于创建索引。
```

####  最后更新时间

你可以通过 `themeConfig.lastUpdated` 选项来获取每个文件最后一次 `git` 提交的 UNIX 时间戳(ms)，同时它将以合适的日期格式显示在每一页的底部：

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    lastUpdated: 'Last Updated', // string | boolean
  }
}
 
// 请注意，themeConfig.lastUpdated 默认是关闭的，如果给定一个字符串，它将会作为前缀显示（默认值是：Last Updated）。
/**使用须知：
 *
 *  由于 lastUpdated 是基于 git 的, 所以你只能在一个基于 git 的项目中启用它。此外，由于使用的时间戳来自 git commit，因此它将仅在给定  ** 页的第一次提交之后显示，并且仅在该页面后续提交更改时更新。
*/

```

#### 上 / 下一篇链接

上一篇和下一篇文章的链接将会自动地根据当前页面的侧边栏的顺序来获取。

你可以通过 `themeConfig.nextLinks` 和 `themeConfig.prevLinks` 来全局禁用它们：

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    // 默认值是 true 。设置为 false 来禁用所有页面的 下一篇 链接
    nextLinks: false,
    // 默认值是 true 。设置为 false 来禁用所有页面的 上一篇 链接
    prevLinks: false
  }
}
```

你也可以使用 `YAML front matter` 来明确地重写或者禁用它们

```yaml
---
prev: ./some-other-page
next: false
---
```

#### Git 仓库和编辑链接

当你提供了 `themeConfig.repo` 选项，将会自动在每个页面的导航栏生成生成一个 GitHub 链接，以及在页面的底部生成一个 `"Edit this page"` 链接。

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    // 假定是 GitHub. 同时也可以是一个完整的 GitLab URL
    repo: 'vuejs/vuepress',
    // 自定义仓库链接文字。默认从 `themeConfig.repo` 中自动推断为
    // "GitHub"/"GitLab"/"Bitbucket" 其中之一，或是 "Source"。
    repoLabel: '查看源码',

    // 以下为可选的编辑链接选项

    // 假如你的文档仓库和项目本身不在一个仓库：
    docsRepo: 'vuejs/vuepress',
    // 假如文档不是放在仓库的根目录下：
    docsDir: 'docs',
    // 假如文档放在一个特定的分支下：
    docsBranch: 'master',
    // 默认是 false, 设置为 true 来启用
    editLinks: true,
    // 默认为 "Edit this page"
    editLinkText: '帮助我们改善此页面！'
  }
}
```

你可以通过 `YAML front matter` 来禁用指定页面的编辑链接：

```yaml
---
editLink: false
---
```

#### 页面滚动

你可以通过 `themeConfig.smoothScroll` 选项来启用页面滚动效果

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    smoothScroll: true
  }
}
```

#### 自定义页面类

有时候你可能需要为特定页面添加一个 CSS 类名，以方便针对该页面添加一些专门的 CSS。这种情况下你可以在该页面的 YAML front matter 中声明一个 `pageClass`：

```yaml
---
pageClass: custom-page-class
---
```

只能在 `.vuepress/styles/index.styl` 中编写针对该页面的 CSS 

```css
/* .vuepress/styles/index.styl */

.theme-container.custom-page-class {
  /* 特定页面的 CSS */
}

/* 自定义样式应该写在 index.styl 内, 该文件可以让你方便地添加或覆盖样式. */
```

#### 特定页面的自定义布局

默认情况下，每个 `*.md` 文件将会被渲染在一个 `` 容器中，同时还有侧边栏、自动生成的编辑链接，以及上 / 下一篇文章的链接。如果你想要使用一个完全自定义的组件来代替当前的页面（而只保留导航栏），你可以再次使用 `YAML front matter` 来指定这个组件。

```yaml
---
layout: SpecialLayout
---
```

这将会为当前的页面渲染 `.vuepress/components/SpecialLayout.vue` 布局





### 最后更新时间

你可以通过 `themeConfig.lastUpdated` 选项来获取每个文件最后一次 `git` 提交的 UNIX 时间戳(ms)，同时它将以合适的日期格式显示在每一页的底部：

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    lastUpdated: 'Last Updated', // string | boolean
  }
}
```

请注意，`themeConfig.lastUpdated` 默认是关闭的，如果给定一个字符串，它将会作为前缀显示（默认值是：`Last Updated`）。

**如果不喜欢这种格式的时间，可以官网找到插件下的  last-update  ，进行配置，注意转化时间需要使用到moment包**





### 部署

将vuepress生成的博客自动化部署到`github.io`

1. 在 `docs/.vuepress/config.js` 中设置正确的 `base`。

   如果你打算发布到 `https://<USERNAME>.github.io/`，则可以省略这一步，因为 `base` 默认即是 `"/"`。

   如果你打算发布到 `https://<USERNAME>.github.io/<REPO>/`（也就是说你的仓库在 `https://github.com/<USERNAME>/<REPO>`），则将 `base` 设置为 `"/<REPO>/"`。

2. 在你的项目中，创建一个如下的 `deploy.sh` 文件（请自行判断去掉高亮行的注释）:

```bash
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

cd -
```



### PWA

vuepress 的pwa 基于插件  @vuepress/plugin-pwa

安装

* ```bash
  yarn add -D @vuepress/plugin-pwa
  ```

使用

* ```js
  plugins:  [
    [
     '@vuepress/pwa', {
       serviceWorker: true,
       updatePopup: {
         message: "发现垃圾桶增加新垃圾",
         buttonText: "更新"
       }
     }
    ]
   ]
  ```

  

* 如果需要国际化语言的话

```js
themeConfig: {
    '/': {
     serviceWorker: {
       updatePopup: {
         message: "New content is available.",
         buttonText: "Refresh"
       }
     }
    },
    '/zh/': {
     serviceWorker: {
       updatePopup: {
         message: "发现新内容可用",
         buttonText: "刷新"
       }
     }
    }
  },
  plugins: {
    '@vuepress/pwa': {
      serviceWorker: true,
      updatePopup: {
        '/': {
          message: "New content is available.",
          buttonText: "Refresh"
        },
        '/zh/': {
          message: "发现新内容可用",
          buttonText: "刷新"
        }
      }
    }
  }
```

* 也可自定义 提示更新的弹窗，具体查看官网

```md
提示

为了让你的网站完全地兼容 PWA，你需要:

在 .vuepress/public 提供 Manifest 和 icons
在 .vuepress/config.js 添加正確的 head links. 
更多细节，请参见 MDN docs about the Web App Manifest (opens new window).
```

例子

```js
module.exports = {
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'apple-touch-icon', href: '/icons/apple-touch-icon-152x152.png' }],
    ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
    ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
  ]
}
```



### 留言评论

#### valine 和 vssue

两种方案都是可以做到留言功能，不同点valine需要实名制，相比较vssue更麻烦一些。我们使用vssue来完成留言功能

#### vssue使用：

1.前往 [支持的代码托管平台 - 创建 OAuth App](https://vssue.js.org/zh/guide/supported-platforms.html) 

2.注册完毕后我们就可以得到`Client ID` 和 `Client secrets`

3.选中V3 ,V4版本

4.安装 `@vssue/vuepress-plugin-vssue` 和n ` @vssue/api-github-v4` 版本

5.vuepress项目中配置

```js
module.exports = {
  plugins: {
    '@vssue/vuepress-plugin-vssue': {
      // 设置 `platform` 而不是 `api`
      platform: 'github-v4',

      // 其他的 Vssue 配置 找到相应的项目信息
      owner: 'OWNER_OF_REPO',
      repo: 'NAME_OF_REPO',
      clientId: 'YOUR_CLIENT_ID',
      clientSecret: 'YOUR_CLIENT_SECRET',
    },
  },
};
```

6.使用

md文档中使用  `<Vssue :options="{ locale: 'zh' }" />`  标签使用，该配置仅在此页面生效，也可全局配置，可以在所有配置路由下的文档中增加评论功能，自行了解