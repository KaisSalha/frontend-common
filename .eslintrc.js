module.exports = {
	parser: "@typescript-eslint/parser",
	extends: [
		"plugin:@typescript-eslint/recommended",
		"airbnb-base",
		"plugin:jest/recommended",
		"plugin:jest-formatting/recommended",
		"plugin:prettier/recommended",
		"airbnb",
		"airbnb/hooks",
		"prettier",
		"plugin:import/recommended",
		"plugin:import/typescript",
	],
	env: {
		browser: true,
	},
	rules: {
		camelcase: 0,
		"@typescript-eslint/camelcase": 0,
		"jsx-a11y/click-events-have-key-events": 0,
		"jsx-a11y/anchor-is-valid": 0,
		"react/no-unused-prop-types": 0,
		"react/jsx-props-no-spreading": 0,
		"react/no-unknown-property": ["error", { ignore: ["css"] }],
		"react/require-default-props": 0,
		"@typescript-eslint/no-explicit-any": 0,
		"import/prefer-default-export": 0,
		"@typescript-eslint/naming-convention": 0,
		"react/function-component-definition": [
			2,
			{ namedComponents: "arrow-function" },
		],

		// Enfore a blank line before return statements
		"padding-line-between-statements": [
			"error",
			{ blankLine: "always", prev: "*", next: "return" },
		],

		// Prefer it() over test(), unless outside a describe() block
		"jest/consistent-test-it": "error",

		// Prefer const foo = () => {...} over function foo() {...} (default: "expression")
		"func-style": "error",
		"func-names": ["error", "always", { generators: "as-needed" }],

		"import/no-extraneous-dependencies": [
			"error",
			{
				devDependencies: [
					// Custom patterns for "dev only" files in our code
					".storybook/**", // Storybook
					"stories/**", // Storybook
					"**/setupTests.js", // CRA Jest setup
					"**/*.config.js", // Config files
					"build/**", // Build/deploy tooling
					// The rest of these are copied from eslint-config-airbnb-base:
					// https://github.com/airbnb/javascript/blob/0375265cbd43635f8062615995a6a86f22fd0fc2/packages/eslint-config-airbnb-base/rules/imports.js#L71
					"test/**",
					"tests/**",
					"**/__tests__/**",
					"**/__mocks__/**",
					"test.{js,jsx}",
					"test-*.{js,jsx}",
					"**/*{.,_}{test,spec}.{js,jsx}",
				],
				optionalDependencies: false,
			},
		],

		"import/extensions": [
			"error",
			"ignorePackages",
			{
				js: "never",
				jsx: "never",
				ts: "never",
				tsx: "never",
			},
		],
		"jest/expect-expect": [
			"warn",
			{
				assertFunctionNames: ["expect", "expectSaga"],
			},
		],

		// We're fine with prop spreading
		"react/jsx-filename-extension": [1, { extensions: [".tsx", ".ts"] }],

		// Replace default eslint rule for TypeScript specific rule
		"no-unused-vars": "off",
		"@typescript-eslint/no-unused-vars": ["error"],

		"no-use-before-define": "off",
		"@typescript-eslint/no-use-before-define": ["error"],

		"no-shadow": "off",
		"@typescript-eslint/no-shadow": "error",
	},
	settings: {
		"import/parsers": {
			"@typescript-eslint/parser": [".ts", ".tsx"],
		},
		"import/resolver": {
			typescript: {
				// We rely on the default "project" config to use `<root>/tsconfig.json`
			},
		},
	},
	overrides: [
		{
			// Enable testing-library/react but only for test files
			files: ["**/*.test.[jt]s?(x)"],
			extends: ["plugin:testing-library/react"],
		},
	],
	globals: {
		__DEV__: false,
		jasmine: false,
		beforeAll: false,
		afterAll: false,
		beforeEach: false,
		afterEach: false,
		test: false,
		expect: false,
		describe: false,
		jest: false,
		it: false,
	},
};
