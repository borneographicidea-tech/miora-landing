const productList =
    document.getElementById("product-list");

function formatPrice(price) {

    return "Rp" +
        price.toLocaleString("id-ID");

}

async function loadProducts() {

    const response =
        await fetch(
            "./data/products.json"
        );

    const products =
        await response.json();

    renderProducts(products);

}

function renderProducts(products) {

    productList.innerHTML = "";

    products.forEach(product => {

        const card =
            document.createElement("div");

        card.className =
            "catalog-card";

        card.innerHTML = `

    <div class="catalog-image">

        <img
            src="${product.image}"
            alt="${product.name}">

    </div>

    <div class="catalog-info">

        <span class="badge">
            ${product.badge}
        </span>

        <h3>
            ${product.name}
        </h3>

        <h2>
            ${formatPrice(product.price)}
        </h2>

        <p class="product-series">
            ${product.series || ""}
        </p>

        <p class="product-description">
            ${product.shortDescription || ""}
        </p>

        

        <div class="product-actions">

    <button
        class="btn-secondary view-detail"
        data-id="${product.id}">

        Lihat Detail

    </button>

    <button
        class="btn-primary add-cart"
        data-id="${product.id}">

        Tambah ke Keranjang

    </button>

</div>

    </div>

`;

        productList.appendChild(card);

    });

    document
        .querySelectorAll(".add-cart")
        .forEach(button => {
    document
.querySelectorAll(".view-detail")
.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const productId =
                Number(
                    button.dataset.id
                );

            const product =
                products.find(
                    item =>
                        item.id ===
                        productId
                );

            const modal =
                document.getElementById(
                    "product-modal"
                );

            const modalBody =
                document.getElementById(
                    "modal-body"
                );

            modalBody.innerHTML = `

    <h2>
        ${product.name}
    </h2>

    <p class="modal-price">
    ${formatPrice(product.price)}
</p>

    <p>
        ${product.shortDescription || ""}
    </p>

    <h4>
        Fitur Utama
    </h4>

    <ul>

        ${(product.features || [])
            .map(
                feature =>
                    `<li>${feature}</li>`
            )
            .join("")}

    </ul>
<h4>
    Spesifikasi
</h4>

<ul>

    ${(product.specifications || [])
        .map(
            spec =>
                `<li>${spec}</li>`
        )
        .join("")}

</ul>
<h4>
    Foto Produk
</h4>

<div class="gallery-grid">

    ${(product.productGallery || [])
        .map(
            image =>
                `<img src="${image}" alt="">`
        )
        .join("")}

</div>
<h4>
    Fitur Produk
</h4>

<div class="gallery-grid">

    ${(product.featureGallery || [])
        .map(
            image =>
                `<img src="${image}" alt="">`
        )
        .join("")}

</div>
<h4>
    Lifestyle
</h4>

<div class="gallery-grid">

    ${(product.lifestyleGallery || [])
        .map(
            image =>
                `<img src="${image}" alt="">`
        )
        .join("")}

</div>
`;

            modal.style.display =
    "block";

document.body.style.overflow =
    "hidden";
console.log("MODAL OPEN");

        }
    );

});

document
.getElementById("modal-close")
.addEventListener(
    "click",
    () => {

        document.getElementById(
"product-modal"
).style.display =
"none";

document.body.style.overflow =
"";

    }
);
            button.addEventListener(
                "click",
                () => {

                    const productId =
                        Number(
                            button.dataset.id
                        );

                    const product =
                        products.find(
                            item =>
                                item.id ===
                                productId
                        );

                    let cart =
                        JSON.parse(
                            localStorage.getItem(
                                "miora_cart"
                            )
                        ) || [];

                    const existing =
                        cart.find(
                            item =>
                                item.id ===
                                productId
                        );

                    if (existing) {

                        existing.qty++;

                    } else {

                        cart.push({

                            id:
                                product.id,

                            name:
                                product.name,

                            price:
                                product.price,

                            qty: 1

                        });

                    }

                    localStorage.setItem(
                        "miora_cart",
                        JSON.stringify(cart)
                    );

                    console.log(
                        "Produk masuk keranjang"
                    );

                    if (
                        typeof updateCartCounterUI ===
                        "function"
                    ) {

                        updateCartCounterUI();

                    }

                    if (
                        typeof renderCart ===
                        "function"
                    ) {

                        renderCart();

                    }

                }
            );

        });

}

loadProducts();