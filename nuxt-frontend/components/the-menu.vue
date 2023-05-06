<template>
  <div id="menu" class="width20vw bg-yellow-800">
    <TheMenuButton :onClick="() => navigateTo('/')">Main</TheMenuButton>
    <TheMenuButton :onClick="() => navigateTo(`/${user.username}`)">My Blog</TheMenuButton>
    <TheMenuButton :onClick="() => navigateTo('/post-article')">Post</TheMenuButton>
    <TheMenuButton :onClick="() => navigateTo('/update-profile')">Update profile</TheMenuButton>
    <TheMenuButton :onClick="logout">Sign out</TheMenuButton>
  </div>
</template>

<script setup lang="ts">
const user = await getCurrentUser();

const logout = () => {
  const jwtCookie = useCookie("jwt");
  const usernameCookie = useCookie("username");
  jwtCookie.value = null;
  usernameCookie.value = null;
  
  navigateTo("/login");
};
</script>