const { nextui } = require('@nextui-org/react');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',

        // Or if using `src` directory:
        './src/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {},
    },
    darkMode: 'class',
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/aspect-ratio'),
        nextui({
            addCommonColors: true,
            defaultTheme: 'light',
            themes: {
                light: {
                    colors: {
                        primary: {
                            50: '#FFE5EA',
                            100: '#FFC7D0',
                            200: '#FF8FA2',
                            300: '#FF5C77',
                            400: '#FF2448',
                            500: '#EB0028',
                            600: '#BD001F',
                            700: '#8F0018',
                            800: '#5C000F',
                            900: '#2E0008',
                            950: '#190004',
                            DEFAULT: '#EB0028',
                            foreground: '#FFFFFF',
                        },
                        secondary: {
                            base: '#000000',
                        },
                    },
                },
            },
        }),
    ],
};

/*
defaultExtendTheme: {
                screens: {
                    xs: '375px',
                },
                colors: {
                    primary: {
                        50: '#FFE5EA',
                        100: '#FFC7D0',
                        200: '#FF8FA2',
                        300: '#FF5C77',
                        400: '#FF2448',
                        500: '#EB0028',
                        600: '#BD001F',
                        700: '#8F0018',
                        800: '#5C000F',
                        900: '#2E0008',
                        950: '#190004',
                        default: '#EB0028',
                    },
                    secondary: {
                        base: '#000000',
                    },
                },
            },

*/
