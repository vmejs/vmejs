# Storage

封装 localStorage 和 sessionStorage, 满足应对业务开发需求，提供加密、序列化

## 使用

```ts
import { createStorage } from '@vmejs/core';

const local = createStorage({
  storage: localStorage,
  hasEncrypt: true,
  prefixKey: 'hello',
  timeout: 333,
  iv: 'vmevmevmevmevmev',
  key: 'vmevmevmevmevmev',
});

local.setKey('vme', 'crazy');

// do something
```

## 参数

- storage(localStorage | sessionStorage)
- prefixKey(指定前缀，根据业务可灵活配置)
- timeout(过期时间 秒/单位)
- hasEncrypt(是否加密)
- key(加密 key)
- iv(加密 iv)

## 返回值

```ts
class VmeStorage {
  public setKey(k: string, v: any, expire: number = DEFAULT_EXPIRE): void;
  public getKey(k: string): any;
  public removeKey(key: string): void;
  public clear: () void;
}
```
