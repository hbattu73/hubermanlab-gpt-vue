/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "light-bg-primary": "#FEFEFA",
                "light-header": "#386486",
                "light-border": "rgb(82 82 82 / 15%)",
                "light-icon": "#213547",
                "primary": "#2B4458",
            },
        },
        fontFamily: {
            'lato': ['Lato', 'sans-serif'],
            'geologica': ['Geologica', 'sans-serif']
        },
        screens: {
            'sm': '640px',
            'md': '768px',
            'md-lg': '984px',
            'lg': '1024px',
            'xl': '1280px',
            '2xl': '1536px',
        },
        container: {
            center: true,
            screens: {
                sm: '600px',
                md: '728px',
                lg: '1024px',
                xl: '1240px',
                '2xl': '1496px',
            },
        },
        borderWidth: {
            '0': '0',
            '1': '1px',
            '2': '2px',
            '4': '4px',
        },
    },
  plugins: [],
}

