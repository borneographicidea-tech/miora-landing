const lightbox =
    document.getElementById(
        "lightbox"
    );

const lightboxImage =
    document.getElementById(
        "lightbox-image"
    );

const closeButton =
    document.getElementById(
        "lightbox-close"
    );

const prevButton =
    document.getElementById(
        "lightbox-prev"
    );

const nextButton =
    document.getElementById(
        "lightbox-next"
    );

const lightboxCounter =
    document.getElementById(
        "lightbox-counter"
    );

let galleryImages = [];

let currentIndex = 0;

function updateCounter() {

    if (
        lightboxCounter
    ) {

        lightboxCounter.textContent =
            `${currentIndex + 1} / ${galleryImages.length}`;

    }

}

document.addEventListener(
    "click",
    event => {

        if (

            event.target.tagName ===
            "IMG"

            &&

            event.target.closest(
                ".gallery-grid"
            )

        ) {

            const currentGallery =
    event.target.closest(
        ".gallery-grid"
    );

galleryImages =
    Array.from(
        currentGallery.querySelectorAll(
            "img"
        )
    );

            currentIndex =
                galleryImages.indexOf(
                    event.target
                );

            lightboxImage.src =
                galleryImages[
                    currentIndex
                ].src;

            lightbox.classList.add(
                "active"
            );

            updateCounter();

        }

    }
);

closeButton.addEventListener(
    "click",
    () => {

        lightbox.classList.remove(
            "active"
        );

    }
);

lightbox.addEventListener(
    "click",
    event => {

        if (

            event.target ===
            lightbox

        ) {

            lightbox.classList.remove(
                "active"
            );

        }

    }
);

prevButton.addEventListener(
    "click",
    event => {

        event.stopPropagation();

        currentIndex--;

        if (

            currentIndex < 0

        ) {

            currentIndex =
                galleryImages.length - 1;

        }

        lightboxImage.src =
            galleryImages[
                currentIndex
            ].src;

        updateCounter();

    }
);

nextButton.addEventListener(
    "click",
    event => {

        event.stopPropagation();

        currentIndex++;

        if (

            currentIndex >=
            galleryImages.length

        ) {

            currentIndex = 0;

        }

        lightboxImage.src =
            galleryImages[
                currentIndex
            ].src;

        updateCounter();

    }
);

let touchStartX = 0;

let touchEndX = 0;

lightboxImage.addEventListener(
    "touchstart",
    event => {

        touchStartX =
            event.changedTouches[0]
                .screenX;

    },
    { passive: true }
);

lightboxImage.addEventListener(
    "touchend",
    event => {

        touchEndX =
            event.changedTouches[0]
                .screenX;

        handleSwipe();

    },
    { passive: true }
);

function handleSwipe() {

    const swipeDistance =
        touchEndX -
        touchStartX;

    if (

        swipeDistance < -50

    ) {

        currentIndex++;

        if (

            currentIndex >=
            galleryImages.length

        ) {

            currentIndex = 0;

        }

        lightboxImage.src =
            galleryImages[
                currentIndex
            ].src;

        updateCounter();

    }

    if (

        swipeDistance > 50

    ) {

        currentIndex--;

        if (

            currentIndex < 0

        ) {

            currentIndex =
                galleryImages.length - 1;

        }

        lightboxImage.src =
            galleryImages[
                currentIndex
            ].src;

        updateCounter();

    }

}