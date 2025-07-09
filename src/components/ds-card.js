class DsCard extends HTMLElement {
  static get observedAttributes() {
    return ['href'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._onKeyDown = this._onKeyDown.bind(this);
  }

  connectedCallback() {
    this.render();
    if (this.hasAttribute('href')) {
      this.shadowRoot.querySelector('.card-link').addEventListener('keydown', this._onKeyDown);
    }
  }

  disconnectedCallback() {
    if (this.hasAttribute('href')) {
      this.shadowRoot.querySelector('.card-link').removeEventListener('keydown', this._onKeyDown);
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'href' && oldValue !== newValue) {
      this.render();
    }
  }

  _onKeyDown(e) {
    if ((e.key === 'Enter' || e.key === ' ') && this.hasAttribute('href')) {
      e.preventDefault();
      this.shadowRoot.querySelector('.card-link').click();
    }
  }

  render() {
    const href = this.getAttribute('href');
    const isLink = !!href;
    this.shadowRoot.innerHTML = `
      <style>
        .card-root {
          display: block;
          background: var(--ds-card-background, #fff) !important;
          border: 1px solid var(--ds-card-border-color, #e0e0e0) !important;
          border-radius: var(--ds-card-border-radius, 12px) !important;
          box-shadow: var(--ds-card-shadow, 0 2px 8px rgba(0,0,0,0.04)) !important;
          padding: var(--ds-card-padding, 2rem 2.5rem) !important;
          min-width: 200px;
          min-height: 120px;
          color: var(--ds-card-text-color, #222) !important;
          transition: box-shadow 0.2s, border 0.2s;
          outline: none;
          text-decoration: none !important;
          cursor: ${isLink ? 'pointer' : 'default'};
          text-align: center;
        }
        .card-root:focus, .card-root:focus-visible, .card-root:active, .card-root:hover {
          border: 1px solid var(--ds-color-primary, #007bff) !important;
          box-shadow: 0 4px 16px rgba(0,123,255,0.08) !important;
        }
        ::slotted(h2) {
          margin: 0 0 0.5rem 0;
          font-size: 1.3rem;
          color: var(--ds-color-primary, #007bff) !important;
        }
        ::slotted(p), ::slotted(div), ::slotted(span), ::slotted(*) {
          color: #555 !important;
          text-decoration: none !important;
        }
      </style>
      ${isLink ? `
        <a class="card-root card-link" href="${href}" tabindex="0" role="link" target="_blank" rel="noopener">
          <slot></slot>
        </a>
      ` : `
        <div class="card-root card-content" role="group" tabindex="0" aria-label="Card">
          <slot></slot>
        </div>
      `}
    `;
  }
}

customElements.define('ds-card', DsCard); 