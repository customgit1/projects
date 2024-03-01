import { resolve } from "node:path";
import { defineConfig } from 'vite'
import UnoCSS from "unocss/vite";
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'


export default defineConfig({
  plugins: [
    UnoCSS(),
    vue(),
    AutoImport({
      dts:'src/typings/auto-imports.d.ts',
      imports: [
        'vue',
        {
          'naive-ui': [
            'useDialog',
            'useMessage',
            'useNotification',
            'useLoadingBar'
          ]
        }
      ]
    }),
    Components({
      dts:'src/typings/components.d.ts',
      resolvers: [NaiveUiResolver()]
    })
  ],
  server:{
    host:true
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})
