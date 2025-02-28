import {FlatCompat} from '@eslint/eslintrc';
import eslintConfigPrettier from "eslint-config-prettier";
import {fileURLToPath} from "url";
import {dirname} from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ['next', 'next/core-web-vitals', 'next/typescript'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      'react-hooks/exhaustive-deps': 'off',
      //  'react/no-unescaped-entities': 'off',
      //  '@next/next/no-page-custom-font': 'off',
    },
  }),
  eslintConfigPrettier,
]
export default eslintConfig
