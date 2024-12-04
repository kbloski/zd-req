import { Router } from "express";
import { getCache } from "./services/cacheServer.js";
import { isNumber } from "./utils/isNumber.js";

const router = Router();

function csvRowFromOrder(order) {
    const csvData = [];
    const orderId = order.orderID;
    const orderItems = order.products;
    const orderWorth = order.orderWorth;

    if (!orderItems.length) {
        csvData.push([orderId, "", "", orderWorth]);
    } else {
        orderItems.forEach((item) => {
            csvData.push([orderId, item.product_id, item.quantity, orderWorth]);
        });
    }
    let csvForm = csvData.map((row) => row.join(","));

    return csvForm;
}

router.get("/orders/all", async (req, res) => {
    try {
        const { minWorth , maxWorth } = req.query;
        if (
            minWorth 
            && !isNumber(minWorth)) return res.status(404).json({msg: 'Query param minWorth must be a number'})

        if (
            maxWorth 
            && !isNumber(maxWorth)
        ) return res.status(404).json({msg: 'Query param maxWorth must be a number'})

        let ordersCache = getCache("orders");

        if (minWorth) ordersCache = ordersCache.filter((order) => Number(order.orderWorth) >= minWorth/1);
        if (maxWorth) ordersCache = ordersCache.filter((order) => Number(order.orderWorth) <= maxWorth/1);

        const csvRows = [["orderID", "productId", "quantity", "orderWorth"]];

        for( const order of ordersCache){
                csvRows.push(csvRowFromOrder(order));
        }

        let csvForm = csvRows.map((row) => row.join(","));
        csvForm = csvForm.join("\n");

        res.setHeader("Content-Type", "text/csv");
        res.attachment( "orders.csv" );
        res.send(csvForm);
    } catch (err) {
        console.error(err);
        res.status(500).end('321');
    }
});

router.get("/orders/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const ordersCache = getCache("orders");
        const existOrder = ordersCache.filter(
            (order) => order.orderID === id
        )[0];

        if (!existOrder) return res.status(404).send("Not found");

        const csvRows = [
            ["orderID", "productId", "quantity", "orderWorth"],
            csvRowFromOrder(existOrder),
        ];

        const csvForm = csvRows.join("\n");

        res.setHeader("Content-Type", "text/csv");
        res.attachment("order.csv");
        res.send(csvForm);
    } catch (err) {
        console.error(err);
        res.status(500).end();
    }
});

export default router;
