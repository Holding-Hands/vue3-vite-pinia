import { createApp } from 'vue'
import { globalRegister } from './global'
import App from './App.vue'
// 引入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from '@/router/index.ts'

// 重置的样式
import 'normalize.css'
// 引入通用样式
import '@/styles/index.scss'

// 引入pinia
import pinia from '@/store/pinia'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'
pinia.use(piniaPluginPersistedState)
const app = createApp(App)
app.use(ElementPlus).use(router).use(globalRegister).use(pinia)
app.mount('#app')
