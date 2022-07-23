// @ts-expect-error missing type
import base from '@vue/theme/config'
import { defineConfig } from 'vitepress'
import { highlight } from './plugins/highlight'

const themeConfig = async () => {
  const config = await base()
  config.markdown.highlight = await highlight()
  return config
}

export default defineConfig({
  extends: themeConfig,
  lang: 'en-US',
  title: 'Edge.JS',
  description: 'Node.js templating engine with fresh air',
  lastUpdated: true,
  srcDir: 'src',

  head: [['link', { rel: 'icon', href: '/edge-logo.png' }]],

  themeConfig: {
    siteTitle: 'Edge.JS',
    logo: '/edge-logo.png',

    // @ts-expect-error TODO: add real credentials for Algolia
    algolia: {
      apiKey: '',
      indexName: 'edge',
    },

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Documentation', link: '/docs/introduction/what-is-edge', activeMatch: 'docs' },
      { text: 'Reference', link: '/reference/globals', activeMatch: 'reference' },
      { text: 'Playground', link: '/playground/skeleton', activeMatch: 'playground' },
    ],

    /**
     * Sidebar items
     */
    sidebar: {
      '/docs/': [
        {
          text: 'Introduction',
          collapsible: true,
          items: [
            { text: 'What is Edge ?', link: '/docs/introduction/what-is-edge' },
            { text: 'Getting Started', link: '/docs/introduction/getting-started' },
          ],
        },
        {
          text: 'Guide',
          collapsible: true,
          items: [
            { text: 'Rendering', link: '/docs/guide/rendering' },
            { text: 'Templating Syntax', link: '/docs/guide/templating-syntax' },
            { text: 'Data Flow', link: '/docs/guide/data-flow' },
            { text: 'Conditionals', link: '/docs/guide/conditionals' },
            { text: 'Loops', link: '/docs/guide/loops' },
            { text: 'Partials', link: '/docs/guide/partials' },
            { text: 'Layouts', link: '/docs/guide/layouts' },
            { text: 'Components', link: '/docs/guide/components' },
            { text: 'Mutations', link: '/docs/guide/mutations' },
            { text: 'Debugging', link: '/docs/guide/debugging' },
            { text: 'Writing Plugins', link: '/docs/guide/plugins' },
          ],
        },
        {
          text: 'Plugins',
          collapsible: true,
          items: [
            { text: 'Edge Supercharged', link: '/docs/plugins/supercharged' },
            { text: 'Edge Iconify', link: '/docs/plugins/iconify' },
            { text: 'Edge UI Kit', link: '/docs/plugins/ui-kit' },
          ],
        },
      ],

      '/reference/': [
        {
          text: 'API Reference',
          items: [
            { text: 'Globals', link: '/reference/globals' },
            { text: 'Tags', link: '/reference/tags' },
            { text: 'Edge', link: '/reference/edge' },
          ],
        },
      ],

      '/playground/': [
        {
          text: 'Playground',
          items: [
            { text: 'Empty skeleton', link: '/playground/skeleton' },
            { text: 'Partials / Site Layout', link: '/playground/partials' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/edge-js/' },
      { icon: 'twitter', link: 'https://twitter.com/adonisframework' },
    ],

    editLink: {
      pattern: 'https://github.com/edge-js/docs/edit/main/docs/:path',
      text: 'Edit this page on GitHub',
    },
  },
})
