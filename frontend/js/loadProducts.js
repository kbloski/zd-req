const productList = document.getElementById("product-list");
const selectElementPageSize = document.getElementById("page-product-size");

let lastPageNumber = 0;
let pageNumber = 1;
let pageSize = selectElementPageSize.value; 

selectElementPageSize.addEventListener("input", (event) => {
    pageSize = event.target.value;
    pageNumber = 1; //
    lastPageNumber = 0;
    productList.innerHTML = ""; 
    loadProducts(pageNumber, pageSize);
});

let loading = false; 
loadProducts(pageNumber, pageSize);

window.addEventListener("scroll", () => {
    if (isScrollNearBottom()) {
        loadProducts(pageNumber, pageSize);
    }
});

function isScrollNearBottom() {
    const currentScrollPos = window.scrollY + window.innerHeight;
    const bodyHeight = document.body.scrollHeight;
    return currentScrollPos >= bodyHeight - 100; 
}

function loadProducts(page_number, page_size) {
    console.log("loading:", loading);
    if (loading) return; 
    if (lastPageNumber >= page_number) return;

    loading = true; 
    fetch(
        `https://brandstestowy.smallhost.pl/api/random?pageNumber=${page_number}&pageSize=${page_size}`
    )
        .then((res) => {
            if (!res.ok) throw new Error(res.statusText);
            return res.json();
        })
        .then((data) => {
            lastPageNumber = pageNumber;
            
            console.log( data.currentPage)
            if (data.currentPage < data.totalPages) pageNumber += 1; 

            const products = data.data;
            products.forEach((product) => addProductToList(product)); 
        })
        .catch((error) => {
            console.error("Error loading products:", error);
        })
        .finally(() => {
            loading = false; 
        });
}

function addProductToList(product) {
    productList.innerHTML += `
        <div>
            <p>${product.id}</p>
            <p>${product.text}</p>
        </div>
    `;
}
