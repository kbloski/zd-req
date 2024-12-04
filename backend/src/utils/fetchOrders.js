import { setCache } from "../services/cacheServer.js";

export async function fetchOrdersAndSave() {
    const url =
        " https://zooart6.yourtechnicaldomain.com/api/admin/v3/orders/orders/get";
    const options = {
        method: "POST",
        headers: {
            accept: "application/json",
            "content-type": "application/json",
            "X-API-KEY":
                "YXBwbGljYXRpb24xNjpYeHI1K0MrNVRaOXBaY2lEcnpiQzBETUZROUxrRzFFYXZuMkx2L0RHRXZRdXNkcmF5R0Y3ZnhDMW1nejlmVmZP",
        },
        body: JSON.stringify({
            params: {
                orderPrepaidStatus: "finished",
            },
        }),
    };

    let fetchData = null;

    await fetch(url, options)
        .then((res) => res.json())
        .then((json) => (fetchData = json))
        .catch((err) => console.error(err));


    
    const orders = []
    fetchData.Results.forEach( async (data) => {
        const orderId = data.orderId;
        const orderItems = data.orderDetails.productsResults;
        const orderTotal = data.orderDetails.payments.orderCurrency.orderProductsCost;

        const dataToSave = {
            orderID: orderId,
            orderWorth: orderTotal,
            products: orderItems.map( item => {
                return {
                    productID: item.productId,
                    quantity: item.productQuantity
                }
            })
        };

        orders.push( dataToSave)

    })

    setCache('orders', orders)
}

fetchOrdersAndSave();
