<template>
  <div class="border-b-2 py-2">
    <div class="flex justify-between">
      <NuxtLink
        :to="writerLink"
        class="underline text-lg text-amber-950 hover:text-amber-800 transition-colors"
        :class="{ disabledLink: author === null }"
      >
        {{ author ? author.username : "deleted user" }}
      </NuxtLink>
      <div v-if="userIsAuthor || userIsAdmin" class="text-sm">
        <button
          v-if="userIsAuthor"
          title="Edit"
          @click="openEditCommentConfirm"
        >
          <img src="../edit-24.png" />
        </button>
        <button title="Delete" @click="openDeleteCommentConfirm">
          <img src="../delete-24.png" />
        </button>
      </div>
    </div>

    <p class="text-sm mt-2">{{ commentText }}</p>
    <ModalsContainer />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { ModalsContainer, useModal } from "vue-final-modal";
import ModalConfirmPlainCss from "./ModalConfirmPlainCss.vue";
const emit = defineEmits(["delete-comment", "edit-comment"]);
const props = defineProps({
  author: {
    type: Object || null,
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
  commentText: {
    type: String,
    required: true,
  },
});
const { open: openDeleteCommentConfirm, close: closeDeleteCommentConfirm } =
  useModal({
    component: ModalConfirmPlainCss,
    attrs: {
      title: "Do you want to delete the comment?",
      onConfirm() {
        emit("delete-comment", props.commentId);
        closeDeleteCommentConfirm();
      },
      onClose() {
        closeDeleteCommentConfirm();
      },
    },
    slots: {
      default: "",
    },
  });
const { open: openEditCommentConfirm, close: closeEditCommentConfirm } =
  useModal({
    component: ModalConfirmPlainCss,
    attrs: {
      title: "Edit comment",
      onConfirm() {
        const comment = document
          .getElementById(props.commentId + "_textarea")
          .value.trim();
        if (comment) emit("edit-comment", props.commentId, comment);

        closeEditCommentConfirm();
      },
      onClose() {
        closeEditCommentConfirm();
      },
    },
    slots: {
      default: `<textarea id="${
        props.commentId + "_textarea"
      }" class="block w-96 px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none sm:text-sm" rows="6"></textarea>`,
    },
  });

const user = await getCurrentUser();
console.log(user);
const userIsAuthor =
  props.author === null ? null : user.username === props.author.username;
const userIsAdmin = props.author === null ? null : user.admin;

let writerLink = computed(() => {
  if (!props.author) return "/";
  return `/${props.author.username}`;
});
</script>

<style scoped>
.disabledLink {
  opacity: 0.7;
  pointer-events: none;
}
</style>
