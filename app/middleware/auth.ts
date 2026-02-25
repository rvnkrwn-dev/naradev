export default defineNuxtRouteMiddleware(async (to) => {
    const { isAuthenticated, fetchUser } = useAuth()

    if (!isAuthenticated.value) {
        await fetchUser()
    }

    if (!isAuthenticated.value) {
        return navigateTo('/login')
    }
})
