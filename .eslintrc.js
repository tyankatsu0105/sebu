module.exports = {
  overrides: [
    {
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier",
      ],
      files: ["*.ts", "*.tsx", "*.js", "*.jsx"],
      parser: "@typescript-eslint/parser",
      plugins: [
        "simple-import-sort",
        "typescript-sort-keys",
        "sort-keys-fix",
        "sort-destructure-keys",
        "@typescript-eslint",
      ],
      rules: {
        "simple-import-sort/exports": "warn",
        "simple-import-sort/imports": "warn",
        "sort-destructure-keys/sort-destructure-keys": "warn",
        "sort-keys-fix/sort-keys-fix": "warn",
        "typescript-sort-keys/interface": "warn",
        "typescript-sort-keys/string-enum": "warn",
      },
    },
  ],
  root: true,
};
