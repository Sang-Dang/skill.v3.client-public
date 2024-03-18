// add product to cart
export function addToCart(product: any) {
    if (typeof window !== "undefined") {
        if (product.id !== undefined) {
            let cart = JSON.parse(localStorage.getItem('cart') || '[]');
            if (cart) {
                const index = cart.findIndex((item: any) => item.id === product.id);
                if (index !== -1) {
                    if (cart[index].quantity < 5) {
                        cart[index].quantity += 1;
                    } else {
                        alert('You can only add up to 5 products');
                    }
                } else {
                    cart.push({ ...product, quantity: 1 });
                }
            } else {
                cart = [{ ...product, quantity: 1 }];
            }
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }
}

// reduce product from cart
export function reductFromCart(id: string) {
    if (typeof window !== "undefined") {
        if (id) {
            let cart = JSON.parse(localStorage.getItem('cart') || '[]');
            if (cart) {
                const index = cart.findIndex((item: any) => item.id === id);
                if (index !== -1) {
                    cart[index].quantity -= 1;
                    if (cart[index].quantity === 0) {
                        if (window.confirm('Do you want to remove the product from the cart?')) {
                            cart.splice(index, 1);
                        } else {
                            cart[index].quantity = 1;
                        }
                    }
                }
            }
            if (cart.length === 0) {
                localStorage.removeItem('cart');
            } else {
                localStorage.setItem('cart', JSON.stringify(cart));
            }
        }
    }
}

// remove complete product from cart
export function removeFromCart(id: string) {
    if (typeof window !== "undefined") {
        if (id) {
            let cart = JSON.parse(localStorage.getItem('cart') || '[]');
            if (cart) {
                const index = cart.findIndex((item: any) => item.id === id);
                if (index !== -1) {
                    cart.splice(index, 1);
                }
            }
            if (cart.length === 0) {
                localStorage.removeItem('cart');
            } else {
                localStorage.setItem('cart', JSON.stringify(cart));
            }
        }
    }
}

export function getCart(): any[] {
    if (typeof window !== "undefined") {
        return JSON.parse(localStorage.getItem('cart') || '[]');
    }
    return [];
}