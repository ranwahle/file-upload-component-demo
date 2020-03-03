export class DefaultFilePreview extends HTMLDivElement{

    connectedCallback() {
        this.render();
    }

    static get observedAttributes() {
        return ['file-name'];
    }

    attributeChangeCallback() {
        this.render();
    }


    render() {
        const fileName = this.getAttribute('file-name');

        this.textContent = fileName;
    }


}

customElements.define('default-preview-component', DefaultFilePreview, {extends: 'div'});
