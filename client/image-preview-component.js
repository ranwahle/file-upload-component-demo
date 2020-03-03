export class ImagePreviewComponent extends HTMLElement {

    renderPromise = null;
    renderResolver = null;

    constructor() {
        super();
        this.renderPromise = new Promise(resolve => {
            this.renderResolver = resolve;
        });
    }
    connectedCallback() {
        this.render();
    }

    set data(data) {
       this.imageElement.then(element => {
           element.src = data;
       });
    }

    get imageElement() {
        return this.renderPromise.then(() => {
            return this.querySelector('img');
        } )
    }

    render() {

        this.innerHTML = `<img />`;
        this.renderResolver();
    }
}

customElements.define('image-preview-component', ImagePreviewComponent);
