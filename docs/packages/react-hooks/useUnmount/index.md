---
category: LifeCycle
---

# useMount

当组件被卸载时执行

## 用法

```js
import { useState } from 'react';
import { useUnmount } from '@vmejs/react-hooks';

const MyComponent = () => {
  useUnmount(() => {
    console.log('unmount');
  });

  return <div>Hello World</div>;
};

const App = () => {
  const [state, setState] = useState(true);

  return (
    <>
      <button onClick={() => setState((prev) => !prev)}>{state ? 'unmount' : 'mount'}</button>
      {state && <MyComponent />}
    </>
  );
};
```

## 参数

| 参数 | 说明               | 类型         | 默认值 |
| ---- | ------------------ | ------------ | ------ |
| fn   | 初始化时执行的函数 | `() => void` | -      |
