module.exports = {
  env: {
    browser: true,
    es2021: true,
    "jest/globals": true,
    "cypress/globals": true,
  },
  extends: "airbnb",
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        ".eslintrc.{js,cjs}",
      ],
      parserOptions: {
        sourceType: "script",
      },
    },
    {
      files: [
        "*.test.js", "*.cy.js",
      ],
      rules: {
        "react/jsx-filename-extension": 0,
        "prefer-arrow-callback": 0,
        "func-names": 0,
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  plugins: [
    "react", "jest", "cypress",
  ],
  rules: {
    indent: [
      "error",
      2,
    ],
    eqeqeq: "error",
    "no-trailing-spaces": "error",
    "object-curly-spacing": [
      "error", "always",
    ],
    "arrow-spacing": [
      "error", { before: true, after: true },
    ],
    "linebreak-style": [
      "error",
      "unix",
    ],
    quotes: [
      "error",
      "double",
    ],
    semi: [
      "error",
      "always",
    ],
    "no-console": 0,
    "import/newline-after-import": 0,
    "no-underscore-dangle": 0,
    "import/no-extraneous-dependencies": 0,
    "react/react-in-jsx-scope": 0,
    "react/prop-types": 0,
    "react/function-component-definition": 0,
    "no-param-reassign": 0,
  },
};
