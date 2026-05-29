import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Smart Wrong Notebook',
        short_name: 'WrongNB',
        description: 'AI-powered smart wrong question notebook for students',
        start_url: '/?utm_source=pwa',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#f97316',
        orientation: 'any',
        scope: '/',
        icons: [
            {
                src: '/icons/icon.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'any maskable',
            },
        ],
        categories: ['education', 'productivity'],
    }
}
