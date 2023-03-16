import { writable } from 'svelte/store';
import { ImageStatus } from '../types.d';

export const imageStatus = writable(ImageStatus.READY);
export const originalImage = writable(null);
export const modifiedImage = writable(null);
export const imageHeight = writable(0);
export const imageWidth = writable(0);
export const publicId = writable(null);
export const defaultColor = writable("#1C64F2");
export const filters = writable([
    {
        text: "Gray scale",
        value: false,
        id: "grayScale",
    },
    {
        text: "Colorized",
        value: false,
        id: "colorized",
    },
    {
        text: "Sepia",
        value: false,
        id: "sepia",
    },
    {
        text: "Text",
        value: false,
        id: "text",

    },
]);

export const extraFiltersValue = writable(
    {
        text: "", bgColor: "#1C64F2", textColor: "#1C64F2", colorOpacity: 50
    }
);