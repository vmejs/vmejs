---
category: LifeCycle
---

# useMount

模拟组件的更新阶段的生命周期，与 `useEffect` 类似，但会忽略第一次(`useEffect`)执行。

## 用法

```js
import { useDidUpdate, useUpdate } from '@vmejs/react-hooks';

const App = () => {
  const [count, setCount] = useState(0);
  const [countUpdate, setCountUpdate] = useState(0);
  const update = useUpdate();

  useEffect(() => {
    setCount((prev) => prev++);
  });

  useDidUpdate(() => {
    setCountUpdate((prev) => prev++);
  });

  return (
    <>
      <div>useEffect: {count}</div>
      <div>useDidUpdate: {countUpdate}</div>
      <button onclick={() => update()}></button>
    </>
  );
};
```

## 参数

| 参数  | 说明                         | 类型         | 默认值    |
| ----- | ---------------------------- | ------------ | --------- |
| fn    | 用于在更新阶段调用的回调函数 | `() => void` | -         |
| deps? | 更新依赖项                   | []           | undefined |
