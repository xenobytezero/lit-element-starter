

// -------------------------------------------------

import { customElement, html, LitElement, CSSResult } from "lit-element";

import styles from './basic.component.scss';

@customElement('basic-component')
export class BasicComponent extends LitElement {

    // ----------------------------------------------------------
    // Public Props

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
            <h1>It lives!</h1>
        `;
    }

}