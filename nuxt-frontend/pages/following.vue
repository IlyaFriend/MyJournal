<template>
  <div id="blogs-info" v-if="blogs.length" class="mt-8 grid gap-8 md:grid-cols-1 lg:grid-cols-2">
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
import { BlogContent } from "~/types/blog";

const userInfo = await getCurrentUser();
const following = userInfo.following;

const blogs = [];
for (const id of following) {
  try {
    const res = await useGetBlogsById(id);
    console.log(res);
    blogs.push(...res);
  } catch (e) {}
}

const deleteBlog = async (id: string) => await useDeleteBlog(id);
const editBlog = async (blogId: string, articleData: BlogContent) =>
  await useEditBlog(blogId, articleData);
</script>
