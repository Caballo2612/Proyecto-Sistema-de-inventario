import { Router } from "express";
import { DuroModel } from "../sql/DuroDB.js";

const duroRouter = Router();

duroRouter.get("/data", async (req, res) => { 
    try {
        const data = await DuroModel.getAll();
        res.json(data)
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: `Error al obtener datos`
        })
    }
});

duroRouter.get("/data/count", async (req, res) => {
    try {
        const total = await DuroModel.countAll()
        res.json(total)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Error al contar los datos"
        })
    }
})

export default duroRouter;