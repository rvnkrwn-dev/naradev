export const useArticles = () => {
    const fetchArticles = async (params?: { page?: number; limit?: number; tag?: string; q?: string }) => {
        const query: Record<string, string | number> = {}
        if (params?.page) query.page = params.page
        if (params?.limit) query.limit = params.limit
        if (params?.tag) query.tag = params.tag
        if (params?.q) query.q = params.q

        return await $fetch<{
            success: boolean
            articles: any[]
            total: number
            page: number
            limit: number
        }>('/api/articles', { query })
    }

    const fetchArticle = async (slug: string) => {
        return await $fetch<{ success: boolean; article: any }>(`/api/articles/${slug}`)
    }

    const createArticle = async (data: {
        title_id: string
        title_en: string
        markdown_id: string
        markdown_en: string
        tags: string[]
        description_id: string
        description_en: string
        status: string
        slug?: string
        cover?: string
    }) => {
        return await $fetch<{ success: boolean; slug: string }>('/api/admin/articles', {
            method: 'POST',
            body: data,
        })
    }

    const updateArticle = async (slug: string, data: any) => {
        return await $fetch<{ success: boolean; slug: string }>(`/api/admin/articles/${slug}`, {
            method: 'PUT',
            body: data,
        })
    }

    const deleteArticle = async (slug: string) => {
        return await $fetch<{ success: boolean }>(`/api/admin/articles/${slug}`, {
            method: 'DELETE',
        })
    }

    return {
        fetchArticles,
        fetchArticle,
        createArticle,
        updateArticle,
        deleteArticle,
    }
}
