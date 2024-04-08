/// <reference types="vite/client" />

// 解决报错its corresponding type declaration”
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent
  export default component
}

// 解决vue-router报找不到类型的错误
declare module 'vue-router'

// 解决报错：cannot find module pinia or its corresponding type declarations.
declare module 'pinia'

// 声明element 以及 引用element type
declare module 'element-plus/dist/locale/zh-cn.mjs'
