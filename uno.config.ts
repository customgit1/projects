import { defineConfig, presetUno, presetAttributify, presetIcons } from "unocss";
export default defineConfig({
    presets: [
        presetUno(),
        presetAttributify(),
        presetIcons({
            extraProperties: {
                'cursor': 'pointer'
            },
            collections: {
                tabler: () => import('@iconify-json/tabler/icons.json').then(i => i.default)
            }
        }),
    ],
})