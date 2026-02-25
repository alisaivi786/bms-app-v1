/** @type {import('eslint').Linter.Config} */
module.exports = {
	env: {
		browser: true,
		amd: true,
		node: true,
		'jest/globals': true,
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier',
		'eslint-config-prettier',
		'plugin:import/recommended',
		'plugin:jest/recommended',
	],
	overrides: [],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['react', '@typescript-eslint', 'jest'],
	rules: {
		'@typescript-eslint/indent': 0,
		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'single'],
		semi: ['error', 'always'],
		'no-console': ['error'],
		'@typescript-eslint/no-explicit-any': ['error'],
		'react/react-in-jsx-scope': 0,
		'react/prop-types': 0,
		'@typescript-eslint/no-unused-vars': 2,
		'react/jsx-curly-brace-presence': 2,
		'import/named': 0,
		'padding-line-between-statements': [
			'error',
			{ blankLine: 'always', prev: 'let', next: '*' },
			{ blankLine: 'never', prev: 'let', next: 'let' },
			{ blankLine: 'any', prev: 'let', next: 'const' },
			{ blankLine: 'always', prev: 'const', next: '*' },
			{ blankLine: 'any', prev: 'const', next: 'const' },
			{ blankLine: 'any', prev: 'const', next: 'let' },
			{ blankLine: 'always', prev: '*', next: 'return' },
			{ blankLine: 'always', prev: '*', next: 'if' },
			{ blankLine: 'always', prev: '*', next: 'for' },
			{ blankLine: 'always', prev: '*', next: 'export' },
			{ blankLine: 'always', prev: 'import', next: '*' },
			{ blankLine: 'never', prev: 'import', next: 'import' },
		],
	},
	settings: {
		react: {
			version: 'detect',
		},
		'import/resolver': {
			node: {
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
			},
		},
	},
};
