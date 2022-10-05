module.exports = {
     env: {
          browser: true,
          es2021: true,
     },
     extends: [
          'airbnb',
          'airbnb/hooks',
          'airbnb-typescript',
          'plugin:react/recommended',
          'plugin:@typescript-eslint/recommended',
          'plugin:react/jsx-runtime',
          'plugin:prettier/recommended',
     ],
     overrides: [],
     parser: '@typescript-eslint/parser',
     parserOptions: {
          ecmaVersion: 'latest',
          sourceType: 'module',
          project: ['tsconfig.json'],
     },
     plugins: ['react', '@typescript-eslint', 'prettier'],
}