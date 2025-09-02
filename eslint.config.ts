import globals from "globals";
import eslintJsPlugin from "@eslint/js";
import eslintTsPlugin from "typescript-eslint";
import eslintJsonPlugin from "@eslint/json";
import eslintCssPlugin from "@eslint/css";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: ["package-lock.json", "node_modules/**/*", "dist/**/*"]
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: { js: eslintJsPlugin },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser }
  },
  eslintTsPlugin.configs.recommended,
  {
    files: ["**/*.json"],
    plugins: { json: eslintJsonPlugin },
    language: "json/json",
    extends: ["json/recommended"]
  },
  {
    files: ["**/*.css"],
    plugins: { css: eslintCssPlugin },
    language: "css/css",
    extends: ["css/recommended"]
  }
]);
