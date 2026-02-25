import type { PublicUser } from '~/server/utils/users'

interface AuthState {
    user: PublicUser | null
    isAuthenticated: boolean
    loading: boolean
}

export const useAuth = () => {
    const user = useState<PublicUser | null>('auth-user', () => null)
    const isAuthenticated = computed(() => !!user.value)
    const loading = useState<boolean>('auth-loading', () => false)

    const fetchUser = async () => {
        try {
            loading.value = true
            const data = await $fetch<{ success: boolean; user: PublicUser }>('/api/auth/me')
            user.value = data.user
        } catch {
            user.value = null
        } finally {
            loading.value = false
        }
    }

    const login = async (username: string, password: string) => {
        const data = await $fetch<{ success: boolean; user: PublicUser }>('/api/auth/login', {
            method: 'POST',
            body: { username, password },
        })
        user.value = data.user
        return data
    }

    const register = async (form: { username: string; name: string; email: string; password: string }) => {
        const data = await $fetch<{ success: boolean; user: PublicUser }>('/api/auth/register', {
            method: 'POST',
            body: form,
        })
        user.value = data.user
        return data
    }

    const logout = async () => {
        await $fetch('/api/auth/logout', { method: 'POST' })
        user.value = null
        navigateTo('/login')
    }

    return {
        user,
        isAuthenticated,
        loading,
        fetchUser,
        login,
        register,
        logout,
    }
}
