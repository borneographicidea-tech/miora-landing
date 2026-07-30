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

function updateCartCounterUI() {

    const counter =
        document.getElementById(
            "cart-count"
        );

    if (!counter) return;

    const cart = getCart();

    const totalQty =
        cart.reduce(
            (sum, item) =>
                sum + item.qty,
            0
        );

    counter.textContent =
        totalQty;

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

    if (!cartItems) return;

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
            ${item.variantName}
        </h4>

        <p>
            Qty : ${item.qty}
        </p>

        <p>
            ${formatCartPrice(subtotal)}
        </p>

        <div class="cart-actions">

            <button onclick="updateQty(${index}, -1)">
                -
            </button>

            <button onclick="updateQty(${index}, 1)">
                +
            </button>

            <button onclick="removeCartItem(${index})">
                Hapus
            </button>

        </div>

    </div>

    <hr>

`;

    });

    cartItems.innerHTML =
        html;

    cartTotal.textContent =
        formatCartPrice(total);

}

document
    .getElementById(
        "clear-cart"
    )
    ?.addEventListener(
        "click",
        clearCart
    );

window.addEventListener(
    "load",
    () => {

        renderCart();

        updateCartCounterUI();

    }
);