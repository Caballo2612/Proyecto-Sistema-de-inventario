import e from "express";
import cors from "cors";
import pc from "picocolors";
import duroRouter from "./App-data.js";

const app = e();

app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(e.json())

app.use("/api", duroRouter)


app.listen(3000, () =>{
    console.log(`${pc.green("➜")}  Database running at:   ${pc.cyan("http://localhost:3000")}`)
});