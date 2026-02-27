import { ghPutFile, ghGetFile, ghRawUrl } from './github'

/**
 * AI Author profiles with focused topics for content generation.
 */
export interface AIAuthorProfile {
    id: string
    name: string
    focus: string
    topics: string[]
    defaultTags: string[]
}

export const AI_AUTHORS: AIAuthorProfile[] = [
    {
        id: 'usr_ai_frontend',
        name: 'Anya Pratiwi',
        focus: 'Frontend Development & UI/UX',
        topics: [
            'React hooks and patterns', 'Vue 3 composition API', 'CSS Grid vs Flexbox',
            'Web accessibility (a11y)', 'Responsive design techniques', 'Tailwind CSS tips',
            'State management patterns', 'Component design systems', 'Web animations with CSS',
            'Progressive Web Apps', 'Frontend performance optimization', 'Modern JavaScript ES2024',
            'TypeScript for frontend', 'Next.js vs Nuxt comparison', 'Form validation best practices',
        ],
        defaultTags: ['javascript', 'css', 'vue', 'react', 'ui-ux'],
    },
    {
        id: 'usr_ai_backend',
        name: 'Bima Nugroho',
        focus: 'Backend Development & API Design',
        topics: [
            'REST API design principles', 'Node.js performance tuning', 'Database indexing strategies',
            'Authentication with JWT', 'GraphQL vs REST', 'Microservices architecture',
            'Error handling patterns', 'API rate limiting', 'Caching strategies with Redis',
            'SQL vs NoSQL databases', 'Serverless functions', 'WebSocket real-time communication',
            'File upload handling', 'API versioning strategies', 'ORM vs raw SQL queries',
        ],
        defaultTags: ['nodejs', 'nuxt', 'api', 'database', 'backend'],
    },
    {
        id: 'usr_ai_devops',
        name: 'Citra Wulandari',
        focus: 'DevOps & Cloud Infrastructure',
        topics: [
            'Docker containerization guide', 'CI/CD pipeline setup', 'Kubernetes basics',
            'GitHub Actions workflows', 'Nginx reverse proxy', 'Linux server administration',
            'Cloud deployment strategies', 'Infrastructure as Code with Terraform',
            'Monitoring with Prometheus and Grafana', 'Log management best practices',
            'SSL/TLS certificate management', 'Automated testing in CI/CD',
            'Blue-green deployment', 'Container orchestration', 'Cloud cost optimization',
        ],
        defaultTags: ['devops', 'docker', 'ci-cd', 'cloud', 'linux'],
    },
    {
        id: 'usr_ai_mobile',
        name: 'Dimas Saputra',
        focus: 'Mobile App Development',
        topics: [
            'Flutter widget lifecycle', 'React Native navigation', 'Mobile app state management',
            'Offline-first mobile apps', 'Push notification implementation', 'Mobile app performance',
            'Cross-platform development comparison', 'Mobile UI/UX patterns',
            'App store optimization (ASO)', 'Mobile testing strategies',
            'Biometric authentication on mobile', 'Deep linking in mobile apps',
            'Mobile database with SQLite', 'Responsive mobile layouts', 'Mobile app security',
        ],
        defaultTags: ['flutter', 'react-native', 'mobile', 'android', 'ios'],
    },
    {
        id: 'usr_ai_security',
        name: 'Elsa Rahmawati',
        focus: 'Cybersecurity & Best Practices',
        topics: [
            'OWASP Top 10 explained', 'SQL injection prevention', 'XSS attack prevention',
            'Secure authentication patterns', 'API security best practices', 'CORS explained',
            'Content Security Policy (CSP)', 'Password hashing best practices',
            'Two-factor authentication implementation', 'Security headers guide',
            'Dependency vulnerability scanning', 'Secure file upload handling',
            'Rate limiting and DDoS prevention', 'Data encryption at rest and in transit',
            'Security audit checklist for web apps',
        ],
        defaultTags: ['security', 'authentication', 'testing', 'performance'],
    },
]

export function getAIAuthorById(id: string): AIAuthorProfile | undefined {
    return AI_AUTHORS.find(a => a.id === id)
}

export function getRandomAIAuthor(): AIAuthorProfile {
    return AI_AUTHORS[Math.floor(Math.random() * AI_AUTHORS.length)]!
}

function getRandomTopic(author: AIAuthorProfile): string {
    return author.topics[Math.floor(Math.random() * author.topics.length)]!
}

function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()
}

/**
 * Generate article content using GPT-4o mini.
 */
export async function generateArticleContent(
    author: AIAuthorProfile,
    customTopic?: string
): Promise<{
    title_id: string
    title_en: string
    slug: string
    description_id: string
    description_en: string
    tags: string[]
    body: string
}> {
    const config = useRuntimeConfig()
    const apiKey = config.openaiApiKey as string

    if (!apiKey) {
        throw createError({ statusCode: 500, message: 'OPENAI_API_KEY is not configured' })
    }

    const topic = customTopic || getRandomTopic(author)

    const systemPrompt = `You are ${author.name}, a professional tech writer specializing in ${author.focus}. 
You write in-depth, high-quality, SEO-optimized technical articles for the Naradev engineering blog.

CRITICAL RULES:
1. Write content in BOTH Indonesian (Bahasa Indonesia) AND English
2. Use the EXACT bilingual markdown format with markers
3. Each language version must be independently complete and natural
4. Include practical code examples with syntax highlighting
5. Use proper heading hierarchy (H1 for title, H2 for sections, H3 for subsections)
6. Write at least 800-1200 words per language
7. Include actionable tips and best practices
8. Use engaging, conversational yet professional tone
9. SEO: include relevant keywords naturally, use descriptive headings
10. End with a conclusion and call-to-action`

    const userPrompt = `Generate a complete technical article about: "${topic}"

Return a valid JSON object with this EXACT structure (no markdown wrapping, pure JSON):
{
  "title_id": "Judul dalam Bahasa Indonesia",
  "title_en": "Title in English",
  "description_id": "Deskripsi SEO 120-160 karakter dalam Bahasa Indonesia",
  "description_en": "SEO description 120-160 characters in English",
  "tags": ["tag1", "tag2", "tag3"],
  "body_id": "Full markdown content in Indonesian (without frontmatter, starting with # heading)",
  "body_en": "Full markdown content in English (without frontmatter, starting with # heading)"
}

IMPORTANT:
- tags should be 3-5 lowercase single-word tags relevant to the topic
- body_id and body_en must be complete standalone articles
- Include code blocks with language specifiers (e.g. \`\`\`typescript)
- Use ## for main sections and ### for subsections
- Include practical examples developers can immediately use`

    let response: any
    try {
        response = await $fetch<any>('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: {
                model: 'gpt-4o-mini',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userPrompt },
                ],
                max_completion_tokens: 16000,
                response_format: { type: 'json_object' },
            },
        })
    } catch (err: any) {
        const detail = err?.data || err?.response?._data || err?.message
        console.error('[openai] Chat completion error:', JSON.stringify(detail))
        throw createError({ statusCode: 502, message: `OpenAI error: ${JSON.stringify(detail)}` })
    }

    const content = response.choices?.[0]?.message?.content
    if (!content) {
        throw createError({ statusCode: 500, message: 'Empty response from OpenAI' })
    }

    const parsed = JSON.parse(content)

    // Build bilingual body with markers
    const body = `<!-- lang:id -->\n${parsed.body_id}\n\n<!-- lang:en -->\n${parsed.body_en}`

    // Pick tags: merge AI-suggested tags with author defaults (deduplicated, max 5)
    const allTags = [...new Set([...parsed.tags, ...author.defaultTags.slice(0, 2)])]
    const tags = allTags.slice(0, 5)

    const slug = slugify(parsed.title_en).slice(0, 60)

    return {
        title_id: parsed.title_id,
        title_en: parsed.title_en,
        slug,
        description_id: parsed.description_id,
        description_en: parsed.description_en,
        tags,
        body,
    }
}

/**
 * Generate a cover image using dall-e-3 and upload it to GitHub.
 */
export async function generateCoverImage(
    slug: string,
    title: string,
    tags: string[]
): Promise<string> {
    const config = useRuntimeConfig()
    const apiKey = config.openaiApiKey as string

    if (!apiKey) {
        throw createError({ statusCode: 500, message: 'OPENAI_API_KEY is not configured' })
    }

    const prompt = `Create a modern, minimalist, professional blog cover image for a tech article titled "${title}". 
Topics: ${tags.join(', ')}. 
Style: Clean gradient background, subtle geometric shapes or abstract tech elements, no text overlay, no logos. 
Colors: Professional blues, teals, and purples. Aspect ratio: 16:10. High quality, editorial style.`

    const response = await $fetch<any>('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
        },
        body: {
            model: 'dall-e-3',
            prompt,
            n: 1,
            size: '1024x1024',
            quality: 'standard',
            response_format: 'b64_json',
        },
    })

    const imageData = response.data?.[0]?.b64_json
    if (!imageData) {
        console.warn('[openai] No image generated, skipping cover')
        return ''
    }

    // Upload to GitHub as cover image
    const coverPath = `public/covers/${slug}.png`
    const imageBuffer = Buffer.from(imageData, 'base64')

    const existingFile = await ghGetFile(coverPath)
    const sha = existingFile?.sha

    await ghPutFile(
        coverPath,
        imageBuffer,
        `Add cover image: ${slug}`,
        sha
    )

    // Return the raw GitHub URL for the image
    return ghRawUrl(coverPath)
}
