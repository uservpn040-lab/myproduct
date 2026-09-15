/* =========================
   DROP WATCH STORE
========================= */


/* STORE SETTINGS */

const WHATSAPP_NUMBER = "918281454227";

/*
   IMPORTANT:
   Replace this with YOUR REAL UPI ID.

   Example:
   yourname@upi

   Do NOT use the WhatsApp number here.
*/
const UPI_ID = "YOUR_UPI_ID_HERE";


/* CURRENT PRODUCT */

let selectedProduct = "";
let selectedPrice = 1999;


/* WISHLIST */

let wishlist = [];


/* =========================
   PRODUCT IMAGE CHECK
========================= */

function hideProduct(image) {

    const card = image.closest(".product-card");

    if (card) {
        card.remove();
    }
}


/* =========================
   SCROLL
========================= */

function scrollToProducts() {

    showHome();

    setTimeout(() => {

        const products =
            document.getElementById("products");

        if (products) {
            products.scrollIntoView({
                behavior: "smooth"
            });
        }

    }, 100);
}


/* =========================
   PAGE NAVIGATION
========================= */

function hidePages() {

    document.querySelectorAll(".page")
        .forEach(page => {
            page.classList.remove("active");
        });

}


function updateNav(index) {

    document.querySelectorAll(".nav-item")
        .forEach(item => {
            item.classList.remove("active");
        });

    const items =
        document.querySelectorAll(".nav-item");

    if (items[index]) {
        items[index].classList.add("active");
    }
}


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


/* =========================
   WISHLIST
========================= */

function toggleWishlist(id, button) {

    if (wishlist.includes(id)) {

        wishlist =
            wishlist.filter(item => item !== id);

        button.classList.remove("liked");
        button.innerHTML = "♡";

        showToast("Removed from wishlist");

    } else {

        wishlist.push(id);

        button.classList.add("liked");
        button.innerHTML = "♥";

        showToast("Added to wishlist");

    }
}


function renderWishlist() {

    const container =
        document.getElementById("wishlistContent");

    if (wishlist.length === 0) {

        container.innerHTML = `
            <div>♡</div>
            <h2>Nothing saved yet</h2>
            <p>Tap the heart on a watch to save it.</p>
        `;

        return;
    }

    const names = {
        1: "Seiko 5 Sports Style",
        2: "Seiko Presage Style",
        3: "Seiko Diver Style"
    };

    container.innerHTML = `
        <div style="font-size:30px;">♥</div>

        <h2>
            ${wishlist.length} saved watch
            ${wishlist.length > 1 ? "es" : ""}
        </h2>

        <p>
            ${wishlist.map(id => names[id]).join(" • ")}
        </p>
    `;
}


/* =========================
   BUY MODAL
========================= */

function openBuy(productName, price) {

    selectedProduct = productName;
    selectedPrice = price;

    document.getElementById(
        "buyProductName"
    ).textContent = productName;

    document.getElementById(
        "buyPrice"
    ).textContent = `₹${price.toLocaleString("en-IN")}`;

    document
        .getElementById("buyModal")
        .classList.add("show");
}


function closeBuy() {

    document
        .getElementById("buyModal")
        .classList.remove("show");
}


/* =========================
   PAY NOW
========================= */

function payNow() {

    if (UPI_ID === "YOUR_UPI_ID_HERE") {

        showToast(
            "Add your UPI ID in script.js first"
        );

        return;
    }

    const upiURL =
        `upi://pay?pa=${encodeURIComponent(UPI_ID)}` +
        `&pn=${encodeURIComponent("DROP Store")}` +
        `&am=${selectedPrice}` +
        `&cu=INR` +
        `&tn=${encodeURIComponent(selectedProduct)}`;

    window.location.href = upiURL;

    closeBuy();

    setTimeout(() => {

        document
            .getElementById("paidModal")
            .classList.add("show");

    }, 1500);
}


/* =========================
   TALK TO STORE
========================= */

function talkToUs() {

    const message =
        `Dude I am planning to buy the ${selectedProduct} can I get a explanation`;

    const whatsappURL =
        `https://wa.me/${WHATSAPP_NUMBER}?text=` +
        encodeURIComponent(message);

    window.open(
        whatsappURL,
        "_blank"
    );

    closeBuy();
}


/* =========================
   PAID
========================= */

function closePaid() {

    document
        .getElementById("paidModal")
        .classList.remove("show");
}


function openPaidWhatsApp() {

    const message =
`Dude I have paid for the ${selectedProduct}.

Product: ${selectedProduct}
Amount: ₹${selectedPrice}

Delivery Address:
[Please send your address]

I will attach my payment screenshot here.`;

    const whatsappURL =
        `https://wa.me/${WHATSAPP_NUMBER}?text=` +
        encodeURIComponent(message);

    window.open(
        whatsappURL,
        "_blank"
    );

    closePaid();
}


/* =========================
   TOAST
========================= */

let toastTimer;

function showToast(message) {

    const toast =
        document.getElementById("toast");

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);
}


/* =========================
   CLOSE MODALS
========================= */

document.addEventListener(
    "click",
    function(event) {

        const buyModal =
            document.getElementById("buyModal");

        const paidModal =
            document.getElementById("paidModal");

        if (
            event.target === buyModal
        ) {
            closeBuy();
        }

        if (
            event.target === paidModal
        ) {
            closePaid();
        }

    }
);


/* =========================
   ESC KEY
========================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            closeBuy();
            closePaid();

        }

    }
);


/* =========================
   IMAGE CHECK
========================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        document
            .querySelectorAll(".product-image img")
            .forEach(img => {

                if (
                    img.complete &&
                    img.naturalWidth === 0
                ) {
                    hideProduct(img);
                }

            });

    }
);
