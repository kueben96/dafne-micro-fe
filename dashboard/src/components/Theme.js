import { reactive } from 'vue';

async function fetchPalette() {
    const palette = await import('theme/palette');
    console.log("fetchPalette function")
    console.log(palette.default)

    return palette.default;
}

const globalPalette = reactive({
    primary: {
        main: '#6CC1B5',
        dark: '#3C9085',
        light: '#A9DBD4',
        lighter: '#E2F3F1',
    },
});

export default globalPalette;