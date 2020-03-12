import {fileTypeRenderesDict} from "./file-read-handlers.js";
import './file-drop-component.js';
import './default-file-preview.js';

export class FileUploadComponent extends HTMLElement {

    connectedCallback() {
        this.render();
        this.setEventHandlers();
    }

    fileInputChange = () => {
        this.previewElement.innerHTML = '';
        const file = this.fileInputElement.files[0];
        if (!file) {
            return;
        }

        this.renderPreview(file)
    }

    static get observedAttributes() {
        return ['show-file-preview', 'use-shadow']
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'show-file-preview') {
            if (newValue !== 'false') {
                this.previewElement.style.display = '';
            } else {
                this.previewElement.style.display = 'none';

            }
        } else {
            this.useShadow = (newValue !== 'false');
            this.render();
            this.setEventHandlers();
        }
    }

    async renderPreview(file) {
        this.file = file;
        this.previewElement.innerHTML = '';
        const handler = fileTypeRenderesDict[file.type];
        if (!handler) {
            console.warn(`no handler for ${file.type}`);
            const defaultComponent = document.createElement('div', {is: 'default-preview-component'});
            defaultComponent.setAttribute('file-name', file.name);
            this.previewElement.appendChild(defaultComponent);
            return;
        }
        const component = await handler(file);
        this.previewElement.appendChild(component);
    }

    get previewElement() {
        return this.querySelector('div[file-upload-id="preview-area"]');
    }

    get fileInputElement() {
        return this.querySelector('input');
    }

    get fileDropElement() {
        return this.querySelector('div[file-upload-id="drop-area"]')
    }

    upload = async () => {
        this.querySelector('button').disabled = true;

        const formData = new FormData();
        formData.append('file', this.file);
        const uploadURL = this.getAttribute('upload-url') || '/upload';
        const response = await fetch(uploadURL, {method: 'POST', body: formData});

        this.querySelector('button').disabled = false;
        if (response.ok) {

        }
    }

    render() {
        this.innerHTML = `<input type="file">
    <div file-upload-id="preview-area"></div>
    <file-drop-component use-shadow="${this.useShadow}">
            <span slot="drop-text"> Drop text </span>
        </file-drop-component>
      <button>Upload</button>`;
    }

    get fileDropElement() {
        return this.querySelector('file-drop-component');
    }

    fileDropArea() {
        return ` <file-drop-component use-shadow="${this.useShadow}" >
            <div slot="drop-text">Your files here</div>
        </file-drop-component>`;
    }


    setEventHandlers() {
        this.fileInputElement.onchange = this.fileInputChange;
        this.querySelector('button').onclick = this.upload;
        if (this.fileDropElement) {
            this.fileDropElement.addEventListener('file-drop',
                (evt) => this.renderPreview(evt.detail))
        }
    }
}
