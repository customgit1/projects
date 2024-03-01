import { createApp } from 'vue'
import 'vfonts/Lato.css'
import 'vfonts/FiraCode.css'
import 'virtual:uno.css'
import '@unocss/reset/sanitize/sanitize.css'
import '@unocss/reset/sanitize/assets.css'
import 'animate.css'
import "./style.css";
import App from './App.vue'
import { router } from "@/router";

const app = createApp(App)
app.use(router)

app.mount('#app')
