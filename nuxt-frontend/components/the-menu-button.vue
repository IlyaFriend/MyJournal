<template>
  <div class="mt-6 px-3">
    <span class="block max-w-prose rounded-md shadow-sm">
      <button
        class="flex justify-center w-full px-4 py-2 text-sm font-medium text-white transition duration-150 ease-in-out bg-blue-950 border border-transparent hover:bg-blue-800 focus:outline-none focus:border-blue-800 focus:ring-blue focus:bg-blue-800 active:bg-blue-800"
        @click.prevent="onClick"
      >
        <slot></slot>
      </button>
    </span>
  </div>
</template>

<script setup>
defineProps({
	id: {
		type: String,
		required: false,
	},
    onClick: {
        type: Function,
        required: false,
    }
});
</script>