class PopupController {
    constructor() {
        this.popupEl = document.getElementById("popup");
        this.closeButton = document.getElementById("close-popup-button");
        this.popupProductId = document.getElementById("popup-product-id");
        this.popupProductText = document.getElementById("popup-product-text");

        this.init();
    }

    init() {
        this.closeButton.addEventListener("click", () => this.closePopup());
    }

    closePopup() {
        this.popupEl.style.display = "none";
    }

    openPopup() {
        this.popupEl.style.display = "block";
    }

    addProductDataToPopup(product) {
        this.popupProductId.innerText = product.id;
        this.popupProductText.innerText = product.text;
    }
}

export const popupController = new PopupController();


