import { LitElement, html, customElement, property } from 'lit-element';

// ----------------------------------------------
// Import WebComponent polyfills for old browsers
import '@webcomponents/webcomponentsjs/webcomponents-bundle.js';

// ----------------------------------------------
// Import dependent components
import './components/basic.component';

// ----------------------------------------------
// Import SASS
import './appRoot.view.scss';

// ----------------------------------------------

@customElement('app-root')
export class AppRoot extends LitElement {

    // ------------------------------

    createRenderRoot() {
        return this;
    }

    // ------------------------------

    render() {
        return html`
            <h1>LitElement</h1>
            <basic-component username="Unamed User"></basic-component>
        `;
    }

    // ------------------------------

}
