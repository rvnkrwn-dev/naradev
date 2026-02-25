export default defineNitroPlugin((nitroApp) => {
    // Only run in production
    if (process.env.NODE_ENV !== 'production') return

    // Function to ping search engines
    const pingSearchEngines = async () => {
        const siteUrl = 'https://naradev.id' // Change to actual url
        const sitemapUrl = `${siteUrl}/sitemap.xml`

        try {
            // Ping Google
            await $fetch(`https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`)
            console.log('[Sitemap Ping] Successfully pinged Google')

            // Ping Bing
            await $fetch(`https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`)
            console.log('[Sitemap Ping] Successfully pinged Bing')
        } catch (error) {
            console.error('[Sitemap Ping] Failed to ping search engines:', error)
        }
    }

    // Ping once on startup (with a small delay to ensure server is ready)
    setTimeout(pingSearchEngines, 1000 * 60 * 5) // 5 minutes after startup

    // Then ping periodically (e.g. every 24 hours)
    const ONE_DAY = 1000 * 60 * 60 * 24
    setInterval(pingSearchEngines, ONE_DAY)
})
