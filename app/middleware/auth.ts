export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    const token = localStorage.getItem('token')

    // Don't redirect if already on login page
    if (!token && to.path !== '/login' && to.path !== "/" && to.path !== "/register") {
      return navigateTo('/login')
    }
  }
})
