import { customElement, html, LitElement, CSSResult, property } from "lit-element";

// -------------------------------------------------

import styles from './basic.component.scss';

// -------------------------------------------------

@customElement('basic-component')
export class BasicComponent extends LitElement {

    // ----------------------------------------------------------
    // Public Props
    @property({type: String}) public userName: string = '';

    // Private Props

    // Private Data

    // ----------------------------------------------------------

    constructor() {
        super();
    }

    // ----------------------------------------------------------
    // ----------------------------------------------------------
    // ----------------------------------------------------------

    static get styles() { return styles as CSSResult; }

    public render() {
        return html`
            <h1>Hello, ${this.userName}</h1>
        `;
    }

}