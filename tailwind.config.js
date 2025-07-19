const flowbite = require('flowbite-react/tailwind')
const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{js,ts,jsx,tsx}',
        './public/index.html',
        flowbite.content(),
    ],

    theme: {
        extend: {
            spacing: {
                'icon-xs': '12px', // 0.75rem
                'icon-sm': '16px', // 1rem
                'icon-md': '24px', // 1.5rem
                'icon-lg': '32px', // 2rem

                1: '4px', // 16 x 0.25
                2: '8px', // 16 x 0.5
                3: '12px', // 16 x 0.75
                4: '16px', // 16 x 1
                6: '24px', // 16 x 1.5
                8: '32px', // 16 x 2
                12: '48px', // 16 x 3
                16: '64px', // 16 x 4
                24: '96px', // 16 x 6
                32: '128px', // 16 x 8
                48: '192px', // 16 x 12
                64: '256px', // 16 x 16
                96: '384px', // 16 x 24
                128: '512px', // 16 x 32
                160: '640px', // 16 x 40
                192: '768px', // 16 x 48
            },
            boxShadow: {
                xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
                md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
                lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
                xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',

                // Custom professional shadows
                soft: '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
                medium: '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                hard: '0 10px 40px -10px rgba(0, 0, 0, 0.2)',
                glow: '0 0 0 1px rgba(59, 130, 246, 0.1), 0 4px 16px -2px rgba(59, 130, 246, 0.2)',
                'glow-primary':
                    '0 0 0 1px rgba(33, 36, 44, 0.1), 0 4px 16px -2px rgba(33, 36, 44, 0.2)',
                'glow-secondary':
                    '0 0 0 1px rgba(16, 149, 241, 0.1), 0 4px 16px -2px rgba(16, 149, 241, 0.2)',
                'glow-tertiary':
                    '0 0 0 1px rgba(16, 185, 129, 0.1), 0 4px 16px -2px rgba(16, 185, 129, 0.2)',
            },

            // Professional Animations
            animation: {
                // Fade animations
                'fade-in': 'fadeIn 0.3s ease-out',
                'fade-in-slow': 'fadeIn 0.6s ease-out',
                'fade-out': 'fadeOut 0.2s ease-in',

                // Slide animations
                'slide-up': 'slideUp 0.3s ease-out',
                'slide-down': 'slideDown 0.3s ease-out',
                'slide-left': 'slideLeft 0.3s ease-out',
                'slide-right': 'slideRight 0.3s ease-out',

                // Scale animations
                'scale-in': 'scaleIn 0.2s ease-out',
                'scale-out': 'scaleOut 0.15s ease-in',
                'scale-up': 'scaleUp 0.2s ease-out',

                // Bounce and spring animations
                'bounce-soft': 'bounceSoft 0.6s ease-in-out',
                spring: 'spring 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',

                // Pulse and glow
                'pulse-soft':
                    'pulseSoft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                glow: 'glow 2s ease-in-out infinite alternate',

                // Button specific
                'button-pop': 'buttonPop 0.15s ease-out',
                'button-press': 'buttonPress 0.1s ease-in-out',

                // Loading animations
                'spin-slow': 'spin 3s linear infinite',
                wiggle: 'wiggle 1s ease-in-out infinite',
                float: 'float 3s ease-in-out infinite',
            },

            keyframes: {
                // Fade keyframes
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                fadeOut: {
                    '0%': { opacity: '1' },
                    '100%': { opacity: '0' },
                },

                // Slide keyframes
                slideUp: {
                    '0%': { transform: 'translateY(10px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                slideDown: {
                    '0%': { transform: 'translateY(-10px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                slideLeft: {
                    '0%': { transform: 'translateX(10px)', opacity: '0' },
                    '100%': { transform: 'translateX(0)', opacity: '1' },
                },
                slideRight: {
                    '0%': { transform: 'translateX(-10px)', opacity: '0' },
                    '100%': { transform: 'translateX(0)', opacity: '1' },
                },

                // Scale keyframes
                scaleIn: {
                    '0%': { transform: 'scale(0.95)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
                scaleOut: {
                    '0%': { transform: 'scale(1)', opacity: '1' },
                    '100%': { transform: 'scale(0.95)', opacity: '0' },
                },
                scaleUp: {
                    '0%': { transform: 'scale(1)' },
                    '100%': { transform: 'scale(1.05)' },
                },

                // Bounce and spring
                bounceSoft: {
                    '0%, 20%, 53%, 80%, 100%': { transform: 'translateY(0)' },
                    '40%, 43%': { transform: 'translateY(-8px)' },
                    '70%': { transform: 'translateY(-4px)' },
                    '90%': { transform: 'translateY(-2px)' },
                },
                spring: {
                    '0%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.05)' },
                    '100%': { transform: 'scale(1)' },
                },

                // Pulse and glow
                pulseSoft: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.8' },
                },
                glow: {
                    '0%': { boxShadow: '0 0 5px rgba(59, 130, 246, 0.2)' },
                    '100%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)' },
                },

                // Button animations
                buttonPop: {
                    '0%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(0.98)' },
                    '100%': { transform: 'scale(1)' },
                },
                buttonPress: {
                    '0%': { transform: 'scale(1)' },
                    '100%': { transform: 'scale(0.98)' },
                },

                // Fun animations
                wiggle: {
                    '0%, 100%': { transform: 'rotate(-3deg)' },
                    '50%': { transform: 'rotate(3deg)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
            },
            fontSize: {
                // Body text sizes
                xs: '0.75rem', // 12px
                sm: '0.875rem', // 14px
                base: '1rem', // 16px - body text
                lg: '1.125rem', // 18px
                xl: '1.25rem', // 20px

                // Custom heading utility classes
                h1: ['48px', { lineHeight: '1.2', fontWeight: '700' }],
                h2: ['36px', { lineHeight: '1.25', fontWeight: '600' }],
                h3: ['30px', { lineHeight: '1.3', fontWeight: '600' }],
                h4: ['24px', { lineHeight: '1.35', fontWeight: '600' }],
                h5: ['20px', { lineHeight: '1.4', fontWeight: '500' }],
                h6: ['18px', { lineHeight: '1.45', fontWeight: '500' }],
            },
            colors: {
                // Primary brand color (dark blue-grey)
                primary: {
                    50: '#f8f9fa',
                    100: '#f1f3f4',
                    200: '#e3e5e8',
                    300: '#d1d5db',
                    400: '#9ca3af',
                    DEFAULT: '#21242c',
                    500: '#21242c', // Original color
                    600: '#1d2026',
                    700: '#191c21',
                    800: '#15181c',
                    900: '#111317',
                    950: '#0d0f12',
                },

                // Secondary brand color (blue)
                secondary: {
                    50: '#eff9ff',
                    100: '#def2ff',
                    200: '#b6e8ff',
                    300: '#75d9ff',
                    400: '#2cc7ff',
                    500: '#1095f1', // Original color
                    DEFAULT: '#1095f1',
                    600: '#0077d4',
                    700: '#005fab',
                    800: '#004f8d',
                    900: '#064274',
                    950: '#042a4d',
                },

                // Tertiary brand color (green)
                tertiary: {
                    50: '#ecfdf5',
                    100: '#d1fae5',
                    200: '#a7f3d0',
                    300: '#6ee7b7',
                    400: '#34d399',
                    500: '#10b981', // Original color
                    DEFAULT: '#10b981',
                    600: '#059669',
                    700: '#047857',
                    800: '#065f46',
                    900: '#064e3b',
                    950: '#022c22',
                },

                // Custom grey variations
                virtu_grey: {
                    50: '#f7f9fa',
                    100: '#eef2f5',
                    200: '#dae2e8',
                    300: '#bcc8d1',
                    400: '#98a9b5',
                    500: 'hsl(201,23%,34%)', // Original color
                    DEFAULT: 'hsl(201,23%,34%)',
                    600: '#5a7283',
                    700: '#4a5e6b',
                    800: '#3f4e59',
                    900: '#37424c',
                    950: '#242a31',
                },

                virtu_soft_grey: {
                    50: '#f8fafb',
                    100: '#f0f4f7',
                    200: '#dfe6eb',
                    300: '#c7d2d9',
                    400: '#a9bac4',
                    500: 'hsl(203,15%,47%)', // Original color
                    DEFAULT: 'hsl(203,15%,47%)',
                    600: '#6b7c87',
                    700: '#58656f',
                    800: '#4a545d',
                    900: '#40474f',
                    950: '#292e33',
                },

                // Border color
                border: {
                    50: '#fafafa',
                    100: '#f5f5f5',
                    200: '#eeeeee',
                    300: '#e0e0e0',
                    400: '#bdbdbd',
                    500: '#e5e5e5', // Original color
                    DEFAULT: '#e5e5e5',
                    600: '#9e9e9e',
                    700: '#757575',
                    800: '#616161',
                    900: '#424242',
                    950: '#212121',
                },
            },

            // Typography
            fontFamily: {
                exo: ['Exo', ...defaultTheme.fontFamily.sans],
                opensans: ['Open Sans', ...defaultTheme.fontFamily.sans],
                mier: ['MierB', ...defaultTheme.fontFamily.sans],
            },

            // Responsive Breakpoints
            screens: {
                xs: '480px',
                sm: '640px',
                md: '768px',
                lg: '1024px',
                xl: '1280px',
                '2xl': '1536px',
                '3xl': '1920px',
            },
        },
    },

    plugins: [flowbite.plugin()],
}
