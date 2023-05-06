<template>
  <div class="mt-8 sm:mx-auto sm:w-full">
    <div class="px-4 py-8 w-full bg-white shadow sm:px-10">
      <form id="post-article-form">
        <div class="w-fit">
          <label for="header" class="block font-medium leading-5 text-gray-700">
            Header
          </label>
          <div class="relative mt-1 rounded-md shadow-sm">
            <input
              id="header"
              v-model="header"
              type="text"
              class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none sm:text-sm"
              :class="
                errorMessage
                  ? 'ring-red-500 border-red-500'
                  : 'focus:ring-orange-600 focus:border-orange-600'
              "
            />
            <div
              v-if="errorMessage"
              class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
            >
              <svg
                class="w-5 h-5 text-red-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>
          <p
            v-if="errorMessage"
            id="header-error"
            class="mt-1 -mb-5 text-xs text-red-600"
          >
            {{ errorMessage }}
          </p>
        </div>

        <div class="mt-10">
          <label
            for="article"
            class="block font-medium leading-5 text-gray-700"
          >
            Article
          </label>
          <div class="relative mt-1 rounded-md shadow-sm">
            <textarea
              id="article"
              v-model="article"
              rows="20"
              class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none sm:text-sm"
              :class="
                errorMessage
                  ? 'ring-red-500 border-red-500'
                  : 'focus:ring-orange-600 focus:border-orange-600'
              "
            ></textarea>
            <div
              v-if="errorMessage"
              class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
            >
              <svg
                class="w-5 h-5 text-red-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>
          <p
            v-if="errorMessage"
            id="article-error"
            class="mt-1 -mb-5 text-xs text-red-600"
          >
            {{ errorMessage }}
          </p>
        </div>

        <div class="w-fit mt-10">
          <label for="label" class="block font-medium leading-5 text-gray-700">
            Label
          </label>
          <div class="relative mt-1 rounded-md shadow-sm">
            <input
              id="label"
              v-model="label"
              type="text"
              class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none sm:text-sm"
              :class="
                errorMessage
                  ? 'ring-red-500 border-red-500'
                  : 'focus:ring-orange-600 focus:border-orange-600'
              "
            />
            <div
              v-if="errorMessage"
              class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
            >
              <svg
                class="w-5 h-5 text-red-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>
          <p
            v-if="errorMessage"
            id="label-error"
            class="mt-1 -mb-5 text-xs text-red-600"
          >
            {{ errorMessage }}
          </p>
        </div>
        <div class="mt-6 flex justify-center">
          <span class="block w-48 rounded-md shadow-sm">
            <button
              class="flex justify-center w-full px-4 py-2 font-medium text-white transition duration-150 ease-in-out bg-amber-600 border border-transparent rounded-md hover:bg-amber-500 focus:outline-none focus:border-amber-700 focus:ring-amber active:bg-amber-700"
              @click.prevent="postArticle"
            >
              Post
            </button>
          </span>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import api from "../utils/Api";

const header = ref("");
const article = ref("");
const label = ref("");

const errorMessage = ref("");

const postArticle = async () => {
  const data = {
    header: header.value,
    article:  article.value,
    label: label.value,
  };

  const res = await api.request("post", `/blogs/`, JSON.stringify(data), {
    "Content-Type": "application/json",
  });
  if (res.status === 201) {
    alert("Article created!");
  }
  document.getElementById('post-article-form')?.reset()
};
</script>
