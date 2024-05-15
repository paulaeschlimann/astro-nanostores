import { LitElement, html, css } from 'lit';
import { isCartOpen, cartItems } from '../cartStore';
import { StoreController } from '@nanostores/lit';

export default class CartFlyoutLit extends LitElement {
  static properties = {
    name: { type: String, attribute: false },
    name3: { type: String }
  };

  private cartOpen = new StoreController(this, isCartOpen);
  private getCartItems = new StoreController(this, cartItems);

  constructor() {
    super();
    this.name = ""
    this.name3 = ""
  }

  connectedCallback(): void {
    super.connectedCallback()

    //this.getCartItems = (localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {})
    cartItems.set(localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {})
    //cartItems.set({})
  }

  renderCartItem(cartItem) {
    return html`
      <li class="listItem">
        <img src="${cartItem.imageSrc}" alt="${cartItem.name}" class="listItemImg" />
        <h3>${cartItem.name}</h3>
        <p>Quantity: ${cartItem.quantity}</p>
      </li>
      <p>Lit</p>
    `;
  }

  render() {
    return true
      ? html`
          <aside class="container">
            ${Object.values(this.getCartItems.value).length
          ? html`
                  <ul class="list">
                    ${Object.values(this.getCartItems.value).map((cartItem) =>
            this.renderCartItem(cartItem)
          )}
                  </ul>
                `
          : html`<p>Your cart is empty!</p>`
        }
          </aside>
        `
      : null;
  }

  static styles = css`
      .container {
        position: fixed;
        right: 0;
        top: var(--nav-height);
        height: 100vh;
        background: var(--color-bg-2);
        padding-inline: 2rem;
        min-width: min(90vw, 300px);
        border-left: 3px solid var(--color-bg-3);
      }

      .list {
        list-style: none;
        padding: 0;
      }

      .listItem {
        display: flex;
        gap: 1rem;
        align-items: center;
      }

      .listItem * {
        margin-block: 0.3rem;
      }

      .listItemImg {
        width: 4rem;
      }
    `;
}

customElements.define('cart-flyout', CartFlyoutLit);