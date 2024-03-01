<script setup lang="ts">
import { RouterView } from "vue-router";
import { zhCN, dateZhCN } from 'naive-ui'
</script>

<template>
    <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
        <n-modal-provider>
            <n-message-provider>
                <RouterView />
            </n-message-provider>
        </n-modal-provider>
    </n-config-provider>
</template>
