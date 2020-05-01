import { customElement, html, LitElement, CSSResult, property } from "lit-element";
import { library, findIconDefinition, icon, IconLookup, IconName, Icon } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

// -------------------------------------------------

import styles from './fancyBadge.component.scss';

// -------------------------------------------------

export enum Presets {
    Success = 'success',
    Warning  = 'warning',
    Error  = 'error',
    Info = 'info'
}

const presetIcons: Map<string,string> = new Map([
    ['success', 'check'],
    ['warning', 'exclamation-triangle'],
    ['error', 'times-circle'],
    ['info', 'info']
]);

const missingIconName = 'question-circle';

export class DismissEvent extends CustomEvent<void> {
    constructor() {
        super('dismiss', {
            bubbles: true,
            composed: true
        })
    }
 }

// -------------------------------------------------

/**
 * This is a simple "badge" component used to indicate the status
 * of operations, or do display warnings/errors
 *
 * @csspart bg - The badge background
 * @csspart text - The badge text content
 * @csspart icon - The badge icon
 *
 * @fires dismiss - Fired when the user clicks the dismiss button
 */
@customElement('fancy-badge')
export class FancyBadgeComponent extends LitElement {

    // ----------------------------------------------------------
    // Public Props

    /** The text to display in the badge */
    @property() public text: string = 'Badge';

    /** The icon to display in the badge, which should be the name of a FontAwesome icon */
    @property() public icon: string | null = null;

    /**
     * The 'preset' for the badge, which will override the icon and colors set elsewhere
     * @type {null | "success" | "warning" | "error" | }
    */
    @property() public preset: Presets | null = null;

    /** Should the dismiss button be visible for the badge */
    @property({type: Boolean}) public dismissable: boolean = false;

    // Private Props

    // Private Data

    // ----------------------------------------------------------

    constructor() {
        super();
        library.add(fas)
    }

    // ----------------------------------------------------------

    private getIcon(iconName: string) {
        const iDef = findIconDefinition({ prefix: 'fas', iconName: iconName as IconName })
        return icon(iDef);
    }

    // ----------------------------------------------------------

    private resolveIcon(): Icon | null {
        if (this.preset !== null){

            const presetIcon = presetIcons.get(this.preset);

            if (presetIcon !== undefined) {
                return this.getIcon(presetIcon)
            } else {
                return this.getIcon(missingIconName)
            }

        } else if(this.icon !== null) {
            return this.getIcon(this.icon);
        }

        return null;

    }

    // ----------------------------------------------------------

    private emitDismissEvent() {
        this.dispatchEvent(new DismissEvent())
    }

    // ----------------------------------------------------------
    // ----------------------------------------------------------
    // ----------------------------------------------------------

    static get styles() { return styles as CSSResult; }

    public render() {

        let i = this.resolveIcon();

        return html`
            <div part="bg" class="bg">
                <div part="icon" class="icon">${i?.node ?? ''}</div>
                <span part="text" class="text">${this.text}</span>

                ${this.dismissable ?
                    html`
                        <div part="dismiss" class="dismiss" @click=${() => { this.emitDismissEvent(); }}>
                            ${this.getIcon('times').node}
                        </div>

                    ` : ''
                }

            </div>
        `
    }

}