module.exports = {
  env: {
    amd: true,
    browser: true,
    jest: true
  },
  extends: [
    "plugin:react/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  rules: {
    // enable additional rules
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "react/prop-types": "off",
    "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 1 }],
    "padded-blocks": ["error", "never"],
    // semi: ["error", "never"],
  },
  plugins: ["@typescript-eslint"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  globals: {
    localStorage: true,
    process: true,
  },
};
