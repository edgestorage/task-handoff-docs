import { h, nextTick, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { OverlayScrollbars, type OverlayScrollbars as OverlayScrollbarsInstance } from 'overlayscrollbars'
import 'overlayscrollbars/overlayscrollbars.css'
import HomePage from './HomePage.vue'
import ImageViewer from './ImageViewer.vue'
import './style.css'
import './home.css'

export default {
  extends: DefaultTheme,
  Layout: () => h(DefaultTheme.Layout, null, {
    'layout-bottom': () => h(ImageViewer)
  }),
  enhanceApp({ app }) {
    app.component('HomePage', HomePage)
  },
  setup() {
    const route = useRoute()
    let sidebarScrollbar: OverlayScrollbarsInstance | undefined

    const enhanceSidebar = async () => {
      await nextTick()
      const sidebar = document.querySelector<HTMLElement>('.VPSidebar')

      if (!sidebar) {
        sidebarScrollbar?.destroy()
        sidebarScrollbar = undefined
        return
      }

      if (sidebarScrollbar?.elements().target === sidebar) {
        sidebarScrollbar.update()
        return
      }

      sidebarScrollbar?.destroy()
      sidebarScrollbar = OverlayScrollbars(sidebar, {
        overflow: { x: 'hidden', y: 'scroll' },
        scrollbars: {
          theme: 'os-theme-task-handoff',
          autoHide: 'leave',
          autoHideDelay: 240,
          dragScroll: true
        }
      })
    }

    onMounted(enhanceSidebar)
    watch(() => route.path, enhanceSidebar)
    onUnmounted(() => sidebarScrollbar?.destroy())
  }
}
