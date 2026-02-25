export default defineNuxtPlugin(async () => {
    const { isAuthenticated, fetchUser } = useAuth()

    // On app init, try to restore session from cookie
    if (!isAuthenticated.value) {
        await fetchUser()
    }
})
