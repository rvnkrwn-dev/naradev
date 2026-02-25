import { requireAuth } from '../../utils/guards'
import { getUserReadingList } from '../../utils/readinglist'
import { getArticleBySlug } from '../../utils/articles'

export default defineEventHandler(async (event) => {
    const auth = requireAuth(event)
    const slugs = await getUserReadingList(auth.userId)

    // Fetch article details for each slug
    const articles = []
    for (const slug of slugs) {
        try {
            const article = await getArticleBySlug(slug)
            if (article && article.status === 'published') {
                articles.push({
                    title_id: article.title_id,
                    title_en: article.title_en,
                    slug: article.slug,
                    date: article.date,
                    description_id: article.description_id,
                    description_en: article.description_en,
                    tags: article.tags,
                    status: article.status,
                    authorId: article.authorId,
                    cover: article.cover,
                    author: article.author,
                    stats: article.stats,
                })
            }
        } catch {
            // Skip articles that no longer exist
        }
    }

    return {
        success: true,
        articles,
        total: articles.length,
    }
})
