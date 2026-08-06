function formatCartPrice(price) {

    return "Rp" +
        price.toLocaleString("id-ID");

}

function getCart() {

    try {

        const savedCart =
            localStorage.getItem(
                "miora_cart"
            );

        return savedCart
            ? JSON.parse(savedCart)
            : [];

    } catch (error) {

        console.log(
            "Cart rusak, reset otomatis"
        );

        localStorage.removeItem(
            "miora_cart"
        );

        return [];

    }

}

function saveCartData(cart) {

    localStorage.setItem(
        "miora_cart",
        JSON.stringify(cart)
    );

}

function updateQty(index, change) {

    const cart = getCart();

    if (!cart[index]) return;

    cart[index].qty += change;

    if (cart[index].qty <= 0) {

        cart.splice(index, 1);

    }

    saveCartData(cart);

    renderCart();

    updateCartCounterUI();

}

function removeCartItem(index) {

    const cart = getCart();

    if (!cart[index]) return;

    cart.splice(index, 1);

    saveCartData(cart);

    renderCart();

    updateCartCounterUI();

}

function clearCart() {

    localStorage.removeItem(
        "miora_cart"
    );

    renderCart();

    updateCartCounterUI();

}

function updateCartCounterUI(){

    const cart =
        JSON.parse(
            localStorage.getItem(
                "miora_cart"
            )
        ) || [];

    const totalQty =
        cart.reduce(
            (sum,item)=>
                sum + item.qty,
            0
        );

    const counter =
        document.getElementById(
            "cart-counter"
        );

    if(counter){

        counter.textContent =
            totalQty;

    }

}

function renderCart() {

    const cartItems =
        document.getElementById(
            "cart-items"
        );

    const cartTotal =
        document.getElementById(
            "cart-total"
        );

    if (!cartItems || !cartTotal)
        return;

    const cart = getCart();

    if (cart.length === 0) {

        cartItems.innerHTML = `

            <p>
                Keranjang masih kosong
            </p>

        `;

        cartTotal.textContent =
            "Rp0";

        return;

    }

    let html = "";

    let total = 0;

    cart.forEach((item, index) => {

        const subtotal =
            item.price * item.qty;

        total += subtotal;

        html += `

            <div class="cart-item">

                <h4>
    ${item.name}
</h4>

                <p>
                    ${formatCartPrice(subtotal)}
                </p>

                <div class="cart-actions">

                    <button
                        class="qty-btn"
                        onclick="updateQty(${index}, -1)">
                        -
                    </button>

                    <span class="qty-value">
                        ${item.qty}
                    </span>

                    <button
                        class="qty-btn"
                        onclick="updateQty(${index}, 1)">
                        +
                    </button>

                    <button
                        class="delete-btn"
                        onclick="removeCartItem(${index})">
                        Hapus
                    </button>

                </div>

            </div>

        `;

    });

    cartItems.innerHTML =
        html;

    cartTotal.textContent =
        formatCartPrice(total);

}

window.addEventListener(
    "DOMContentLoaded",
    () => {

        renderCart();

        updateCartCounterUI();

        const clearBtn =
            document.getElementById(
                "clear-cart"
            );

        if (clearBtn) {

            clearBtn.addEventListener(
                "click",
                clearCart
            );

        }

    }
);
window.addEventListener(
    "load",
    () => {

        const floatingCart =
            document.getElementById(
                "floating-cart"
            );

        if(floatingCart){

            floatingCart.addEventListener(
                "click",
                () => {

                    document
                        .getElementById(
                            "order"
                        )
                        ?.scrollIntoView({

                            behavior:"smooth"

                        });

                }
            );

        }

    }
);