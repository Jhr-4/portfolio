// @ts-check

import { dirname } from "path";
import { fileURLToPath } from "url";
import eslint from "@eslint/js";
// Correct import for tseslint plugin and parser
import tseslint from "typescript-eslint";
import nextPlugin from "@next/eslint-plugin-next";
// Import React plugins
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
// Import recommended config for React
import reactRecommended from "eslint-plugin-react/configs/recommended.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default [
  // Apply base recommended rules
  eslint.configs.recommended,
  // Apply TypeScript recommended rules
  ...tseslint.configs.recommended,
  // Apply React recommended rules
  reactRecommended,
  {
    // Global settings and plugins
    plugins: {
      "@typescript-eslint": tseslint.plugin, // Use tseslint.plugin
      "@next/next": nextPlugin,
      "react": reactPlugin, // Add react plugin
      "react-hooks": reactHooksPlugin, // Add react-hooks plugin
    },
    languageOptions: {
      parser: tseslint.parser, // Use tseslint.parser
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true
        },
        // Specify project for type-aware linting
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
      },
      globals: {
        // Define global variables if needed, e.g., for browser environments
        // 'browser': true,
        // 'node': true
      }
    },
    settings: {
      react: {
        version: "detect", // Automatically detect React version
      },
    },
    rules: {
      // Next.js specific rules
      "@next/next/no-html-link-for-pages": "error",
      "@next/next/no-img-element": "warn",

      // React specific rules
      "react/prop-types": "off", // Disabled as TypeScript handles prop types
      "react/react-in-jsx-scope": "off", // Not needed with Next.js >= 17 and new JSX transform
      "react-hooks/rules-of-hooks": "error", // Enforce Rules of Hooks
      "react-hooks/exhaustive-deps": "warn", // Check effect dependencies

      // TypeScript specific rules
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
      "@typescript-eslint/no-explicit-any": "warn",
      // Add any other TypeScript rules you need

      // General JavaScript rules
      "no-console": ["warn", { allow: ["warn", "error"] }],
      // Add any other general rules
    },
  },
  {
    // Override for TypeScript files if needed, though often handled globally now
    files: ["**/*.ts", "**/*.tsx"],
    // Specific rules or settings for TS/TSX files can go here
    // languageOptions are often inherited from the global config above
  },
  {
   // Ignore specific files or directories
   ignores: [
     "node_modules/",
     ".next/",
     "out/",
     // Add other paths to ignore
   ]
  }
];
