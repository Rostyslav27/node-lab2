module.exports = {
  "env": {
      "es2021": true,
      "node": true
  },
  "extends": [
      "standard",
      "plugin:@typescript-eslint/strict",
      "plugin:sonarjs/recommended"
  ],
  "overrides": [
      {
          "env": {
              "node": true
          },
          "files": [
              ".eslintrc.{js,cjs}"
          ],
          "parserOptions": {
              "sourceType": "script"
          }
      }
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
      "ecmaVersion": "latest",
      "sourceType": "module"
  },
  "plugins": [
      "@typescript-eslint",
      "sonarjs"
  ],
  "rules": {
    "semi": [2, "always"],
    "@typescript-eslint/no-explicit-any": "off",
    "quotes": [2, "double", { "avoidEscape": true }],
    "space-before-function-paren": "off",
    "comma-dangle": "off"
  }
}
