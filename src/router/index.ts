/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'
import { useUserStore } from '@/stores/app'
import Dashboard from '@/layouts/dashboard.vue'
import type { RouteLocationNormalized } from 'vue-router'
import type { NavigationGuardNext } from 'vue-router'
import Index from '@/pages/dashboard/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/pages/index.vue'),
    },
    {
      path: '/sign-in',
      component: () => import('@/pages/sign-in/index.vue')
    },
    {
      path: '/sign-up',
      component: () => import('@/pages/sign-up/index.vue')
    },
    {
      path: '/dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '',
          component: Index
        },
        {
          path: 'teste',
          component: () => import('@/pages/dashboard/teste/index.vue')
        }
      ]
    },
  ]
})

router.beforeEach((
  to: RouteLocationNormalized, 
  from: RouteLocationNormalized, 
  next: NavigationGuardNext
) => {
  const { isAuthenticated } = useUserStore()

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ path: '/sign-in' })
  } else {
    next()
  }
})


router.onError((err, to: RouteLocationNormalized) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
