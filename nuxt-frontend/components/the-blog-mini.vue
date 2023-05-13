<template>
  <div
    class="container flex flex-1 flex-col border-2 max-h-96 px-6 py-6 border-blue-900"
  >
    <NuxtLink
      :to="blogLink"
      class="text-blue-950 hover:text-orange-700 hover:cursor-pointer transition-colors"
    >
      <span class="h2 underline"
        >{{ header.slice(0, 60) }}{{ header.length > 60 ? "..." : "" }}</span
      >
    </NuxtLink>
    <div class="preview py-4">
      <p class="opacity-80">
        {{ article.slice(0, 200) }}{{ article.length > 200 ? "..." : "" }}
      </p>
    </div>
    <div id="blog-mini-footer" class="mt-auto flex justify-between">
      <div>
        <NuxtLink
          :to="writerLink"
          class="underline text-xl text-blue-950 hover:text-blue-800 transition-colors"
        >
          {{ $props.writer.firstname }} {{ $props.writer.lastname }}
        </NuxtLink>
        <span class="text-lg ml-8"
          ><i>{{ label }}</i></span
        >
      </div>
      <span v-if="userIsAuthor || userIsAdmin" class="text-sm inline">
        <button v-if="userIsAuthor" title="Edit" @click="openEditBlogConfirm">
          <img src="../edit-24.png" />
        </button>
        <button title="Delete" @click="openDeleteBlogConfirm">
          <img src="../delete-24.png" />
        </button>
      </span>
    </div>
    <ModalsContainer />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { ModalsContainer, useModal } from "vue-final-modal";
import ModalConfirmPlainCss from "./ModalConfirmPlainCss.vue";
const emit = defineEmits(["delete-blog", "edit-blog"]);
const props = defineProps({
  blogId: {
    type: String,
    required: true,
  },
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
});
const { open: openDeleteBlogConfirm, close: closeDeleteBlogConfirm } = useModal(
  {
    component: ModalConfirmPlainCss,
    attrs: {
      title: "Do you want to delete the comment?",
      onConfirm() {
        emit("delete-blog", props.blogId);
        closeDeleteBlogConfirm();
      },
      onClose() {
        closeDeleteBlogConfirm();
      },
    },
    slots: {
      default: "",
    },
  }
);

const { open: openEditBlogConfirm, close: closeEditBlogConfirm } = useModal({
  component: ModalConfirmPlainCss,
  attrs: {
    title: "Edit blog",
    contentClass: "confirm-modal-content w-full h-192 mx-48 my-8",
    onConfirm() {
      const header = document.getElementById(props.blogId + "_header").value;
      const article = document.getElementById(props.blogId + "_article").value;
      const label = document.getElementById(props.blogId + "_label").value;
      emit("edit-blog", props.blogId, { header, article, label });

      closeEditBlogConfirm();
    },
    onClose() {
      closeEditBlogConfirm();
    },
  },
  slots: {
    default: `<input type="text" id="${
      props.blogId + "_header"
    }" class="w-full h-12 my-2 px-4 font-semibold border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none sm:text-sm" value="${
      props.header
    }"/><textarea id="${
      props.blogId + "_article"
    }" class="block w-full h-128 px-3 py-2 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none sm:text-sm" rows="6">${
      props.article
    }</textarea><input type="text" id="${
      props.blogId + "_label"
    }" class="w-full h-12 my-2 px-4 italic border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none sm:text-sm" value="${
      props.label
    }"/>`,
  },
});
const user = await getCurrentUser();
const userIsAuthor = user.username === props.writer.username;
const userIsAdmin = user.admin;

let writerLink = computed(() => {
  return `/${props.writer.username}`;
});

let blogLink = computed(() => {
  return `/blog/${props.blogId}`;
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
