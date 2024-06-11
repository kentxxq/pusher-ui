import { createApp } from 'vue'
import pinia from './stores'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.config.globalProperties.$tt3 = '170'

app.use(pinia)
app.use(router)
// 查看环境变量
// console.debug(import.meta.env)

// svg图标插件要用
import 'virtual:svg-icons-register'

import SvgIcon from '@/components/SvgIcon/index.vue'
app.component('SvgIcon', SvgIcon)

app.mount('#app')
