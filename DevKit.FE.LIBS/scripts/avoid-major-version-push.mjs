import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { parse } from 'semver';

const __dirname = process.cwd();
const foldersToExclude = ['node_modules', 'icons/native', 'icons/web'];

const getFiles = (dir) => {
	const requiredFiles = [];
	const files = fs.readdirSync(dir, { withFileTypes: true });

	for (const file of files) {
		if (file.isDirectory()) {
			const newDir = path.join(dir, file.name);
			if (!foldersToExclude.find((folder) => newDir.includes(folder))) {
				const files = getFiles(newDir);
				files.forEach((childFile) => {
					requiredFiles.push(childFile);
				});
			}
		} else {
			if (file.name === 'package.json') requiredFiles.push(path.join(dir, file.name));
		}
	}

	return requiredFiles;
};

const loadJSON = (path) => JSON.parse(fs.readFileSync(new URL(path, import.meta.url)));

const updatePackages = async () => {
	const packagesFiles = getFiles(__dirname);

	for (const file of packagesFiles) {
		const jsonPackage = await loadJSON(file);

		const fileDir = path.dirname(file);
		const updates = [];

		if (!jsonPackage.majorVersionRestrict) continue;

		const restrictedVersion = parseInt(jsonPackage.majorVersionRestrict);

		if (parse(jsonPackage.version).major > restrictedVersion || parse(jsonPackage.version).major < restrictedVersion)
			throw Error(`package ${file} version should lower than or equal ${restrictedVersion}.x`);

		console.log(`check for ${file}, version ${parse(jsonPackage.version).major}`);
	}
};

await updatePackages();
