export class VideoPreviewComponent extends HTMLElement {
    renderPromise = null;
    renderResolver = null;

    constructor() {
        super();
        this.renderPromise = new Promise(resolve => {
            this.renderResolver = resolve;
        });
    }

    set data(data) {
        this.videoElement.then(element => {
            const srcElement = document.createElement('source');
            srcElement.src = data;
            srcElement.type = 'video/mp4';
            element.appendChild(srcElement);

        })
    }

    get videoElement() {
        return this.renderPromise.then(() => {
              return this.querySelector('video');
            })
        }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `<video controls pictureinpicture>No source</video>`;
        this.renderResolver();

    }

}

customElements.define('video-preview-component', VideoPreviewComponent);
