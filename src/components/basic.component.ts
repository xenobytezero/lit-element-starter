import { customElement, html, LitElement, CSSResult, property } from "lit-element";

// -------------------------------------------------

import styles from './basic.component.scss';

// If you are using a non-code assets in your component
// then you need to import it so Webpack can track it.
import '../../assets/webcomponents_logo.png';

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
            <img src="./assets/webcomponents_logo.png"/>
        `;
    }

}