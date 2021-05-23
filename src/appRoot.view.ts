import { customElement, property } from 'lit/decorators.js';
import { LitElement, html } from 'lit';

// ----------------------------------------------
// Import WebComponent polyfills for old browsers
import '@webcomponents/webcomponentsjs/webcomponents-loader.js';
import 'lit/polyfill-support.js';

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

    createRenderRoot() { return this; }

    // ------------------------------

    render() {
        return html`
            <h1>Lit Starter Project</h1>
            <basic-component username="Unamed User"></basic-component>
        `;
    }

    // ------------------------------

}
