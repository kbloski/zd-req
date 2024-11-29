import { popupController } from "./popupControll.js";

class ProductListController {
    constructor() {
        this.productList = document.getElementById("product-list");
        this.selectElementPageSize =
            document.getElementById("page-product-size");
        this.downloadedProducts = [];

        this.lastPageNumber = 0;
        this.pageNumber = 1;
        this.pageSize = this.selectElementPageSize.value;

        this.loading = false;

        this.init();
    }

    init() {
        this.loadProducts();
        this.selectElementPageSize.addEventListener("input", (event) => {
            this.pageSize = event.target.value;
            this.resetProductList();
        });
    }

    resetProductList() {
        this.pageNumber = 1;
        this.lastPageNumber = 0;
        this.productList.innerHTML = "";
    }

    loadProducts() {
        if (this.loading) return;
        if (this.lastPageNumber >= this.pageNumber) return;

        this.loading = true;
        fetch(
            `https://brandstestowy.smallhost.pl/api/random?pageNumber=${this.pageNumber}&pageSize=${this.pageSize}`
        )
            .then((res) => {
                if (!res.ok) throw new Error(res.statusText);
                return res.json();
            })
            .then((data) => {
                this.lastPageNumber = this.pageNumber;

                if (data.currentPage < data.totalPages) this.pageNumber += 1;
                const products = data.data;
                this.downloadedProducts.push(...products);

                products.forEach((product) => this.addProductToList(product));
            })
            .catch((error) => {
                console.error("Error loading products:", error);
            })
            .finally(() => {
                this.loading = false;
            });
    }

    addProductToList(product) {
        const liEl = document.createElement("li");
        liEl.innerText = `ID:` + product.id;
        liEl["data-id"] = product.id;
        this.productList.appendChild(liEl);

        liEl.addEventListener("click", () => {
            const findedProduct = this.findProductById(product.id);
            popupController.addProductDataToPopup(findedProduct);
            popupController.openPopup();
        });
    }

    findProductById(id) {
        return this.downloadedProducts.filter(
            (product) => product.id === id
        )[0];
    }
}

const productListController = new ProductListController();

window.addEventListener("scroll", () => {
    if (isScrollNearBottom()) {
        productListController.loadProducts();
    }
});

function isScrollNearBottom() {
    const currentScrollPos = window.scrollY + window.innerHeight;
    const bodyHeight = document.body.scrollHeight;
    return currentScrollPos >= bodyHeight - 100;
}

