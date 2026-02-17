/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'afcon-red': '#801416',
                'afcon-dark': '#620100',
                'afcon-gold': '#fbbf24',
                'afcon-green': '#008751',
            },
            fontFamily: {
                'live': ['LIVE-Font', 'sans-serif'],
                'erbar': ['Erbar-Font', 'sans-serif'],
                'afcon': ['AFCON-Font', 'sans-serif'],
                'sald': ['sald', 'sans-serif'],
            },
        },
    },
    plugins: [],
}

