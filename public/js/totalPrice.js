document.addEventListener("DOMContentLoaded", () => {
    const taxSwitch = document.getElementById("flexSwitchCheckDefault");
    const taxBox = document.querySelector(".tax-toggle");

    if (taxSwitch) {
        taxSwitch.addEventListener("change", () => {
            const allPrices = document.querySelectorAll(".listing-price");
            const allTaxInfo = document.querySelectorAll(".tax-info");

            allPrices.forEach(priceEl => {
                const basePrice = Number(priceEl.dataset.price);

                if (taxSwitch.checked) {
                    const totalPrice = Math.round(basePrice * 1.18);
                    priceEl.innerHTML = `&#8377; ${totalPrice.toLocaleString("en-IN")}`;
                } else {
                    priceEl.innerHTML = `&#8377; ${basePrice.toLocaleString("en-IN")}`;
                }
            });

            allTaxInfo.forEach(info => {
                info.style.display = taxSwitch.checked ? "inline" : "none";
            });

            taxBox.classList.toggle("active", taxSwitch.checked);
        });
    }
});