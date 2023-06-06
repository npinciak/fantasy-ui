module.exports = {
  root: true,
  ignorePatterns: [
    '.vscode',
    'node_modules',
    'dist',
    'build',
    'scripts/*',
    'src/assets',
    'coverage',
    'test.ts',
  ],
  overrides: [
    {
      files: ['*.ts'],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@angular-eslint/template/process-inline-templates',
      ],
      parserOptions: {
        project: [
          './tsconfig.json',
          './tsconfig.app.json',
          './tsconfig.spec.json',
          './libs/sports-ui-sdk/tsconfig.json',
          './libs/sports-ui-sdk/tsconfig.lib.json',
        ],
        parser: '@typescript-eslint/parser',
        tsconfigRootDir: __dirname,
      },
      plugins: ['@typescript-eslint'],
      rules: {
        eqeqeq: 'off',
        curly: 'off',
        allowNamedFunctions: 'off',
        'arrow-body-style': 'off',
        'prefer-arrow/prefer-arrow-functions': 'off',
        'no-underscore-dangle': 'off',
        'no-shadow': 'off',
        'prefer-rest-params': 'off',
        'space-before-function-paren': 'off',
        'no-empty-function': 'off',
        'no-empty': ['warn', { allowEmptyCatch: true }],
        'no-console': ['error', { allow: ['warn', 'error'] }],
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/prefer-function-type': 'off',
        '@typescript-eslint/prefer-for-of': 'off',
        '@typescript-eslint/ban-types': 'warn',
        '@typescript-eslint/no-shadow': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/naming-convention': [
          'off',
          {
            selector: 'variable',
            modifiers: ['exported', 'const'],
            format: ['UPPER_CASE'],
          },
        ],
      },
    },
  ],
};