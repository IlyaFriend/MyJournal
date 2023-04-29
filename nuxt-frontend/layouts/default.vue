<template>
  <div>
    <div v-if="showHeader" id="fullpage-div" class="min-h-full py-0 px-0 bg-orange-100">
      <TheHeader />
      <div class="height90vh grid grid-cols-5">
        <TheMenu></TheMenu>
        <div class="px-8 py-10 col-span-4">
          <NuxtPage />
        </div>
      </div>
    </div>
    <div v-else>
        <NuxtPage />
    </div>
    <!-- <TheFooter /> -->
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

<style scoped>
.height90vh {
  height: 90vh;
}
</style>
