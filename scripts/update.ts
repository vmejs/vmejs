import fs from 'fs-extra';
// import { metadata } from '../packages/metadata/metadata'
// import { updateContributors, updateCountBadge, updateFunctionREADME, updateFunctionsMD, updateImport, updateIndexREADME, updatePackageJSON, updatePackageREADME } from './utils'
import { generateMetadata, updateImport } from './update/';

async function run() {
  // 生成 meta 数据: meta.json
  const metadata = await generateMetadata();
  fs.writeJSON('meta/meta.json', metadata, { spaces: 2 });

  await Promise.all([
    updateImport(metadata),
    // updatePackageREADME(metadata),
    // updateIndexREADME(metadata),
    // updateFunctionsMD(metadata),
    // updateFunctionREADME(metadata),
    // updatePackageJSON(metadata),
    // process.env.CI && updateCountBadge(metadata),
    // process.env.CI && updateContributors(),
  ]);

  // await fs.copy('./CONTRIBUTING.md', './packages/contributing.md')
}

run();
