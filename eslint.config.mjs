import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Общие правила для удобства поддержки
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",

      // Правила для импортов и экспортов
      "import/no-duplicates": "warn",
      "import/order": "off", // Отключаем, так как используем prettier-plugin-sort-imports

      // Правила для React
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "react/display-name": "warn",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // Правила для Next.js
      "@next/next/no-html-link-for-pages": "warn",
      "@next/next/no-img-element": "warn",

      // Общие правила качества кода
      "prefer-const": "warn",
      "no-var": "error",
      "no-console": "warn",
      eqeqeq: ["warn", "always"],
      curly: ["warn", "all"],

      // Правила для async/await
      "no-return-await": "warn",
      "require-await": "warn",

      // Правила для объектов и массивов
      "object-shorthand": "warn",
      "array-callback-return": "warn",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];

export default eslintConfig;
