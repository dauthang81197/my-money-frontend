/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: 'var(--color-primary)',
                },
                secondary: {
                    1: 'var(--color-secondary-1)',
                    2: 'var(--color-secondary-2)',
                    3: 'var(--color-secondary-3)',
                    4: 'var(--color-secondary-4)',
                    5: 'var(--color-secondary-5)',
                },
                neutral: {
                    100: 'var(--color-neutral-100)',
                    200: 'var(--color-neutral-200)',
                    300: 'var(--color-neutral-300)',
                    400: 'var(--color-neutral-400)',
                    500: 'var(--color-neutral-500)',
                    600: 'var(--color-neutral-600)',
                    700: 'var(--color-neutral-700)',
                    800: 'var(--color-neutral-800)',
                },
            },
        },
    },
    plugins: [],
};
