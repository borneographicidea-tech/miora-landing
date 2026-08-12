function checkoutToWhatsApp() {

    const cart =
        JSON.parse(
            localStorage.getItem(
                "miora_cart"
            )
        ) || [];

    if (cart.length === 0) {

        alert(
            "Keranjang masih kosong"
        );

        return;

    }

    const name =
        document.getElementById(
            "customer-name"
        ).value.trim();

    const phone =
        document.getElementById(
            "customer-phone"
        ).value.trim();

    const province =
        document.getElementById(
            "customer-province"
        ).value.trim();

    const city =
        document.getElementById(
            "customer-city"
        ).value.trim();

    const address =
        document.getElementById(
            "customer-address"
        ).value.trim();

    if (
        !name ||
        !phone ||
        !province ||
        !city ||
        !address
    ) {

        alert(
            "Lengkapi data pemesan terlebih dahulu"
        );

        return;

    }

    const cleanPhone =
        phone.replace(/\D/g, "");

    if (
        cleanPhone.length < 10 ||
        cleanPhone.length > 13
    ) {

        alert(
            "Nomor WhatsApp tidak valid"
        );

        return;

    }

    if (
        !cleanPhone.startsWith("08") &&
        !cleanPhone.startsWith("628")
    ) {

        alert(
            "Gunakan nomor WhatsApp Indonesia"
        );

        return;

    }

    let message =
`Halo Admin MIORA

Saya ingin memesan:

`;

    let total = 0;

    cart.forEach(item => {

        const subtotal =
            item.price * item.qty;

        total += subtotal;

        message +=
`${item.qty}x - Smart Pet Feeder ${item.variantName}
     Rp${subtotal.toLocaleString("id-ID")}

`;

    });

    message +=
`================================

Total Produk:
Rp${total.toLocaleString("id-ID")}

================================

Data Pengiriman

Nama:
${name}

No WhatsApp:
${phone}

Provinsi:
${province}

Kota:
${city}

Alamat:
${address}

Mohon info ongkirnya.
`;

    const whatsappURL =
`https://wa.me/6285754601987?text=${encodeURIComponent(message)}`;

if (typeof fbq !== "undefined") {

    fbq(
        'track',
        'Lead'
    );

}

window.open(
    whatsappURL,
    "_blank"
);

}

document
    .getElementById(
        "checkout-btn"
    )
    ?.addEventListener(
        "click",
        checkoutToWhatsApp
    );