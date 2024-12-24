<template>
  <div class="w-[50rem]">
    <button
      class="bg-black border-1 border-white/20 w-full h-[3.5rem] text-size-1.5rem text-white"
      :class="opened ? 'rounded-t-0.25rem' : 'rounded-0.25rem'"
      @click="emit('update:opened', !opened)"
    >
      {{ title }}
    </button>
    <Transition
      enter-active-class="animate-fade-in animate-duration-300"
      leave-active-class="animate-fade-out animate-duration-300"
    >
      <div v-show="opened" class="b-1 b-white/20 rounded-b-0.25rem p-1rem bg-blue/20 text-white">
        <slot></slot>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  opened: boolean
}>()

const emit = defineEmits<{
  (e: 'update:opened', value: boolean): void
}>()
</script>
