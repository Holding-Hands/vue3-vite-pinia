#### 1. 安装格式化代码prettier

```js
// https://prettier.io/docs/en/install#eslint-and-other-linters
pnpm
add--
save - dev--
save - exact
prettier

// https://github.com/prettier/eslint-config-prettier#installation
npm
install--
save - dev
eslint - config - prettier
```

```js
查看配置规则
https://prettier.io/playground/
  module.exports = {
    "singleQuote": true, // 使用单引号代替双引号
    semi: false, // 每行末尾自动添加分号
    tabWidth: 2, // tab缩进大小,默认为2
    useTabs: false, // 使用tab缩进，默认false
    // 对象中打印空格 默认true
    // true: { foo: bar }
    // false: {foo: bar}
    bracketSpacing: true,
    // 箭头函数参数括号 默认avoid 可选 avoid| always
    // avoid 能省略括号的时候就省略 例如x => x
    // always 总是有括号
    arrowParens: 'avoid',
    printWidth: 80, // 换行长度，默认80
    disableLanguages: ['vue'], // 不格式化vue文件，vue文件的格式化单独设置
    endOfLine: 'auto', // 结尾是 \n \r \n\r auto
    eslintIntegration: false, //不让prettier使用eslint的代码格式进行校验
    jsxBracketSameLine: false, //  > 标签放在最后一行的末尾，而不是单独放在下一行
    jsxSingleQuote: false, // 在jsx中使用单引号代替双引号
    stylelintIntegration: false, //不让prettier使用stylelint的代码格式进行校验
    trailingComma: 'es5', // 在对象或数组最后一个元素后面是否加逗号（在ES5中加尾逗号）
    tslintIntegration: false, // 不让prettier使用tslint的代码格式进行校验1
    ignorePath: '.gitignore',
    overrides: [
      {
        files: '*.wxml',
        options: { parser: 'html' },
      },
      {
        files: '*.wxss',
        options: { parser: 'css' },
      },
      {
        files: '*.wxs',
        options: { parser: 'babel' },
      },
    ],
  };
```

###

```shell
可以轻松关闭与 Prettier 冲突或不必要的规则：npm install --save-dev eslint-config-prettier
对vue文件进行eslint：pnpm install --save-dev eslint eslint-plugin-vue 
将Prettier作为eslint规范来使用：pnpm install --save-dev eslint-plugin-prettier
项目运行时进行elsint检查：pnpm install -D vite-plugin-eslint
```

### eslint

https://zh-hans.eslint.org/docs/latest/use/getting-startedpnpm install --save-dev eslint eslint-plugin-vue

```shell
安装 @commitlint/cli @commitlint/config-conventional 进行提交校验
pnpm install --save-dev @commitlint/cli @commitlint/config-conventional
根目录下面配置，commitlint.config.cjs文件
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx --no-install commitlint --edit "$1"
```

1. #!/bin/sh
   这是一个 shebang 行，它告诉操作系统使用哪个解释器来执行剩余的脚本。这里，它指定使用 sh，即 Bourne shell 或其兼容的 shell
   来执行脚本。
2. "$(dirname "$0")/_/husky.sh"
   这一行是点命令（也称为 source 命令），用于读取并执行指定脚本中的命令。这里，它用于加载 Husky 的 helper 脚本，husky.sh。

* "$(dirname "$0")" 是一个命令替换，用来获取当前脚本文件（也就是这个 hook 脚本）的目录路径。$0 表示当前脚本的名称。
* _/husky.sh 是 Husky 内部使用的脚本，位于 .husky/_/ 目录下，主要用于设置一些环境变量和执行一些初始化操作，使得 hook 能正确运行。
* npx --no-install commitlint --edit "$1"
    * npx 是一个 npm 包运行器，允许你执行在本地 node_modules 目录中安装的包，或者临时下载并运行包。这里它用于运行
      commitlint。
* --no-install 选项告诉 npx 不要自动安装缺失的包，而应该使用已经安装的版本。
* commitlint 是一个工具，用来检查 Git 提交消息是否符合预设的规范。
* --edit "$1" 选项让 commitlint 检查通过 git 传递给 commit-msg 钩子的提交消息文件。$1 是这个脚本由 git
  调用时接收到的第一个参数，通常是一个包含提交信息的临时文件的路径。
* 总结
  这段 Husky 钩子脚本的作用是在提交消息被最终接受之前，使用 commitlint 来检查这个消息是否符合规定的格式。如果不符合，commitlint
  将返回一个非零退出码，这会导致 git 拒绝这次提交。这是一种自动化保证代码仓库的提交质量的手段。

```