const variantCards = document.querySelectorAll(".variant-card");

const variantName = document.getElementById("variant-name");
const productPrice = document.getElementById("product-price");
const productBadge = document.getElementById("product-badge");
const featureList = document.getElementById("feature-list");
const subtotal = document.getElementById("subtotal");

const addToCartBtn =
    document.getElementById("add-to-cart");

let productData = null;
let currentVariant = null;



function formatPrice(price) {

    return "Rp" +
        price.toLocaleString("id-ID");

}

function updateCartCounter() {

    const cartCount =
        document.getElementById("cart-count");

    if (!cartCount) return;

    const cart =
    JSON.parse(
        localStorage.getItem(
            "miora_cart"
        )
    ) || [];

const totalQty =
    cart.reduce(
        (sum, item) =>
            sum + item.qty,
        0
    );

    cartCount.textContent =
        totalQty;

}

function renderVariant(variant) {

    currentVariant = variant;

    variantName.textContent =
        variant.name;

    productPrice.textContent =
        formatPrice(variant.price);

    subtotal.textContent =
        formatPrice(variant.price);

    productBadge.textContent =
        variant.badge;

    featureList.innerHTML = "";

    variant.features.forEach(feature => {

        const li =
            document.createElement("li");

        li.textContent =
            feature;

        featureList.appendChild(li);

    });

}

function addToCart() {

    if (!currentVariant) return;

    let cart = JSON.parse(
        localStorage.getItem("miora_cart")
    ) || [];

    const existingItem =
        cart.find(
            item =>
                item.variantId ===
                currentVariant.id
        );

    if (existingItem) {

        existingItem.qty += 1;

    } else {

        cart.push({

            productId:
                productData.id,

            variantId:
                currentVariant.id,

            variantName:
                currentVariant.name,

            price:
                currentVariant.price,

            qty: 1

        });

    }

    localStorage.setItem(
        "miora_cart",
        JSON.stringify(cart)
    );

    updateCartCounter();

    if (
        typeof renderCart ===
        "function"
    ) {

        renderCart();

    }

    console.log(cart);

}

async function loadProducts() {

    const response =
        await fetch(
            "./data/products.json"
        );

    const products =
        await response.json();

    productData =
        products[0];

    renderVariant(
        productData.variants[0]
    );

}

variantCards.forEach(card => {

    card.addEventListener("click", () => {
        console.log("KLIK TERDETEKSI");

        variantCards.forEach(item => {

            item.classList.remove(
                "active"
            );

        });

        card.classList.add("active");

        const variantId =
            Number(
                card.dataset.variantId
            );
            console.log("Variant ID:", variantId);

        const selectedVariant =
            productData.variants.find(
                item =>
                    item.id ===
                    variantId
            );
            console.log(
    "Selected:",
    selectedVariant
);

        renderVariant(
            selectedVariant
        );

    });

});

if (addToCartBtn) {

    addToCartBtn.addEventListener(
        "click",
        addToCart
    );

}

updateCartCounter();

loadProducts();
window.addEventListener(
    "load",
    () => {

        updateCartCounter();

    }
);