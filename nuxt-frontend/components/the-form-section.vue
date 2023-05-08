<template>
  <form
    @submit.prevent="onSubmit"
    class="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-6 px-4 py-16 border-b-2 sm:px-6 lg:px-8"
  >
    <slot />
    <div>
      <h2 class="text-base font-semibold leading-7 text-white">
        {{ title }}
      </h2>
    </div>
    <slot name="submit-button">
        <div class="flex">
          <button type="submit" class="bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500">
            Save
          </button>
        </div>
      </slot>
  </form>
</template>

<script setup lang="ts">
defineProps(['title', 'onSubmit'])
</script>