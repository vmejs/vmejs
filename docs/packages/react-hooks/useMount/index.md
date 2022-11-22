---
category: LifeCycle
---

# useMount

只在组件初始化时执行的 Hook。

## 用法

```js

import { useMount } from '@vmejs/react-hooks'

const MyComponent = () => {
  useMount(() => {
    console.log('mount');
  });

  return <div>Hello World</div>;
};
```
## 参数

| 参数 | 说明               | 类型         | 默认值 |
| ---- | ------------------ | ------------ | ------ |
| fn   | 初始化时执行的函数 | `() => void` | -      |
