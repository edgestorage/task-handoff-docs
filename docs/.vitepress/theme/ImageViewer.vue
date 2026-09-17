<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

const MIN_SCALE = 0.5
const MAX_SCALE = 4
const SCALE_STEP = 0.5

const source = ref('')
const alt = ref('')
const scale = ref(1)
const offsetX = ref(0)
const offsetY = ref(0)
const dragging = ref(false)

let previousBodyOverflow = ''
let dragStartX = 0
let dragStartY = 0
let dragOffsetX = 0
let dragOffsetY = 0

const isOpen = computed(() => Boolean(source.value))
const imageTransform = computed(
  () => `translate(${offsetX.value}px, ${offsetY.value}px) scale(${scale.value})`
)

const resetView = () => {
  scale.value = 1
  offsetX.value = 0
  offsetY.value = 0
}

const close = () => {
  source.value = ''
  alt.value = ''
  dragging.value = false
  resetView()
}

const setScale = (nextScale: number) => {
  scale.value = Math.min(MAX_SCALE, Math.max(MIN_SCALE, nextScale))
  if (scale.value <= 1) {
    offsetX.value = 0
    offsetY.value = 0
  }
}

const handleDocumentClick = (event: MouseEvent) => {
  const target = event.target
  if (!(target instanceof HTMLImageElement) || !target.closest('.vp-doc')) return

  source.value = target.currentSrc || target.src
  alt.value = target.alt
  resetView()
}

const handleKeydown = (event: KeyboardEvent) => {
  if (!isOpen.value) return

  if (event.key === 'Escape') close()
  if (event.key === '+' || event.key === '=') setScale(scale.value + SCALE_STEP)
  if (event.key === '-') setScale(scale.value - SCALE_STEP)
  if (event.key === '0') resetView()
}

const handleWheel = (event: WheelEvent) => {
  setScale(scale.value + (event.deltaY < 0 ? SCALE_STEP : -SCALE_STEP))
}

const startDrag = (event: PointerEvent) => {
  if (scale.value <= 1) return

  dragging.value = true
  dragStartX = event.clientX
  dragStartY = event.clientY
  dragOffsetX = offsetX.value
  dragOffsetY = offsetY.value
  ;(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId)
}

const drag = (event: PointerEvent) => {
  if (!dragging.value) return
  offsetX.value = dragOffsetX + event.clientX - dragStartX
  offsetY.value = dragOffsetY + event.clientY - dragStartY
}

const stopDrag = () => {
  dragging.value = false
}

watch(isOpen, (open) => {
  if (open) {
    previousBodyOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = previousBodyOverflow
  }
})

onMounted(() => {
  document.addEventListener('click', handleDocumentClick)
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('click', handleDocumentClick)
  document.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = previousBodyOverflow
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="image-viewer"
      role="dialog"
      aria-modal="true"
      :aria-label="alt || '图片预览'"
      @click.self="close"
    >
      <div class="image-viewer__toolbar" @click.stop>
        <button type="button" aria-label="缩小" title="缩小" @click="setScale(scale - SCALE_STEP)">
          &minus;
        </button>
        <button type="button" class="image-viewer__scale" aria-label="重置缩放" title="重置缩放" @click="resetView">
          {{ Math.round(scale * 100) }}%
        </button>
        <button type="button" aria-label="放大" title="放大" @click="setScale(scale + SCALE_STEP)">
          +
        </button>
        <button type="button" aria-label="关闭" title="关闭" @click="close">
          &times;
        </button>
      </div>

      <div
        class="image-viewer__stage"
        :class="{ 'is-draggable': scale > 1, 'is-dragging': dragging }"
        @click.self="close"
        @wheel.prevent="handleWheel"
        @pointerdown="startDrag"
        @pointermove="drag"
        @pointerup="stopDrag"
        @pointercancel="stopDrag"
      >
        <img
          :src="source"
          :alt="alt"
          draggable="false"
          :style="{ transform: imageTransform }"
          @dblclick="setScale(scale === 1 ? 2 : 1)"
        >
      </div>
    </div>
  </Teleport>
</template>
