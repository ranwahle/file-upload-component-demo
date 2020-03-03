export class PdfPreviewComponent extends HTMLElement {

    renderPromise = null;
    renderResolver = null;

    constructor() {
        super();
        this.renderPromise = new Promise(resolve => {
            this.renderResolver = resolve;
        });
    }

    set data(data) {
        this.frameElement.then(element => {
            element.style.borderStyle = 'none';
            element.src=data
        });
    }

    get frameElement() {
        return this.renderPromise.then(() => {
            return this.querySelector('iframe');
        })
    }
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `<iframe></iframe>`;
        this.renderResolver();
    }
}

customElements.define('pdf-preview-component', PdfPreviewComponent);
