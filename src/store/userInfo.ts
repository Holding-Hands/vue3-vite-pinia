// 你可以任意命名 `defineStore()` 的返回值，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。
// (比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。

export const useUserInfo = defineStore('user-info', {
  state: () => ({
    name: 'zcy',
    age: 18,
  }),
  getters: {
    doubleAge: (state) => state.age * 2,
  },
  actions: {
    // increment() {
    //   this.age++
    // },
  },
  // 持久化存储
  persist: {
    storage: sessionStorage, // 使用sessionStorage进行存储
    // paths: ['name'], // 用于指定 state 中哪些数据需要被持久化。[] 表示不持久化任何状态，undefined 或 null 表示持久化整个 state。
  },
})
