import { createRouter, createWebHistory } from "vue-router";

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: () => import('@/layouts/layout.vue'),
            redirect: '/home',
            children: [
                { path: '/home', component: () => import('@/views/index.vue'), }
            ]
        }
    ]
})

