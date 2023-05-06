<template>
    <h1>Update</h1>
</template>

<script setup lang="ts">
import api from '~/utils/Api';

onMounted(async () => {
  const userInfo = await getCurrentUser();

  console.log(userInfo);
});
</script>