<template>
  <div id="user-info">
    <h2>{{ user.firstname }} {{ user.lastname }}</h2>
    <h3>{{ user.username }}</h3>
  </div>
  <div id="blogs-info" class="mt-8 grid grid-cols-1 gap-8">
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
import { useRoute } from "vue-router";
const route = useRoute();

const username = route.params.username;
const user = await getUser(username);
const blogs = await Api.request("get", `/blogs/userBlogs/${user._id}`);

onMounted(() => {
  console.log(blogs);
});
</script>
