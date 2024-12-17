/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from './vuetify'
import pinia from '../stores'
import router from '../router'

import "vue-toastification/dist/index.css"

// Types
import type { App } from 'vue'
import { VueQueryPlugin } from '@tanstack/vue-query'
import Toast from "vue-toastification";

export function registerPlugins (app: App) {
  app
    .use(vuetify)
    .use(router)
    .use(pinia)
    .use(VueQueryPlugin)
    .use(Toast)
}
