---
category: Browser（浏览器）
---

# useEventListener

在挂载时用原生的 [addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) 方法, 卸载时自动使用原生的 [removeEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener) 方法

## 用法

```js
import { useEventListener } from '@ vmejs/core';

useEventListener(document, 'visibilitychange', (evt) => {
  console.log(evt);
});
```

您还可以传递一个 ref 作为事件目标，useEventListener 当您更改目标时，将注销前一个事件并注册新事件。

```ts
import { useEventListener } from '@vueuse/core';

const element = ref<HTMLDivElement>();
useEventListener(element, 'keydown', (e) => {
  console.log(e.key);
});
```

```html
<template>
  <div v-if="cond" ref="element">Div1</div>
  <div v-else ref="element">Div2</div>
</template>
```

通过返回的方法来注销监听事件

```ts
import { useEventListener } from '@vueuse/core';

const cleanup = useEventListener(document, 'keydown', (e) => {
  console.log(e.key);
});

cleanup();
```
