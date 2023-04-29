<template>
  <div class="grid grid-cols-2 w-96">
    <TheBlogMini v-for="blog in blogs" class="col-span-1"
    :header="blog.header"
    :article="blog.article"
    :label="blog.label"
    :writer="blog.writer"
    />    
  </div>
</template>

<script setup lang="ts">
import api from "~/utils/Api";
let blogs = await api.request("get", `/blogs`);

// onMounted(async () => {
  

//   console.log(blogs)
// });
</script>
