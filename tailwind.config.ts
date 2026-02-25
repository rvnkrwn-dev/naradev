import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

export default <Config>{
    content: [
        './app/**/*.{vue,ts,js}',
        './components/**/*.{vue,ts,js}',
        './layouts/**/*.{vue,ts,js}',
        './pages/**/*.{vue,ts,js}',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                display: ['Inter', 'sans-serif'],
                serif: ['Noto Serif', 'serif'],
            },
            colors: {
                primary: {
                    DEFAULT: '#1337ec',
                    dark: '#0b26b0',
                    light: '#eef2ff',
                },
                'background-light': '#f9fafb',
                'background-dark': '#101322',
            },
            borderRadius: {
                DEFAULT: '0.5rem',
                lg: '1rem',
                xl: '1.5rem',
                '2xl': '2rem',
                full: '9999px',
            },
        },
    },
    plugins: [typography],
}
