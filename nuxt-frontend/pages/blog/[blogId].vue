<template>
  <div class="">
    <h1>{{ blog.header }}</h1>
    <div class="flex mt-6">
      <div id="article-section" class="pr-16">
        {{ blog.article }}
      </div>
      <div id="comments-section" class="px-4 py-8 border-l-2">
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
            v-for="comment in comments"
            :author="comment.author"
            :commentId="comment._id"
            :blogId="blogId"
            :key="comment._id"
            @delete-comment="(id) => deleteComment(id)"
            >{{ comment.review }}</TheComment
          >
        </div>
      </div>
    </div>
    <button @click="open">
      Open Modal
    </button>
    <ModalsContainer />
  </div>
</template>

<script setup>  
import { ModalsContainer, useModal } from 'vue-final-modal'
import ModalConfirmPlainCss from '../../components/ModalConfirmPlainCss.vue'
const { open, close } = useModal({
  component: ModalConfirmPlainCss,
  attrs: {
    title: 'Hello World!',
    onConfirm() {
      close()
    },
  },
  slots: {
    default: '<p>The content of the modal</p>',
  },
})

import api from "~/utils/Api";
import { useRoute } from "vue-router";
const route = useRoute();
const blogId = route.params.blogId;

let blog = await api.request("get", `/blogs/${blogId}`);
let comments = ref(blog.comments);

const commentText = ref("");

const postComment = async () => {
  const data = {
    review: commentText.value,
  };

  const res = await api.request(
    "post",
    `/blogs/${blogId}/comments`,
    JSON.stringify(data),
    {
      "Content-Type": "application/json",
    }
  );

  document.getElementById("post-article-form")?.reset();

  let newComment = await getComment(res.data)
  comments.value.push(newComment);

  if (res.status === 201) {
    alert("Comment added.");
  }
};

const deleteComment = async (commentId) => {
  const r = confirm("Do you want to delete this comment?")
  if (!r) return;
  const res = await Api.request(
    "delete",
    `/blogs/${blogId}/comments/${commentId}`
  ).then(res => { return res});

  comments.value = comments.value.filter(
    (comment) => comment._id !== commentId
  );

  return res
};

const getComment = async (commentId) => {
  return await Api.request("get", `/blogs/${blogId}/comments/${commentId}`)
  .then(res => { return res})
}
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
