import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.send({msg: `Azalea`, status: `Coming soon!`, code: 404})
})