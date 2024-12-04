<!-- API-SFINALIZOWANE-ZAMOWIENIA -->
 https://zooart6.yourtechnicaldomain.com/api/admin/v3/orders/orders/get 

Wymagane dane do wyciągnięcia:

<!-- Produkty (z productsResults): -->


{
    orderID: numer zamowienia, //Results.orderId
    products: [ //Results.orderDetails.productsResults
        {
            productID: id produktu, 
            quantity: ilosc sprzedanych,
        },
    ],
    orderWorth: kwota zamówienia, 
    Results[n].orderDetails.payments.orderCurrency.orderProductsCost
}



}





5h +