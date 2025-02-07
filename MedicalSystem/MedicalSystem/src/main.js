import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// import LogIn from './views/LogIn.vue'
// const login = createApp(LogIn)

// login.use(createPinia())
// login.use(router)
// login.use(ElementPlus)
// login.mount('#app')
const app = createApp(App)
for (const [name, comp] of Object.entries(ElementPlusIconsVue)) {
    app.component(name, comp);
}
app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.mount('#app')