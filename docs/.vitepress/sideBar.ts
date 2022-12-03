export const Guide = [
  { text: 'Get Started', link: '/guide/' },
  { text: '贡献指南', link: '/guide/contributing' },
];

export const functions = [Guide, { text: 'getDevice', link: '/packages/core/getDevice/' }];

export const vueHooks = [functions, { text: 'useEventListener', link: '/packages/vue-hooks/useEventListener/' }];

export const reactHooks = [
  functions,
  { text: 'useMount', link: '/packages/react-hooks/useMount/' },
  { text: 'useMap', link: '/packages/react-hooks/useMap/' },
];

export const DefaultSideBar = [
  { text: '快速指南', items: Guide },
  { text: '工具函数集合', items: functions },
  { text: 'Vue Hooks集合', items: vueHooks },
  { text: 'React Hooks集合', items: reactHooks },
];
