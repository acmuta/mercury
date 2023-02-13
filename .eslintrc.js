module.exports = {
	'env': {
		'browser': true,
		'es2021': true,
		'node': true,
	},
	'extends': [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
	],
	'parser': '@typescript-eslint/parser',
	'parserOptions': {
		'ecmaVersion': 2017,
		'sourceType': 'module',
	},
	'plugins': [
		'@typescript-eslint/eslint-plugin',
	],
	'ignorePatterns': [
		'dist/**/*.ts',
	],
	'rules': {
		'@typescript-eslint/adjacent-overload-signatures': ['error'],
		'@typescript-eslint/comma-dangle': ['error', {
			'arrays': 'always-multiline',
			'exports': 'always-multiline',
			'functions': 'always-multiline',
			'imports': 'always-multiline',
			'objects': 'always-multiline',
		}],
		'@typescript-eslint/default-param-last': ['error'],
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-inferrable-types': ['error', {
			'ignoreParameters': true,
			'ignoreProperties': true,
		}],
		'@typescript-eslint/no-unused-vars': ['error'],
		'@typescript-eslint/semi': ['error'],
		'comma-dangle': 'off',
		'default-param-last': 'off',
		'no-unused-vars': 'off',
		'indent': ['error', 'tab'],
		'linebreak-style': ['error', 'unix'],
		'quotes': ['error', 'single'],
		'semi': 'off',
	},
};
