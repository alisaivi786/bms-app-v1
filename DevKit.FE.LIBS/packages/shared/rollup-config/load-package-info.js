import fs from 'fs';

export const loadPackageJson = () => JSON.parse(fs.readFileSync('./package.json').toString());
