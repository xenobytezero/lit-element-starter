import { html } from 'lit-html';
import { text, select, withKnobs, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { Presets, FancyBadgeComponent } from './fancyBadge.component.ts'

// Storybook Definition -------------------------------------

export default {
  title: 'FancyBadge',
  component: 'fancy-badge',
  decorators: [withKnobs],
};

// -----------------------------------------------------------

export const Default = () => {
    return html`
        <fancy-badge icon='box-open' text='Your Package Has Been Delivered!'></fancy-badge>

    `
}

export const Text = () => {
    const txt = text('Badge Text', 'Text Goes Here')
    return html`<fancy-badge text='${txt}'></fancy-badge>`
}

export const Icon = () => {
    const icon = text('Icon (FontAwesome)', 'thumbtack');
    return html`<fancy-badge icon="${icon}" text="Pinned Item"></fancy-badge>`
}

export const Preset = () => {
    const options = Presets;
    const prst = select('Presets', options, 'info');

    return html`<fancy-badge preset="${prst}" text="${getKeyByValue(Presets, prst)}"></fancy-badge>`
}

export const Dismiss = () => {
    const dismissEnabled = boolean('Enable Dismiss', true);
    return html`<fancy-badge
        ?dismissable=${dismissEnabled}
        @dismiss=${action('dismiss-click')}}
        text="I'm Dismissable"
    ></fancy-badge>`
}

// --------------------------------------------

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }