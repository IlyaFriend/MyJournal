export default defineNuxtRouteMiddleware(async (to, from) => {
  if (to.fullPath === "/login" || to.fullPath === "/signup") {
    return;
  }

  if (true) {
    const jwt = useCookie("jwt");
    if (!jwt.value) {
      return navigateTo("/login");
    }

    const user = await getCurrentUser()
    
    if (!user) {
      return navigateTo("/login");
    }
  }
});
