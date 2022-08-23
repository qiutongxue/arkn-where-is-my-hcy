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
      rules: [
        [/^s-(\d+%?)$/, ([, d]) => ({
          width: d.endsWith('%') ? d : `${+d / 4}rem`,
          height: d.endsWith('%') ? d : `${+d / 4}rem`,
        }
        )],
      ],
      safelist: [
        ...['red', 'amber', 'blue'].map(color => [`text-${color}`, `[text~="${color}"]`]).flat(),
      ],
    }),
    Components({
      dirs: ['src/components', 'src/UI'],
      dts: true,
      resolvers: [NaiveUiResolver()],
    }),
  ],
})
