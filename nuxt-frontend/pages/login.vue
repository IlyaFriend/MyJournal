<template>
  <div
    class="flex flex-col justify-center min-h-screen py-12 bg-orange-950 sm:px-6 lg:px-8"
  >
    <div class="-mt-12 sm:mx-auto sm:w-full sm:max-w-md">
      <div>
        <i class="w-full text-center text-blue-500 fas fa-landmark fa-3x"></i>
      </div>
      <h2 class="mt-6 text-3xl font-bold leading-9 text-center text-white">
        Live Journal
      </h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
        <form>
          <div>
            <label
              for="username"
              class="block text-sm font-medium leading-5 text-gray-700"
            >
              Username
            </label>
            <div class="relative mt-1 rounded-md shadow-sm">
              <input
                id="username"
                v-model="username"
                type="username"
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
              id="username-error"
              class="mt-1 -mb-5 text-xs text-red-600"
            >
              {{ errorMessage }}
            </p>
          </div>

          <div class="mt-6">
            <label
              for="password"
              class="block text-sm font-medium leading-5 text-gray-700"
            >
              Password
            </label>
            <div class="relative mt-1 rounded-md shadow-sm">
              <input
                id="password"
                v-model="password"
                type="password"
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
              id="username-error"
              class="mt-1 -mb-5 text-xs text-red-600"
            >
              {{ errorMessage }}
            </p>
          </div>

          <div class="mt-6">
            <span class="block w-full rounded-md shadow-sm">
              <button
                class="flex justify-center w-full px-4 py-2 text-sm font-medium text-white transition duration-150 ease-in-out bg-amber-600 border border-transparent rounded-md hover:bg-amber-500 focus:outline-none focus:border-amber-700 focus:ring-amber active:bg-amber-700"
                @click.prevent="login"
              >
                Sign in
              </button>
            </span>
          </div>
          <div class="mt-3">
            <NuxtLink href="/signup" class="text-amber-950 underline">
              Sign up
            </NuxtLink>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import api from "../utils/Api";

const username = ref("user1337");
const password = ref("111111");

const message = ref("");
const errorMessage = ref("");

const login = async () => {
  const userData = {
    username: username.value,
    password: password.value,
  };
  const userDataValid = validateUserData(userData);
  if (userDataValid.error) {
    alert(userDataValid.error.message);
    return;
  }
  try {
    const res = await api.request("post", `/users/login`, userData, {
      "Content-Type": "application/json",
    });
    const date_of_expiration = new Date();
    date_of_expiration.setTime(
      date_of_expiration.getTime() + 14 * 24 * 60 * 60 * 1000
    );

    // store jwt and username in cookies
    const jwtCookie = useCookie("jwt", { expires: date_of_expiration });
    const usernameCookie = useCookie("username", {
      expires: date_of_expiration,
    });
    jwtCookie.value = res.data.token;
    usernameCookie.value = res.data.username;

    console.log("signed in");
    message.value = "logged in";
    await navigateTo("/");
  } catch (e: any) {
    if (e.code === "ERR_BAD_REQUEST") {
      alert("There is no such user.");
    } else {
      console.log("Error occurred: " + e.message);
      alert("There is no such user.");
    }
  }
};
</script>
