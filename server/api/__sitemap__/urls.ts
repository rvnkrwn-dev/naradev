import { getAllArticles } from '../../utils/articles'

export default defineSitemapEventHandler(async () => {
    // Ambil semua artikel yang sudah di-publish
    const { articles } = await getAllArticles({
        status: 'published',
        limit: 1000,
        sort: 'latest',
    })

    // Mapping artikel menjadi URL sitemap menggunakan helper module
    return articles.map((article) => {
        return asSitemapUrl({
            loc: `/articles/${article.slug}`,
            lastmod: article.date,
            // Jika ada gambar cover, tambahkan ke sitemap image
            ...(article.cover && {
                images: [{ loc: article.cover }],
            }),
            changefreq: 'weekly',
            priority: 0.8,
        })
    })
})
