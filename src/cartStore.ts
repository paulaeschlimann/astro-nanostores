import { atom, map } from 'nanostores';

export const isCartOpen = atom(true);

export type CartItem = {
	id: string;
	name: string;
	imageSrc: string;
	quantity: number;
};

export type CartItemDisplayInfo = Pick<CartItem, 'id' | 'name' | 'imageSrc'>;

export const cartItems = map<Record<string, CartItem>>({});

export function addCartItem({ id, name, imageSrc }: CartItemDisplayInfo) {
	const existingEntry = cartItems.get()[id];
	if (existingEntry) {
		cartItems.setKey(id, {
			...existingEntry,
			quantity: existingEntry.quantity + 1,
		});
	} else {
		cartItems.setKey(id, {
			id,
			name,
			imageSrc,
			quantity: 1,
		});
	}

	saveToLocalStorage(cartItems.get())
}

const saveToLocalStorage = (cartItems) => {
    localStorage.setItem('cart', JSON.stringify(cartItems))
}