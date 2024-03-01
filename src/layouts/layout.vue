<script setup lang="ts">
import { RouterView } from "vue-router";
import BackToTop from "@/components/BackToTop.vue";
import logo from "@/assets/root.svg";
</script>
<template>
    <div class="layout">
        <header class="header ">
            <a href="/">
                <img class="pl-4" :src="logo"/>
            </a>
        </header>
        <main class="main">
            <RouterView />
        </main>
    </div>
    <BackToTop />
</template>
<style scoped>
.layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: #F5F4F4;
}

.header {
    height: 70px;
    line-height: 70px;
    border-bottom: 1px solid rgba(60, 60, 67, .12);
}

.main {
}
</style>