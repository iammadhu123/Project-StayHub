document.addEventListener("DOMContentLoaded", () => {

    const desktopSwitch = document.getElementById("flexSwitchCheckDefault");
    const mobileSwitch = document.getElementById("mobileTaxSwitch");
    const taxBox = document.querySelector(".tax-toggle");

    function updatePrices(isChecked) {
        const allPrices = document.querySelectorAll(".listing-price");
        const allTaxInfo = document.querySelectorAll(".tax-info");

        allPrices.forEach(priceEl => {
            const basePrice = Number(priceEl.dataset.price);

            if (isChecked) {
                const totalPrice = Math.round(basePrice * 1.18);
                priceEl.innerHTML = `&#8377; ${totalPrice.toLocaleString("en-IN")}`;
            } else {
                priceEl.innerHTML = `&#8377; ${basePrice.toLocaleString("en-IN")}`;
            }
        });

        allTaxInfo.forEach(info => {
            info.style.display = isChecked ? "inline" : "none";
        });

        if (taxBox) {
            taxBox.classList.toggle("active", isChecked);
        }
    }

    // Desktop toggle
    if (desktopSwitch) {
        desktopSwitch.addEventListener("change", () => {
            updatePrices(desktopSwitch.checked);

            // sync mobile
            if (mobileSwitch) mobileSwitch.checked = desktopSwitch.checked;
        });
    }

    // Mobile toggle
    if (mobileSwitch) {
        mobileSwitch.addEventListener("change", () => {
            updatePrices(mobileSwitch.checked);

            // sync desktop
            if (desktopSwitch) desktopSwitch.checked = mobileSwitch.checked;
        });
    }

});