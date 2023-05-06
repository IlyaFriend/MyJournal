<template>
  <div class="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
    <TheBlogMini v-for="blog in blogs" class="col-span-1"
    :header="blog.header"
    :article="blog.article"
    :label="blog.label"
    :writer="blog.writer"
    :link="blog._id"
    />
  </div>
</template>

<script setup lang="ts">
import api from "~/utils/Api";
let blogs = await api.request("get", `/blogs`);

onMounted(() => {
  console.log(blogs)
})
</script>
