<template>
  <div id="menu" class="bg-yellow-800">
    <TheMenuButton :onClick="() => navigateTo('/')">Me</TheMenuButton>
    <TheMenuButton :onClick="() => navigateTo('/')">My Blog</TheMenuButton>
    <TheMenuButton :onClick="() => navigateTo('/')">Post</TheMenuButton>
    <TheMenuButton :onClick="() => navigateTo('/update-profile')">Update profile</TheMenuButton>
    <TheMenuButton :onClick="logout">Sign out</TheMenuButton>
  </div>
</template>

<script setup lang="ts">
const logout = () => {
  const jwtCookie = useCookie("jwt");
  const usernameCookie = useCookie("username");
  jwtCookie.value = null;
  usernameCookie.value = null;
  
  navigateTo("/login");
};
</script>

<style>
#menu {
  /* max-width: 15vw; */
}
</style>