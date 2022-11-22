const Guide = [
  { text: 'Get Started', link: '/guide/' },
  { text: '贡献指南', link: '/guide/contributing' },
];

const functions = [Guide, { text: 'getDevice', link: '/packages/core/getDevice/' }];

const vueHooks = [functions, { text: '建设中', link: '' }];

const reactHooks = [functions, { text: '建设中', link: '' }];

const DefaultSideBar = [
  { text: '快速指南', items: Guide },
  { text: '工具函数集合', items: functions },
  { text: 'Vue Hooks集合', items: vueHooks },
  { text: 'React Hooks集合', items: reactHooks },
];

export default {
  base: '/vmejs/',
  title: 'vmejs',
  lang: 'zh-CN',
  themeConfig: {
    logo: '/logo.png',
    lastUpdated: true,
    lastUpdatedText: '最后修改时间',
    socialLinks: [{ icon: 'github', link: 'https://github.com/vmejs/vmejs' }],
    // editLinks: true,
    // editLink: {
    //   pattern: 'https://github.com/vmejs/vmejs/main/docs/:path',
    //   text: '为此页提供修改建议',
    // },
    nav: [
      { text: '快速指南', link: '/guide/' },
      { text: '函数集合', link: '/packages/core/getDevice/' },
    ],
    // 侧边栏
    sidebar: {
      '/guide/': [
        {
          text: '',
          items: DefaultSideBar,
        },
      ],
      '/packages/': [
        {
          text: '',
          items: DefaultSideBar,
        },
      ],
    },
  },
};