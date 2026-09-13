/* =========================================
   DROP STORE JAVASCRIPT
========================================= */


/* =========================================
   STORE SETTINGS
========================================= */

// IMPORTANT:
// Replace this with your REAL UPI ID.
//
// Example:
// yourname@oksbi
// yourshop@paytm
// yourstore@ybl

const UPI_ID = "YOUR_UPI_ID_HERE";


// WhatsApp number
const WHATSAPP_NUMBER = "918281454227";


/* =========================================
   CURRENT PRODUCT
========================================= */

let currentProduct = "";
let currentPrice = 0;


/* =========================================
   BUY POPUP
========================================= */

function openBuy(productName, price) {

    currentProduct = productName;

    currentPrice = Number(price);

    document.getElementById("modalProduct").textContent =
        productName;

    document.getElementById("modalPrice").textContent =
        "₹" + currentPrice.toLocaleString("en-IN");

    document
        .getElementById("buyModal")
        .classList
        .add("open");

    playSound("open");
}


function closeBuy() {

    document
        .getElementById("buyModal")
        .classList
        .remove("open");

    playSound("close");
}


/* =========================================
   UPI PAYMENT
========================================= */

function payNow() {

    if (
        !UPI_ID ||
        UPI_ID === "YOUR_UPI_ID_HERE"
    ) {

        showToast(
            "Add your real UPI ID inside script.js first."
        );

        return;
    }


    const upiURL =
        "upi://pay" +

        "?pa=" +
        encodeURIComponent(UPI_ID) +

        "&pn=" +
        encodeURIComponent("DROP STORE") +

        "&am=" +
        encodeURIComponent(
            currentPrice.toFixed(2)
        ) +

        "&cu=INR" +

        "&tn=" +
        encodeURIComponent(
            "Order - " + currentProduct
        );


    playSound("pay");


    // Open UPI app
    window.location.href = upiURL;
}


/* =========================================
   AFTER PAYMENT → WHATSAPP
========================================= */

function openPaidWhatsApp() {

    const message =

        "Dude 👋 I have paid for my order.\n\n" +

        "🛍️ Product: " +
        currentProduct +
        "\n\n" +

        "💰 Amount: ₹" +
        currentPrice.toLocaleString("en-IN") +
        "\n\n" +

        "📍 My delivery address:\n" +

        "[Please type your full address here]" +

        "\n\n" +

        "📸 I have attached my payment screenshot." +

        "\n\n" +

        "Please confirm my order.";


    const whatsappURL =

        "https://wa.me/" +
        WHATSAPP_NUMBER +
        "?text=" +
        encodeURIComponent(message);


    playSound("message");


    window.open(
        whatsappURL,
        "_blank"
    );
}


/* =========================================
   TALK TO US
========================================= */

function talkToUs() {

    const message =

        "Dude 👋 I am planning to buy the " +

        currentProduct +

        ". Can I get an explanation?";


    const whatsappURL =

        "https://wa.me/" +
        WHATSAPP_NUMBER +
        "?text=" +
        encodeURIComponent(message);


    playSound("message");


    window.open(
        whatsappURL,
        "_blank"
    );
}


/* =========================================
   CATEGORY FILTER
========================================= */

function filterCategory(
    category,
    button
) {

    const products =
        document.querySelectorAll(".product");

    const buttons =
        document.querySelectorAll(".category");


    buttons.forEach(btn => {

        btn.classList.remove("active");

    });


    button.classList.add("active");


    let visible = 0;


    products.forEach(product => {

        const productCategory =
            product.dataset.category;


        if (
            category === "all" ||
            productCategory === category
        ) {

            product.style.display = "";

            visible++;

        } else {

            product.style.display = "none";

        }

    });


    updateProductCount(visible);

    scrollToProducts();
}


/* =========================================
   PRODUCT COUNT
========================================= */

function updateProductCount(count) {

    document.getElementById(
        "productCount"
    ).textContent =

        count +
        " PRODUCTS";

}


function countVisibleProducts() {

    const products =
        document.querySelectorAll(".product");

    let count = 0;


    products.forEach(product => {

        if (
            product.style.display !== "none"
        ) {

            count++;

        }

    });


    updateProductCount(count);
}


/* =========================================
   SEARCH
========================================= */

function searchProducts() {

    const input =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase()
            .trim();


    const products =
        document.querySelectorAll(".product");


    let visible = 0;


    products.forEach(product => {

        const name =
            product.dataset.name
                .toLowerCase();


        if (
            name.includes(input)
        ) {

            product.style.display = "";

            visible++;

        } else {

            product.style.display = "none";

        }

    });


    updateProductCount(visible);

}


/* =========================================
   WISHLIST
========================================= */

let wishlist = [];


function toggleWishlist(
    button,
    productName,
    price
) {

    button.classList.toggle("liked");


    if (
        button.classList.contains("liked")
    ) {

        wishlist.push({
            name: productName,
            price: price
        });

        button.textContent = "♥";

        showToast(
            "Added to wishlist ♥"
        );

    } else {

        wishlist =
            wishlist.filter(
                item =>
                    item.name !== productName
            );

        button.textContent = "♡";

        showToast(
            "Removed from wishlist"
        );

    }

}


/* =========================================
   HOME
========================================= */

function showHome() {

    const products =
        document.querySelectorAll(".product");


    products.forEach(product => {

        product.style.display = "";

    });


    updateProductCount(
        products.length
    );


    document
        .getElementById("productsSection")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =========================================
   CATEGORY
========================================= */

function showCategories() {

    document
        .querySelector(".categories")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =========================================
   WISHLIST
========================================= */

function showWishlist() {

    if (wishlist.length === 0) {

        showToast(
            "Your wishlist is empty ♡"
        );

        return;
    }


    const products =
        document.querySelectorAll(".product");


    products.forEach(product => {

        const name =
            product.dataset.name;


        const found =
            wishlist.some(
                item =>
                    item.name
                    .toLowerCase()
                    === name.toLowerCase()
            );


        product.style.display =
            found ? "" : "none";

    });


    updateProductCount(
        wishlist.length
    );


    document
        .getElementById("productsSection")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =========================================
   CART
========================================= */

function showCart() {

    showToast(
        "Cart system coming next 🛒"
    );

}


/* =========================================
   NAVIGATION LIQUID DROP
========================================= */

function navMove(button) {

    const nav =
        document.querySelector(
            ".bottom-nav"
        );

    const drop =
        document.getElementById(
            "navDrop"
        );


    const navRect =
        nav.getBoundingClientRect();


    const buttonRect =
        button.getBoundingClientRect();


    const center =
        buttonRect.left +
        buttonRect.width / 2 -
        navRect.left;


    drop.style.left =
        (center - 35) + "px";


    document
        .querySelectorAll(".nav-item")
        .forEach(item => {

            item.classList.remove(
                "active"
            );

        });


    button.classList.add("active");


    playSound("nav");

}


/* =========================================
   SCROLL
========================================= */

function scrollToProducts() {

    document
        .getElementById("productsSection")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =========================================
   TOAST
========================================= */

let toastTimer;


function showToast(message) {

    const toast =
        document.getElementById("toast");


    toast.textContent = message;

    toast.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 2200);

}


/* =========================================
   SOUND SYSTEM
========================================= */

let audioContext;


function getAudioContext() {

    if (!audioContext) {

        audioContext =
            new (
                window.AudioContext ||
                window.webkitAudioContext
            )();

    }


    return audioContext;

}


function playSound(type) {

    try {

        const ctx =
            getAudioContext();


        const oscillator =
            ctx.createOscillator();


        const gain =
            ctx.createGain();


        oscillator.connect(gain);

        gain.connect(
            ctx.destination
        );


        let frequency = 300;


        if (type === "open")
            frequency = 420;

        if (type === "close")
            frequency = 220;

        if (type === "pay")
            frequency = 600;

        if (type === "message")
            frequency = 500;

        if (type === "nav")
            frequency = 350;


        oscillator.frequency.value =
            frequency;


        oscillator.type = "sine";


        gain.gain.setValueAtTime(
            0.0001,
            ctx.currentTime
        );


        gain.gain.exponentialRampToValueAtTime(
            0.08,
            ctx.currentTime + 0.01
        );


        gain.gain.exponentialRampToValueAtTime(
            0.0001,
            ctx.currentTime + 0.15
        );


        oscillator.start();


        oscillator.stop(
            ctx.currentTime + 0.16
        );

    } catch (error) {

        console.log(
            "Sound unavailable"
        );

    }

}


/* =========================================
   ESC KEY
========================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Escape"
        ) {

            closeBuy();

        }

    }
);


/* =========================================
   CLOSE MODAL WHEN CLICKING OUTSIDE
========================================= */

document
    .getElementById("buyModal")
    .addEventListener(
        "click",
        function(event) {

            if (
                event.target === this
            ) {

                closeBuy();

            }

        }
    );


/* =========================================
   INITIALIZE
========================================= */

window.addEventListener(
    "load",
    function() {

        const products =
            document.querySelectorAll(
                ".product"
            );


        updateProductCount(
            products.length
        );


        // Position liquid nav bubble
        const active =
            document.querySelector(
                ".nav-item.active"
            );


        if (active) {

            setTimeout(
                () => navMove(active),
                200
            );

        }

    }
);