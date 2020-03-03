export class FileDropComponent extends HTMLElement {

    shadow = null;
    constructor() {
        super();
    }
    connectedCallback() {
        this.render();
        this.setEventHandlers();
    }




    dragLeave = (evt) => {
        evt.preventDefault();
        evt.stopPropagation();
        this.divElement.style.minHeight = '';

    }

    drop = evt => {
        try {
            const file = evt.dataTransfer.files[0];
            this.dispatchEvent(new CustomEvent('file-drop', {detail: file}))
        } catch (err) {
            console.error(err);
        }

        this.divElement.style.borderStyle = 'none';
        this.divElement.style.minHeight = '';
        evt.preventDefault();
        evt.stopPropagation();
    }

    dragEnter = (evt) => {
        evt.preventDefault();
        evt.stopPropagation();

        this.divElement.style.borderStyle = 'dashed';
        this.divElement.style.minHeight = '100px';
    }

    get divElement() {
        return this.querySelector('div') || this.shadow && this.shadow.querySelector('div');
    }

    setEventHandlers() {
        const div = this.divElement;
        div.addEventListener('drop', this.drop);
        div.addEventListener('dragenter', this.dragEnter);
        div.addEventListener('dragleave', this.dragLeave);
        div.addEventListener('dragover', this.dragEnter);

    }

    render() {
        // if (this.getAttribute('use-shadow') !== 'false') {
        //     this.shadow = this.attachShadow({mode: 'closed'})
        // }

        this.innerHTML = `<div>
<span>
        <slot name="drop-text">Drop files here</slot>
        </span>
            </div>`
        if (this.shadow) {
            this.shadow.appendChild(this.querySelector('div'));
        }
    }

}
customElements.define('file-drop-component', FileDropComponent);
