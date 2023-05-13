<template>
  <div class="">
    <h1>{{ blog.header }}</h1>
    <NuxtLink :to="'/' + blog.writer.username"><h3 class="hover:underline"><b>{{ blog.writer.username }}</b></h3></NuxtLink>
    <h4><i>{{ blog.label }}</i></h4>
    <div class="flex mt-6">
      <div id="article-section" class="pr-16">
        {{ blog.article }}
      </div>
      <div id="comments-section" class="px-4 pb-8 border-l-2">
        <div id="post-comment" class="px-2 py-4 border-b-2 border-t-2">
          <form>
            <div class="">
              <label
                for="comment-text"
                class="block font-medium leading-5 text-gray-700"
              >
                Add comment
              </label>
              <div class="relative mt-1 rounded-md shadow-sm">
                <textarea
                  id="comment-text"
                  v-model="commentText"
                  class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none sm:text-sm"
                  rows="6"
                ></textarea>
              </div>
            </div>
            <div class="mt-6 flex justify-center">
              <span class="block w-48 rounded-md shadow-sm">
                <button
                  class="flex justify-center w-full px-4 py-2 font-medium text-white transition duration-150 ease-in-out bg-amber-600 border border-transparent rounded-md hover:bg-amber-500 focus:outline-none focus:border-amber-700 focus:ring-amber active:bg-amber-700"
                  @click.prevent="postComment"
                >
                  Post
                </button>
              </span>
            </div>
          </form>
        </div>
        <div id="comments">
          <TheComment
            v-for="comment in [...comments].reverse()"
            :author="comment.author"
            :commentId="comment._id"
            :commentText="comment.review"
            :blogId="blogId"
            :key="comment._id"
            @delete-comment="(id) => deleteComment(id)"
            @edit-comment="(id, text) => editComment(id, text)"
            >{{ comment.review }}</TheComment
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import api from "~/utils/Api";
import { useRoute } from "vue-router";
import {
  usePostComment,
  useDeleteComment,
  useEditComment,
} from "../../composables/dbActions.ts";
const route = useRoute();
const blogId = route.params.blogId;

let blog = await api.request("get", `/blogs/${blogId}`);
console.log(blog)
let comments = ref(blog.comments);

const commentText = ref("");

const postComment = async () =>
  await usePostComment(blogId, commentText.value, async (res) => {
    commentText.value = "";

    let newComment = await getComment(res.data);
    comments.value.push(newComment);
  });

const deleteComment = async (commentId) =>
  useDeleteComment(blogId, commentId, (res) => {
    comments.value = comments.value.filter(
      (comment) => comment._id !== commentId
    );
  });

const editComment = async (commentId, text) =>
  useEditComment(blogId, commentId, text, (res) => {
    comments.value = comments.value.map((comment) =>
      comment._id === commentId
        ? res.data.find((item) => item._id === commentId)
        : comment
    );
  });

const getComment = async (commentId) => {
  return await Api.request(
    "get",
    `/blogs/${blogId}/comments/${commentId}`
  ).then((res) => {
    return res;
  });
};
</script>

<style scoped>
div {
  white-space: pre-wrap;
  font-size: large;
}

#article-section {
  width: 75%;
}

#comments-section {
  width: 25%;
}
</style>
