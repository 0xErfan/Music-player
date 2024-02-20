/** @type {import('tailwindcss').Config} */
export default {

    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],

    theme: {
        container: {
            center: true,
            padding: {
                DEFAULT: "20px",
                "lg": "10px",
            },
        },

        extend: {
            screens: {
                "xs": "460px",
            },
            boxShadow: {
                regular: "0px 10px 30px -17px"
            },
            colors: {
                "primary": "#2C2F33",
                "primaryWhite": "#DFDFDF",
                "primaryOrange": "#DA510B"
            },
            fontFamily: { "josefinSans": "josefinSans", "anta": "anta" }
        },
    },

    plugins: [
        function ({ addVariant }) {
            addVariant('ch', '& > *');
            addVariant('ch-hover', '& > *:hover');
        }
    ],
}