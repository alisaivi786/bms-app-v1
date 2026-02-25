/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const { transform } = require('@svgr/core');

const icons = fs.readdirSync('./svg');
const packageVersion = JSON.parse(fs.readFileSync('./package.json').toString()).version;

function clearAndUpper(text) {
	return text.replace(/-/, '').toUpperCase();
}

function toPascalCase(text) {
	return text.replace(/(^\w|-\w)/g, clearAndUpper);
}

const getIconPackageJson = (iconName, native) => ({
	name: `@devkit/icons-${iconName}${native ? '-native' : '-web'}`.replace(/--/g, '-'),
	version: packageVersion,
	main: 'index.js',
	type: 'module',
});

const getIconTypeFileContent = (iconName) => `/// <reference types="react" />
declare const ${iconName}: React.FC<React.SVGProps<SVGSVGElement>>;
export default ${iconName}`;

const getIconTypeForIndexContent = (iconName) =>
	`\nexport declare const ${iconName}: React.FC<React.SVGProps<SVGSVGElement>>;`;

const createIcons = (native) => {
	const mainFolderName = native ? './native' : './web';
	let indexFileContent = '';
	let indexTypeFileContent = '/// <reference types="react" />';

	if (fs.existsSync(mainFolderName)) rimraf.sync(mainFolderName);
	fs.mkdirSync(mainFolderName);

	icons.forEach(async (iconFile) => {
		const iconName = iconFile.replace('.svg', '');

		var pascalCasedIconName = toPascalCase(iconName) + 'Icon';

		if (pascalCasedIconName.toLowerCase() === 'native' || pascalCasedIconName.toLowerCase() === 'web')
			throw new Error('keywords native or web can not be used as icon name');

		if (!iconFile.match(/^[a-z][a-z1-9|-]*.svg$/gim))
			throw new Error(
				`icon '${iconFile}' has invalid name. please use characters digits or dash only and should start with character`
			);

		indexFileContent += `${
			indexFileContent ? '\n' : ''
		}export {default as ${pascalCasedIconName}} from './${pascalCasedIconName}';`;
		indexTypeFileContent += getIconTypeForIndexContent(pascalCasedIconName);

		// parent folder
		const folderPath = path.resolve(mainFolderName, pascalCasedIconName);

		fs.mkdirSync(folderPath);

		// package file
		const packageFileContent = getIconPackageJson(iconName, native);

		fs.writeFileSync(path.join(folderPath, 'package.json'), JSON.stringify(packageFileContent, null, 2));

		// type file
		const iconTypeFileContent = getIconTypeFileContent(pascalCasedIconName);

		fs.writeFileSync(path.join(folderPath, 'index.d.ts'), iconTypeFileContent);

		const iconContent = fs.readFileSync(path.resolve('./svg', iconFile));

		const jsCode = await transform(
			iconContent,
			{
				plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx', '@svgr/plugin-prettier'],
				icon: true,
				native,
				//	dimensions: native,
				// svgProps: native
				// 	? {}
				// 	: {
				// 			height: '1em',
				// 	  },
			},
			{ componentName: pascalCasedIconName }
		);

		const bundledIcon = require('@babel/core').transform(jsCode, {
			plugins: [
				[
					'@babel/plugin-transform-react-jsx',
					{
						runtime: 'automatic',
					},
				],
			],
		});

		fs.writeFileSync(path.join(folderPath, 'index.js'), bundledIcon.code);
	});

	if (native) {
		fs.writeFileSync('./native/index.js', indexFileContent);
		fs.writeFileSync('./native/package.json', JSON.stringify(getIconPackageJson('', native), null, 2));
		fs.writeFileSync('./native/index.d.ts', indexTypeFileContent);
	} else {
		fs.writeFileSync('./web/index.js', indexFileContent);
		fs.writeFileSync('./web/package.json', JSON.stringify(getIconPackageJson('', native), null, 2));
		fs.writeFileSync('./web/index.d.ts', indexTypeFileContent);
	}
};

createIcons(false);
createIcons(true);
