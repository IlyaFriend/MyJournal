<template>
  <div id="user-info">
    <h2>{{ user.firstname }} {{ user.lastname }}</h2>
    <h3>{{ user.username }}</h3>
  </div>
  <div id="blogs-info" class="mt-8 grid grid-cols-1 gap-8">
    <TheBlogMini
      v-for="blog in blogs"
      class="col-span-1"
      :header="blog.header"
      :article="blog.article"
      :label="blog.label"
      :writer="blog.writer"
      :blog-id="blog._id"
      @delete-blog="(id) => deleteBlog(id)"
      @edit-blog="(id, articleData) => editBlog(id, articleData)"
    />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { useDeleteBlog, useEditBlog } from "~/composables/dbActions";
import { BlogContent } from "~/types/blog";
const route = useRoute();

const username = route.params.username;
const user = await getUser(username);
const blogs = await Api.request("get", `/blogs/userBlogs/${user._id}`);

const deleteBlog = async (id: string) => await useDeleteBlog(id)

const editBlog = async (blogId: string, articleData: BlogContent) => await useEditBlog(blogId, articleData)

onMounted(() => {
  console.log(blogs);
});
</script>
