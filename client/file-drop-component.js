export class FileDropComponent extends HTMLElement {

    shadow = null;

    connectedCallback() {
        this.render();
        setTimeout(() =>
            this.setEventHandlers());
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


        const template = document.createElement('template');
        template.innerHTML = ` <div>
        <slot name="drop-text"><span>Default</span></slot>
    </div>`;
        this.appendChild(template);

        const {content} = template;
         if (this.getAttribute('use-shadow') !== 'false') {
            this.shadow = this.attachShadow({mode: 'open'})
        }
        if (this.shadow) {
            this.shadow.appendChild(content.cloneNode(true));
        } else {
            this.appendChild(content.cloneNode(true));
        }


    }

}

customElements.define('file-drop-component', FileDropComponent);
