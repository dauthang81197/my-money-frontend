// const { createGlobPatternsForDependencies } = require('@nx/next/tailwind');

// The above utility import will not work if you are using Next.js' --turbo.
// Instead you will have to manually add the dependent paths to be included.
// For example
// ../libs/buttons/**/*.{ts,tsx,js,jsx,html}',                 <--- Adding a shared lib
// !../libs/buttons/**/*.{stories,spec}.{ts,tsx,js,jsx,html}', <--- Skip adding spec/stories files from shared lib

// If you are **not** using `--turbo` you can uncomment both lines 1 & 19.
// A discussion of the issue can be found: https://github.com/nrwl/nx/issues/26510

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './{src,pages,components,app}/**/*.{ts,tsx,js,jsx,html}',
        '!./{src,pages,components,app}/**/*.{stories,spec}.{ts,tsx,js,jsx,html}',
        //     ...createGlobPatternsForDependencies(__dirname)
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
