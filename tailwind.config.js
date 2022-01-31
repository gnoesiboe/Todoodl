module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    mode: 'jit',
    theme: {
        extend: {},
    },
    plugins: [require('@tailwindcss/forms')],
};
