<template>
  <div id="user-info">
    <h2>{{ user.firstname }} {{ user.lastname }}</h2>
    <h3>{{ user.username }}</h3>
    <div v-if="currentUser._id !== user._id" class="mt-4">
      <button
        v-if="!isFollowing"
        @click="subscribe"
        class="px-4 py-1 text-xl bg-blue-500 hover:bg-blue-400"
      >
        Subscribe
      </button>
      <button
        v-else
        @click="unsubscribe"
        class="px-4 py-1 text-xl bg-slate-400 hover:bg-slate-300"
      >
        Unsubscribe
      </button>
    </div>
  </div>
  <div id="blogs-info" v-if="blogs.length" class="mt-8 grid grid-cols-1 gap-8">
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
  <div v-else class="text-2xl mt-6">
    No articles yet...<br />
    <NuxtLink to="post-article" class="text-blue-800 underline"
      >You can add one</NuxtLink
    >
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import {
  useDeleteBlog,
  useEditBlog,
  useGetBlogsById,
} from "~/composables/dbActions";
import { BlogContent } from "~/types/blog";
const route = useRoute();

const username = route.params.username;
const user = await getUser(username);
const blogs = await useGetBlogsById(user._id);

const deleteBlog = async (id: string) => await useDeleteBlog(id);
const editBlog = async (blogId: string, articleData: BlogContent) =>
  await useEditBlog(blogId, articleData);

const currentUser = await getCurrentUser();
const isFollowing = ref(
  currentUser.following.length
    ? currentUser.following.findIndex((following) => following === user._id) > -1
    : false
);

const subscribe = () =>
  usePostFollowing(currentUser._id, user._id, () => (isFollowing.value = true));
const unsubscribe = () =>
  useDeleteFollowing(
    currentUser._id,
    user._id,
    () => (isFollowing.value = false)
  );

</script>
