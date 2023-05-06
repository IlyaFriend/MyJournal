<template>
  <div class="border-b-2 py-2">
    <div class="flex justify-between">
      <NuxtLink
        :to="writerLink"
        class="underline text-lg text-amber-950 hover:text-amber-800 transition-colors"
      >
        {{ author.username }}
      </NuxtLink>
      <div v-if="userIsAuthor" class="text-sm">
        <button title="Edit">
          <img src="../edit-24.png" />
        </button>
        <button title="Delete" @click="$emit('delete-comment', commentId)">
          <img src="../delete-24.png"/>
        </button>
      </div>
    </div>

    <p class="text-sm mt-2"><slot></slot></p>
  </div>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  author: {
    type: Object,
    required: true,
  },
  blogId: {
    type: String,
    required: true,
  },
  commentId: {
    type: String,
    required: true,
  },
});

const user = await getCurrentUser();
const userIsAuthor = user.username === props.author.username;

let writerLink = computed(() => {
  return `/${props.author.username}`;
});
</script>
