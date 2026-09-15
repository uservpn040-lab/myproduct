/* =========================================================
   DROP STORE
========================================================= */


/* =========================================================
   STORE SETTINGS
========================================================= */

/*
   PUT YOUR REAL UPI ID HERE.

   Example:
   const UPI_ID = "yourname@upi";

   DO NOT put the WhatsApp number here.
*/

const UPI_ID = "YOUR_UPI_ID_HERE";


/*
   Your WhatsApp number.

   91 = India
*/

const WHATSAPP_NUMBER = "918281454227";


/* =========================================================
   CURRENT PRODUCT
========================================================= */

let selectedProduct = "";
let selectedPrice = 1999;


/* =========================================================
   WISHLIST
========================================================= */

let wishlist = [];


/* =========================================================
   OPENING ANIMATION
========================================================= */

window.addEventListener("load", function () {

    /*
       Opening animation stays for about 5 seconds.

       After that, it disappears automatically.
    */

    setTimeout(() => {

        const opening =
            document.getElementById("opening");

        if (opening) {

            opening.style.pointerEvents = "none";

        }

    }, 5000);

});


/* =========================================================
   IMAGE ERROR
========================================================= */

function imageError(image) {

    console.error(
        "Could not load image:",
        image.src
    );

    /*
       Instead of deleting the whole product,
       show a clean image error state.

       This makes it easier to see if the
       GitHub filename/path is wrong.
    */

    image.style.display = "none";

    const box =
        image.closest(".product-image");

    if (box) {

        const message =
            document.createElement("div");

        message.className = "image-error";

        message.innerHTML = `
            <div style="
                font-size:35px;
                margin-bottom:10px;
                opacity:.5;
            ">
                ⌚
            </div>

            <div style="
                font-size:10px;
                color:#777;
                letter-spacing:1px;
            ">
                IMAGE NOT FOUND
            </div>
        `;

        box.appendChild(message);

    }

}


/* =========================================================
   SCROLL TO PRODUCTS
========================================================= */

function scrollToProducts() {

    showHome();

    setTimeout(() => {

        const products =
            document.getElementById("products");

        if (products) {

            products.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    }, 100);

}


/* =========================================================
   PAGE SYSTEM
========================================================= */

function hidePages() {

    document
        .querySelectorAll(".page")
        .forEach(page => {

            page.classList.remove("active");

        });

}


function updateNav(index) {

    document
        .querySelectorAll(".nav-item")
        .forEach(item => {

            item.classList.remove("active");

        });

    const navItems =
        document.querySelectorAll(".nav-item");

    if (navItems[index]) {

        navItems[index]
            .classList.add("active");

    }

}


/* =========================================================
   HOME
========================================================= */

function showHome() {

    hidePages();

    document
        .getElementById("home")
        .classList.add("active");

    updateNav(0);

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   WISHLIST PAGE
========================================================= */

function showWishlist() {

    hidePages();

    document
        .getElementById("wishlist")
        .classList.add("active");

    updateNav(2);

    renderWishlist();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   CART PAGE
========================================================= */

function showCart() {

    hidePages();

    document
        .getElementById("cart")
        .classList.add("active");

    updateNav(3);

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   WISHLIST
========================================================= */

function toggleWishlist(id, button) {

    if (wishlist.includes(id)) {

        wishlist =
            wishlist.filter(item => item !== id);

        button.classList.remove("liked");

        button.innerHTML = "♡";

        showToast(
            "Removed from saved"
        );

    } else {

        wishlist.push(id);

        button.classList.add("liked");

        button.innerHTML = "♥";

        showToast(
            "Added to saved"
        );

    }

}


/* =========================================================
   RENDER WISHLIST
========================================================= */

function renderWishlist() {

    const container =
        document.getElementById(
            "wishlistContent"
        );


    if (wishlist.length === 0) {

        container.innerHTML = `

            <div class="empty-icon">
                ♡
            </div>

            <h2>
                Nothing saved
            </h2>

            <p>
                Tap the heart on a watch to save it.
            </p>

        `;

        return;

    }


    const products = {

        1: "Seiko 5 Sports Style",

        2: "Seiko Presage Style",

        3: "Seiko Diver Style"

    };


    container.innerHTML = `

        <div class="empty-icon">
            ♥
        </div>

        <h2>
            ${wishlist.length}
            saved
        </h2>

        <p>
            ${wishlist
                .map(id => products[id])
                .join(" • ")
            }
        </p>

    `;

}


/* =========================================================
   BUY MODAL
========================================================= */

function openBuy(productName, price) {

    selectedProduct =
        productName;

    selectedPrice =
        price;


    document.getElementById(
        "buyProductName"
    ).textContent =
        productName;


    document.getElementById(
        "buyPrice"
    ).textContent =
        `₹${price.toLocaleString("en-IN")}`;


    document
        .getElementById("buyModal")
        .classList.add("show");

}


/* =========================================================
   CLOSE BUY
========================================================= */

function closeBuy() {

    document
        .getElementById("buyModal")
        .classList.remove("show");

}


/* =========================================================
   PAY NOW
========================================================= */

function payNow() {

    /*
       Make sure the customer has entered
       a real UPI ID.
    */

    if (
        UPI_ID ===
        "YOUR_UPI_ID_HERE"
    ) {

        showToast(
            "Add your UPI ID in script.js"
        );

        return;

    }


    const upiURL =
        `upi://pay` +
        `?pa=${encodeURIComponent(UPI_ID)}` +
        `&pn=${encodeURIComponent("DROP Store")}` +
        `&am=${selectedPrice}` +
        `&cu=INR` +
        `&tn=${encodeURIComponent(
            selectedProduct
        )}`;


    /*
       Open the customer's UPI app.
    */

    window.location.href =
        upiURL;


    closeBuy();


    /*
       Show confirmation screen after
       giving the UPI app time to open.
    */

    setTimeout(() => {

        document
            .getElementById("paidModal")
            .classList.add("show");

    }, 1800);

}


/* =========================================================
   TALK TO US
========================================================= */

function talkToUs() {

    const message =
        `Dude I am planning to buy the ${selectedProduct} can I get a explanation`;


    const whatsappURL =
        `https://wa.me/${WHATSAPP_NUMBER}` +
        `?text=${encodeURIComponent(message)}`;


    window.open(
        whatsappURL,
        "_blank"
    );


    closeBuy();

}


/* =========================================================
   CLOSE PAID MODAL
========================================================= */

function closePaid() {

    document
        .getElementById("paidModal")
        .classList.remove("show");

}


/* =========================================================
   OPEN PAID WHATSAPP
========================================================= */

function openPaidWhatsApp() {

    const message =
`Dude I have paid for the ${selectedProduct}.

Product: ${selectedProduct}
Amount: ₹${selectedPrice}

Delivery Address:
[Please send your address]

I will attach my payment screenshot here.`;


    const whatsappURL =
        `https://wa.me/${WHATSAPP_NUMBER}` +
        `?text=${encodeURIComponent(message)}`;


    window.open(
        whatsappURL,
        "_blank"
    );


    closePaid();

}


/* =========================================================
   TOAST
========================================================= */

let toastTimer;


function showToast(message) {

    const toast =
        document.getElementById("toast");


    toast.textContent =
        message;


    toast.classList.add("show");


    clearTimeout(
        toastTimer
    );


    toastTimer =
        setTimeout(() => {

            toast.classList.remove(
                "show"
            );

        }, 2500);

}


/* =========================================================
   CLOSE MODALS WHEN CLICKING OUTSIDE
========================================================= */

document.addEventListener(
    "click",
    function(event) {

        const buyModal =
            document.getElementById(
                "buyModal"
            );

        const paidModal =
            document.getElementById(
                "paidModal"
            );


        if (
            event.target ===
            buyModal
        ) {

            closeBuy();

        }


        if (
            event.target ===
            paidModal
        ) {

            closePaid();

        }

    }
);


/* =========================================================
   ESC KEY
========================================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Escape"
        ) {

            closeBuy();

            closePaid();

        }

    }
);


/* =========================================================
   IMAGE DEBUGGING
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        const images =
            document.querySelectorAll(
                ".product-image img"
            );


        images.forEach(image => {

            /*
               If image was already cached and
               failed, manually trigger error.
            */

            if (
                image.complete &&
                image.naturalWidth === 0
            ) {

                imageError(image);

            }

        });

    }
);
