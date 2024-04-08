module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'prettier', './.eslintrc-auto-import.json',],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    // 解决报错 The keyword 'interface' is reserve
    // 需要安装 pnpm install @typescript-eslint/parser
    parser: "@typescript-eslint/parser"
  },
  plugins: ['vue', 'prettier'],
  rules: {
    'vue/multi-word-component-names': 'off',
    'vue/no-v-model-argument': 'off',
    'no-undef': 'off',
    'prettier/prettier': 'error',
  },
  globals: { $ref: 'readonly', $computed: 'readonly', $shallowRef: 'readonly', $customRef: 'readonly', $toRef: 'readonly' },
};
