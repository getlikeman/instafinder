import { createApp } from 'vue'
import App from './App.vue'
import { createWebHistory } from 'vue-router'
import createRouter from '/src/routes'
const router = createRouter(createWebHistory())
import Feed from './components/Feed.vue'
import Stories from './components/Stories.vue'
import Data from './components/Data.vue'
let app= createApp(App)
app.use(router).mount('#app')
app.component('Feed',Feed)
app.component('Stories',Stories)
app.component('Data',Data)

