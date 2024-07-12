import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// @ts-ignore
import eslint from 'vite-plugin-eslint'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'

import { loadEnv } from 'vite'

// import path from 'path'
// const pathSrc = path.resolve(__dirname, 'src')

const isProduction = process.env.NODE_ENV === 'production'
// const { name }: Record<string, any> = require('./package.json')
const timeStamp = new Date().getTime()
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // loadEnv传入三个参数
  // mode：模式 envDir：环境变量配置文件所在目录 prefix：接受的环境变量前缀，默认为 VITE_
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [
      vue(),
      eslint({ lintOnStart: true }), // 项目运行时对其进行eslint检查,
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.md$/, // .md
        ],
        imports: ['vue', 'vue-router', 'pinia'],
        eslintrc: {
          enabled: true, // 默认false, true启用。生成一次就可以，避免每次工程启动都生成
          filepath: './.eslintrc-auto-import.json', // 生成json文件
          globalsPropValue: true,
        },
        // 声明文件生成位置和文件名称
        dts: './src/type/auto-import.d.ts',
        // 按需导入element-plus
        resolvers: [
          ElementPlusResolver(),
          // 自动导入图标组件
          IconsResolver({
            prefix: 'Icon',
          }),
        ],
      }),
      Components({
        // 按需导入element-plus
        resolvers: [
          ElementPlusResolver(),
          // 自动注册图标组件
          IconsResolver({
            enabledCollections: ['ep'],
          }),
        ],
        dts: './src/type/components.d.ts', // 生成 `.d.ts` 文件
        deep: true,
        include: [/\.vue$/, /\.vue\?vue/], // 包含文件的正则表达式
        extensions: ['vue'],
        dirs: ['src/components', 'src/views', 'src/layout'],
      }),
      Icons({
        autoInstall: true,
      }),
    ],
    // 反向代理解决跨域问题
    server: {
      // host: 'localhost', // 只能本地访问
      // host: '0.0.0.0', // 局域网别人也可访问
      port: Number(env.VITE_APP_PORT),
      // 运行时自动打开浏览器
      open: true,
      proxy: {
        // env种获取的代理 /api
        [env.VITE_BASE_API]: {
          target: env.VITE_BASE_BASE_API,
          rewrite: (path) => path.replace(new RegExp('^' + env.VITE_BASE_API), ''),
          changeOrigin: true,
        },
      },
    },
    // 别名配置
    resolve: {
      alias: {
        '@': '/src/',
        '@components': '/src/components/',
        '@assets': '/src/assets/',
        '@static': '/public/static',
        '@mitt': '/src/mitt',
        '@styles': '/src/styles',
        '@layout': '/src/layout',
        '@router': '/src/router',
        '@store': '/src/store',
      },
    },
    base: isProduction ? `./` : '/',
    build: {
      target: 'esnext', // 使用模块联邦必须加
      // 生成静态资源的存放路径
      assetsDir: 'static/img/',
      // 构建后是否生成 source map 文件
      sourcemap: !isProduction,
      // chunk 大小警告的限制
      chunkSizeWarningLimit: 1500,
      // 生产环境移除 console debugger
      minify: 'terser', // 代码压缩 需要安装pnpm i terser
      terserOptions: {
        compress: {
          drop_console: isProduction,
          drop_debugger: isProduction,
        },
      },
      rollupOptions: {
        output: {
          chunkFileNames: `static/js/${timeStamp}.js`,
          entryFileNames: `static/js/${timeStamp}.js`,
          assetFileNames: `static/[ext]/${timeStamp}.[ext]`,
          // 解决打包时Some chunks are larger警告
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString()
            }
          },
        },
      },
    },
  }
})
