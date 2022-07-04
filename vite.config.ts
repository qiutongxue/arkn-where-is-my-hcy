import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import { presetAttributify, presetIcons, presetUno } from 'unocss'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Unocss({
      presets: [
        presetUno(),
        presetIcons(),
        presetAttributify(),
      ],
    }),
    Components({
      dirs: ['src/components', 'src/UI'],
      dts: true,
      resolvers: [NaiveUiResolver()],
    }),
  ],
})
