import { encrypt, decrypt } from '@vmejs/shared';
import { createStorage } from './index';
import { vi, expect, describe, it } from 'vitest';

describe('crypt test', () => {
  it('test crypto', () => {
    const res = encrypt('hello world');
    expect(decrypt(res)).toEqual('hello world');
  });

  it('The storage get key', () => {
    const local = createStorage({
      storage: localStorage,
      hasEncrypt: true,
      prefixKey: 'hello',
      timeout: 333,
      iv: 'vmevmevmevmevmev',
      key: 'vmevmevmevmevmev',
    });
    const key = 'string';
    const val = 'vme';
    local.setKey(key, val);
    expect(local.getKey(key)).toEqual(val);
  });

  it('The storage no encrypt', () => {
    const session = createStorage({
      storage: sessionStorage,
      hasEncrypt: false,
    });
    const key = 'sss';
    const val = 'vmejs';
    session.setKey(key, val);
    expect(session.getKey(key)).toEqual(val);
  });
});
