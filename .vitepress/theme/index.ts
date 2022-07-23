import DefaultTheme from 'vitepress/theme'
import Playground from './views/Playground.vue'
import Home from './views/Home.vue'
import './custom.css'
import 'uno.css'

export default {
  ...DefaultTheme,

  // @ts-expect-error - Where are the typings ?
  enhanceApp({ app }) {
    app.component('Playground', Playground)
    app.component('Home', Home)
  },
}
