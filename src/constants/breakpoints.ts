import { screens } from 'tailwindcss/defaultTheme';
import { TailwindThemeValue } from 'tailwindcss/tailwind-config';

if (!screens) {
    throw new Error('Expecting TailwindCSS screens to be available');
}

export default ((screens: TailwindThemeValue) => {
    if (typeof screens === 'function') {
        throw new Error('Expecting screens to be an object');
    }

    return Object.keys(screens).reduce((accumulated: { [key: string]: number }, current) => {
        accumulated[current] = parseInt(screens[current]);

        return accumulated;
    }, {});
})(screens);
