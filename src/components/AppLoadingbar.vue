<script setup>
const props = defineProps({
  value: {
    type: Number,
    default: 0
  },
  description: {
    type: String,
    default: ''
  }
})

const bgColor = {
  1: 'bg-red-500/80',
  2: 'bg-yellow-500/80',
  3: 'bg-yellow-300/80',
  4: 'bg-green-300/80',
  5: 'bg-green-500/80'
}
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
      <div
        class="h-full rounded-full transition-all"
        :style="{ width: `${props.value * 20}%` }"
        :class="`${bgColor[props.value]}`"
      ></div>
    </div>
    <p class="text-sm sm:text-base text-gray-200/80 w-fit mx-auto"> ¡{{ props.description }}! </p>
  </div>
</template>
