import cron from 'node-cron';
import { fetchOrdersAndSave } from './utils/fetchOrders.js';

export function intervalUpdateServerDataAfterDay(){
    cron.schedule('0 3 * * *', async () => {
        console.log("Start updating data...")
        await fetchOrdersAndSave()
    })
}
