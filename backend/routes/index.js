import { Router } from "express"
import idosell from "@api/idosell";
const router = Router()

router.get('/', (req, res) => {
    idosell.auth(
        "YXBwbGljYXRpb24xNjpYeHI1K0MrNVRaOXBaY2lEcnpiQzBETUZROUxrRzFFYXZuMkx2L0RHRXZRdXNkcmF5R0Y3ZnhDMW1nejlmVmZP"
    );
    idosell
        .ordersOrdersGet()
        .then(({ data }) => console.log(data))
        .catch((err) => console.error(err));
    

})

const routesArr = [
    router
]

export function registerRoutes( app ){
    for(const route of routesArr){
        app.use( route )
    }
}