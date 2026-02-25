/** @type {import('prettier').Config} */
module.exports = {
	plugins: [require('prettier-plugin-tailwindcss'), require('@trivago/prettier-plugin-sort-imports')],
	arrowParens: 'always',
	bracketSpacing: true,
	printWidth: 120,
	proseWrap: 'always',
	semi: true,
	singleQuote: true,
	tabWidth: 2,
	trailingComma: 'es5',
	useTabs: true,
	jsxSingleQuote: false,
	endOfLine: 'lf',
	importOrder: ['^@(.*)$', '^[./]'],
	importOrderSeparation: false,
	importOrderSortSpecifiers: true,
};
