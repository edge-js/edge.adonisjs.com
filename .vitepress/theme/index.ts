import DefaultTheme from 'vitepress/theme'
import Playground from './components/Playground.vue'
import './custom.css'
import 'uno.css'

export default {
  ...DefaultTheme,

  // @ts-expect-error - Where are the typings ?
  enhanceApp({ app }) {
    app.component('Playground', Playground)
  },
}
