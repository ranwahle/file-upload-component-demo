import "./image-preview-component.js";
import './video-preview-component.js';
import './pdf-preview-component.js';
const readFile = (file) => {
    return new Promise((resolve , reject) => {
        const reader = new FileReader();
        reader.onload = evt => {
            resolve(reader.result);
        };
        reader.readAsDataURL(file);
    });
}


const imageHandler =  async file => {
    const result = await readFile(file);
    const component = document.createElement('image-preview-component');
    component.data = result;
    return component;
};

const videoHandler = async file => {
    const result = await readFile(file);
    const component = document.createElement('video-preview-component');
    component.data = result;
    return component;
};

const pdfHandler = async file => {
    const result = await readFile(file);
    const component = document.createElement('pdf-preview-component');
    component.data = result;
    return component;
}

export const fileTypeRenderesDict = {
    'image/jpeg' : imageHandler,
    'image/png': imageHandler,
    'application/pdf': pdfHandler,
    'video/mp4': videoHandler
}
