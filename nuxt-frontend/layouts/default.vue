<template>
  <div>
    <div
      v-if="showHeader"
      id="fullpage-div"
      class="min-h-full py-0 px-0 bg-orange-100"
    >
      <TheHeader />
      <div class="min-height90vh flex">
        <TheMenu></TheMenu>
        <div class="width80vw px-16 py-10 col-span-4">
          <button @click="goBack" class="rounded-full hover:shadow-lg">
            <img src="../back-48.png" />
          </button>
          <NuxtPage />
        </div>
      </div>
    </div>
    <div v-else>
      <NuxtPage />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    // Check if the current route is the login page
    showHeader() {
      return this.$route.path !== "/login" && this.$route.path !== "/signup";
    },
  },
};
</script>

<!-- styles available in all the files -->
<style>
.min-height90vh {
  min-height: 90vh;
}

.width20vw {
  width: 20vw;
}

.width80vw {
  width: 80vw;
}
</style>
