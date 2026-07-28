const variantCards = document.querySelectorAll(".variant-card");

variantCards.forEach(card => {

    card.addEventListener("click", () => {

        variantCards.forEach(item => {
            item.classList.remove("active");
        });

        card.classList.add("active");

    });

});