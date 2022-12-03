import type { PackageManifest } from './types';

export const packages: PackageManifest[] = [
  {
    name: 'shared',
    target: 'es2015',
  },
  {
    name: 'core',
    target: 'es2015',
  },
  {
    name: 'vue-hooks',
    target: 'es2015',
  },
  {
    name: 'react-hooks',
    target: 'es2015',
  },
];
