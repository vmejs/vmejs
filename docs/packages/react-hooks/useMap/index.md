---
category: LifeCycle
---

# useMap

操作 Map 数据结构的 hook, 原理上和 `useState` 类似

## 用法

```js
import { useMap } from '@vmejs/react-hooks';

export default function () {
  const[map, {set, setAll, get, reset, remove}] = useMap<string|number, string>([
    ['foo', 'value_foo'],
    ['bar', 'value_bar'],
    [222, 'value_number_1']
  ])
  // map 本身就是 Map 数据结构 它拥有所有 Map 的方法和属性
  return (
    <div>
      <span>{map.get('foo')}</span>
      <span>{get('bar')}</span>
    </div>
  )
}
```

## 参数

| 参数         | 说明                        | 类型                   | 默认值 |
| ------------ | --------------------------- | ---------------------- | ------ |
| initialValue | 可选项，传入默认的 Map 参数 | `Iterable<[any, any]>` | -      |
