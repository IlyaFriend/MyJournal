<template>
  <div class="container border-2 max-h-96 px-6 py-6 border-amber-900">
    <NuxtLink
      :to="blogLink"
      class="text-amber-950 hover:text-orange-700 hover:cursor-pointer transition-colors"
    >
      <span class="h2 underline">{{ header }}</span>
    </NuxtLink>
    <div class="preview py-4">
      <p class="opacity-80">
        {{ article.slice(0, 200) }}{{ article.length > 100 ? "..." : "" }}
      </p>
    </div>
    <NuxtLink
      :to="writerLink"
      class="underline text-xl text-amber-950 hover:text-amber-800 transition-colors"
    >
      {{ $props.writer.firstname }} {{ $props.writer.lastname }}
    </NuxtLink>
    <span class="text-lg ml-8"
      ><i>{{ label }}</i></span
    >
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
const props = defineProps({
  header: {
    type: String,
    required: true,
  },
  article: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: false,
  },
  writer: {
    type: Object,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});

let writerLink = computed(() => {
  return `/${props.writer.username}`;
});

let blogLink = computed(() => {
  return `/blog/${props.link}`;
});
</script>

<style scoped>
div.preview {
  overflow: hidden;
}

p {
  white-space: pre-wrap;
  max-height: 10vh;
}

.h2 {
  font-size: xx-large;
  font-weight: inherit;
}
</style>
