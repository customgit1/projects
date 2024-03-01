<script setup lang="ts">
import { ref, watch } from "vue";
import { useClipboard } from "@vueuse/core";
const longUrl = ref<string | undefined>(undefined)
const shortList = ref<{ id: number, shortUrl: string, longUrl: string }[]>([])
const isUrl = ref<boolean>(true)
const QRModal = ref<{
    open: boolean
    url: string | undefined
}>({
    open: false,
    url: undefined
})
const { copy } = useClipboard()
const message = useMessage()
watch(longUrl, (val) => {
    const reg = new RegExp(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/)
    isUrl.value = reg.test(val)
})
const errorMsg = computed(() => {
    if (longUrl.value && !isUrl.value) {
        return '请输入正确网址'
    }
    return null
})
const handleGenerateShortUrl = () => {
    if (!longUrl.value) return message.warning('请输入网址！')
    if (longUrl.value && !isUrl.value) return message.warning('请输入正确格式网址！')
    shortList.value.push({ id: shortList.value.length + 1, shortUrl: 'https://reduced.to/lvgga', longUrl: longUrl.value })
    longUrl.value = ''
}
const handleCopyShortUrl = (url: string) => {
    copy(url)
    message.success('复制成功')
}
const handleOpenQR = (url: string) => {
    QRModal.value = { open: true, url }
}
const handleRemove = (id: number) => {
    const idx = shortList.value.findIndex(item => item.id === id)
    shortList.value.splice(idx, 1)
}
</script>
<template>
    <div class="text-center">
        <h1 class="text-6xl">
            <n-gradient-text type="info">
                短链生成服务
            </n-gradient-text>
        </h1>
    </div>
    <div class="rd-2 mt-4 px-2 max-w-md mx-auto">
        <div class="input rd-2">
            <div class="p-2 flex items-center">
                <input v-model="longUrl" class="w-full text-2xl bg-transparent b-none outline-none" type="text">
                <div class="i-tabler:rocket text-2xl transform transition-600 hover:bg-#2B86F0"
                    @click="handleGenerateShortUrl" />
            </div>
        </div>
        <div class="text-red min-h-6 w-full">
            {{ errorMsg }}
        </div>
    </div>
    <div v-show="shortList.length > 0" class="rd-2 p-4 bg-white max-w-md mx-auto">
        <TransitionGroup name="fade" tag="ul" class="relative flex flex-col gap-2 list-none p-0">
            <li v-for="item in shortList" :key="item.id">
                <div class="flex flex-row flex-wrap justify-between gap-4">
                    <div class="flex flex-col">
                        <a class="cursor-pointer text-xl font-bold transition transition-500 hover:text-blue" target="_blank"
                            :href="item.shortUrl">
                            {{ item.shortUrl }}
                        </a>
                        <n-ellipsis style="max-width: 240px">
                            {{ item.longUrl }}
                        </n-ellipsis>
                    </div>
                    <div class="flex items-center gap-1">
                        <div class="p-2 transform transition-600 hover:bg-gray-100 rounded-9">
                            <div class="i-tabler:clipboard-copy" @click="handleCopyShortUrl(item.shortUrl)" />
                        </div>
                        <div class="p-2 transform transition-600 hover:bg-gray-100 rounded-9">
                            <div class="i-tabler:qrcode" @click="handleOpenQR(item.shortUrl)" />
                        </div>
                        <div class="p-2 transform transition-600 hover:bg-gray-100 rounded-9">
                            <div class="i-tabler:trash-x" @click="handleRemove(item.id)" />
                        </div>
                    </div>
                </div>
            </li>
        </TransitionGroup>
    </div>
    <n-modal v-model:show="QRModal.open" title="短链二维码" preset="card" style="width: 360px;">
        <div class="text-center">
            <n-qr-code :value="QRModal.url" />
        </div>
    </n-modal>
</template>
<style scoped lang="scss">
.input {

    border: 2px solid rgba(194, 194, 194, 1);
    transition: border-color .3s ease;

    &:focus-within {
        border-color: #2B86F0;
    }
}

/* 1. 声明过渡效果 */
.fade-move,
.fade-enter-active,
.fade-leave-active {
    transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. 声明进入和离开的状态 */
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: scaleY(0.01) translate(30px, 0);
}

/* 3. 确保离开的项目被移除出了布局流
      以便正确地计算移动时的动画效果。 */
.fade-leave-active {
    position: absolute;
}
</style>