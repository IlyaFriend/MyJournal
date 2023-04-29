<template>
    <h1>Update</h1>
</template>

<script setup lang="ts">
import api from '~/utils/Api';

onMounted(async () => {
  const userInfo = await api.request("get", `/users/user1337`);

  console.log(userInfo);
});
</script>