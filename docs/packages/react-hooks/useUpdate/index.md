---
category: LifeCycle
---

# useMount

强制让函数组件更新

## 用法

```js
import { useUpdate } from '@vmejs/react-hooks';

const App = () => {
  const update = useUpdate();

  return (
    <>
      <div>random: {Math.random()}</div>
      <button onClick={() => update()}> update </button>
    </>
  );
};
```

## 参数

| 参数 | 说明     | 类型 | 默认值 |
| ---- | -------- | ---- | ------ |
| -    | 强制更新 | -    | -      |
