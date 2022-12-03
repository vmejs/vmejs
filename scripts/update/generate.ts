import { join, relative, resolve } from 'path';
import fs from 'fs-extra';
import matter from 'gray-matter';
import fg from 'fast-glob';
import Git from 'simple-git';
import { packages } from '../../meta/packages';
import type { PackageIndexes, VmeFunction, VmePackage } from '../../meta/types';

const git = Git();
const DOCS_URL = '';
const DIR_ROOT = resolve(__dirname, '../../');
const DIR_DCS = resolve(__dirname, '../../docs/packages');
const DIR_SRC = resolve(__dirname, '../../packages');

async function getFunctions(dir: string) {
  const files = await fg('*', {
    onlyDirectories: true,
    cwd: dir,
    ignore: ['_*', 'dist', 'node_modules'],
  });
  files.sort();
  return files;
}

export function uniq<T extends any[]>(a: T) {
  return Array.from(new Set(a));
}

function getCategories(functions: VmeFunction[]): string[] {
  return uniq(functions.map((i) => i.category).filter(Boolean));
}

function normalizeDesc(desc: string): string {
  let description = (desc.replace(/\r\n/g, '\n').match(/# \w+[\s\n]+(.+?)(?:, |\. |\n|\.\n)/m) || [])[1] || '';
  description = description.trim();
  description = description.charAt(0).toLowerCase() + description.slice(1);
  return description;
}

export async function generateMetadata() {
  const pkgs: PackageIndexes = {
    packages: {},
    categories: [],
    functions: [],
    // vueHooks: [],
    // reactHooks: [],
    // configCategories: [],
    // configs: [],
  };
  for (const info of packages) {
    const dir = join(DIR_SRC, info.name);
    const docs = join(DIR_DCS, info.name);
    // package
    const pkg: VmePackage = {
      ...info,
      dir: relative(DIR_ROOT, dir).replace(/\\/g, '/'),
      docs: relative(DIR_ROOT, docs).replace(/\\/g, '/'),
    };
    pkgs.packages[info.name] = pkg;

    const functions = await getFunctions(dir);
    // console.log(pkg, functions, 'functions');

    // functions
    await Promise.all(
      functions.map(async (fnName) => {
        // console.log(fnName, 'fnName');

        const mdPath = join(docs, fnName, 'index.md');
        const tsPath = join(dir, fnName, 'index.ts');

        // parse markdown
        const mdRaw = await fs.readFile(mdPath, 'utf-8');
        const { content: md, data: frontmatter } = matter(mdRaw);

        // parse description
        const description = normalizeDesc(md);

        // functions
        const fn: VmeFunction = {
          name: fnName,
          package: pkg.name,
          lastUpdated: +(await git.raw(['log', '-1', '--format=%at', tsPath])) * 1000,
          docs: `${DOCS_URL}/${pkg.name}/${fnName}/`,
          description,
          category: frontmatter.category,
        };
        // pkg.name === 'configs' ? pkgs.configs.push(fn) : pkgs.functions.push(fn)
        pkgs.functions.push(fn);
      }),
    );
  }

  pkgs.functions.sort((a, b) => a.name.localeCompare(b.name));
  pkgs.categories = getCategories(pkgs.functions);
  // pkgs.configCategories = getCategories(pkgs.configs)

  return pkgs;
}
