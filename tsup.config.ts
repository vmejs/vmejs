import { defineConfig } from 'tsup';

const baseConfig = {
  dts: true, // 添加 .d.ts 文件
  metafile: true, // 添加 meta 文件
  minify: true, // 压缩
  splitting: false,
  sourcemap: true, // 添加 sourcemap 文件
  clean: true, // 是否先清除打包的目录，例如 dist
  outExtension: outExtensionFn,
};

export default defineConfig([
  {
    entry: ['packages/core/index.ts'],
    format: ['cjs', 'esm', 'iife'],
    outDir: 'packages/core/dist',
    ...baseConfig,
  },
  {
    entry: ['packages/shared/index.ts'],
    format: ['cjs', 'esm', 'iife'],
    outDir: 'packages/shared/dist',
    ...baseConfig,
  },
  {
    entry: ['packages/vue-hooks/index.ts'],
    format: ['cjs', 'esm', 'iife'],
    outDir: 'packages/vue-hooks/dist',
    ...baseConfig,
  },
  {
    entry: ['packages/react-hooks/index.ts'],
    format: ['cjs', 'esm', 'iife'],
    outDir: 'packages/react-hooks/dist',
    ...baseConfig,
  },
]);

function outExtensionFn({ format }) {
  if (format === 'esm') return { js: `.${format}.js` };
  if (format === 'iife') return { js: `.mjs` };
  return { js: `.js` };
}
