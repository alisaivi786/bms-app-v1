import chalk from 'chalk';
import fs from 'fs';
import path, { dirname } from 'path';
import nodeSass from 'sass';

export const copyTailwind = (themeFiles = []) => {
	const cssOutput = [];

	return {
		name: 'devkit-copy-tailwind-plugin',
		buildStart: () => {
			console.log(chalk.green('🎨 [devkit-copy-tailwind-plugin] CSS Bundle'));
		},
		load: (filePath) => {
			if (/.scss$/i.test(filePath)) {
				console.log(`|- ${path.basename(filePath)}`);
				const fileContent = fs.readFileSync(filePath).toString();

				if (fileContent.includes('@tailwind')) {
					cssOutput.splice(0, 0, nodeSass.renderSync({ data: fileContent }).css);
				} else {
					cssOutput.push(nodeSass.renderSync({ data: fileContent }).css);
				}
			} else if (/.css$/i.test(filePath)) {
				console.log(`|- ${path.basename(filePath)}`);
				const fileContent = fs.readFileSync(filePath).toString();

				if (fileContent.includes('@tailwind')) {
					cssOutput.splice(0, 0, fileContent);
				} else {
					cssOutput.push(fileContent);
				}
			}
		},
		buildEnd: (error) => {
			if (!error && cssOutput.length > 0) {
				let result = cssOutput.join('\n');

				if (!fs.existsSync('dist')) {
					fs.mkdirSync('dist');
				}

				if (!fs.existsSync('dist/tailwind')) {
					fs.mkdirSync('dist/tailwind');
				}

				if (!fs.existsSync('dist/tailwind/theme')) {
					fs.mkdirSync('dist/tailwind/theme');
				}

				fs.writeFileSync('dist/tailwind/main.css', result);

				themeFiles.forEach(({ file, output }) => {
					const fileName = path.basename(file);
					if (/.scss$/i.test(fileName)) {
						const directoryName = path.resolve('.', path.dirname(file));
						const fileContent = fs.readFileSync(file).toString();
						const cssFileContent = nodeSass
							.renderSync({
								file: file,
								includePaths: [directoryName],
							})
							.css.toString();
						fs.writeFileSync(output, cssFileContent);
					} else {
						fs.copyFileSync(file, output);
					}
				});

				fs.copyFileSync('tailwind.config.js', 'dist/tailwind/tailwind.config.cjs');
			}
		},
	};
};
