import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`app is listening to the port ${PORT}`);
})

app.get("/", (req, res) => {
    res.send("hello from express")
})

app.post("/test", (req, res) => {
    res.send("hello from express")
})

export default app;