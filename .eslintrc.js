module.exports = {
  root: true,
  extends: ['@react-native-community', 'plugin:prettier/recommended'],
  plugins: ['react', 'react-native', 'prettier', 'prettier/react'],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
      graphql: true,
    },
  },
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'no-console': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
};
