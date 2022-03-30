import { createSSRApp } from 'vue'
import App from './App.vue'
// import MescrollBody from 'mescroll-uni/mescroll-body.vue'
// import sys from './sys.vue'
import { appPlugin } from './app/index'
import 'uno.css'
export function createApp() {
  const app = createSSRApp(App)
  app.use(appPlugin)
  return {
    app,
  }
}
