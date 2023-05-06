<template></template>
<!-- <template>
  <div>
    <label :for="id" class="block text-sm font-medium leading-5 text-gray-700">
      <slot></slot>
    </label>
    <div class="relative mt-1 rounded-md shadow-sm">
      <input
        :id="id"
        type="text"
        v-bind:value="modelValue"
        v-on:input="onInput"
        class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none sm:text-sm"
        :class="
          errorMessage
            ? 'ring-red-500 border-red-500'
            : 'focus:ring-orange-600 focus:border-orange-600'
        "
      />
      <div
        v-if="errorMessage"
        class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
      >
        <svg
          class="w-5 h-5 text-red-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </div>
    <p
      v-if="errorMessage"
      id="username-error"
      class="mt-1 -mb-5 text-xs text-red-600"
    >
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps({
  type: {
    type: String,
    required: false,
    default: "text",
  },
  id: {
    type: String,
    required: true,
  },
  modelValue: {},
  errorMessage: {
    type: String,
    required: false,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

function onInput(e) {
  emit("update:modelValue", e.target.value);
}
</script> 

<script>
export default {
    props: ['modelValue', 'id', 'type', 'errorMessage'],
    emits: ['update:modelValue'],
    data() {
        return {
            activeOption: this.modelValue,
        }
    },
    methods: {
        onInput(e) {
            this.$emit('update:modelValue', e.target.value);
        }
    }
} 
</script> -->