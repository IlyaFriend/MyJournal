<template>
  <div id="menu" class="width20vw bg-yellow-800">
    <TheMenuButton :onClick="() => navigateTo('/')">Main</TheMenuButton>
    <TheMenuButton :onClick="() => navigateTo(`/${user.username}`)"
      >My Blog</TheMenuButton
    >
    <TheMenuButton :onClick="() => navigateTo('/post-article')"
      >Post</TheMenuButton
    >
    <TheMenuButton :onClick="() => navigateTo('/update-profile')"
      >Update profile</TheMenuButton
    >
    <TheMenuButton :onClick="openLogoutConfirm">Sign out</TheMenuButton>
    <ModalsContainer />
  </div>
</template>

<script setup lang="ts">
import { ModalsContainer, useModal } from "vue-final-modal";
import ModalConfirmPlainCss from "./ModalConfirmPlainCss.vue";
const { open: openLogoutConfirm, close: closeLogoutConfirm } = useModal({
  component: ModalConfirmPlainCss,
  attrs: {
    title: "Do you want to log out?",
    onConfirm() {
      useLogout();
      closeLogoutConfirm();
    },
    onClose() {
      closeLogoutConfirm();
    },
  },
  slots: {
    default: "",
  },
});
const user = await getCurrentUser();
</script>
