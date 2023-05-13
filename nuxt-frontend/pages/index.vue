<template>
  <div class="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
    <TheBlogMini
      v-for="blog in [...blogs].reverse()"
      class="col-span-1"
      :blogId="blog._id"
      :header="blog.header"
      :article="blog.article"
      :label="blog.label"
      :writer="blog.writer"
      @delete-blog="(id) => deleteBlog(id)"
      @edit-blog="(id, articleData) => editBlog(id, articleData)"
    />
  </div>
</template>

<script setup lang="ts">
import { useDeleteBlog, useEditBlog } from "~/composables/dbActions";
import { BlogContent } from "~/types/blog";
import api from "~/utils/Api";

const initBlogs = await api.request("get", `/blogs`);
let blogs = ref(initBlogs);

const deleteBlog = async (id: string) => await useDeleteBlog(id)

const editBlog = async (blogId: string, articleData: BlogContent) => await useEditBlog(blogId, articleData)
</script>
