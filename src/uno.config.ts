import { defineConfig, presetIcons, presetUno } from 'unocss'

export default defineConfig({
  presets: [presetUno(), presetIcons()],
  theme: {
    colors: {
      primary: {
        light: 'var(--vp-c-brand-light)',
        DEFAULT: 'var(--vp-c-brand)',
      },
      dark: {
        DEFAULT: '#dbdbdb',
        800: '#393939',
      },
      adonis: '#5A45FF',
    },
    fontFamily: {
      mono: 'var(--vt-font-family-mono)',
    },
  },

  shortcuts: {
    'edge-border': 'border-dark dark:border-dark-800',
  },
})
