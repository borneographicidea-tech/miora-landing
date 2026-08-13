const floatingCart =
document.getElementById(
    "floating-cart"
);

if (floatingCart) {

    floatingCart.addEventListener(
        "click",
        () => {

            document
            .getElementById("order-form")
            .scrollIntoView({

                behavior:"smooth"

            });

        }
    );

}