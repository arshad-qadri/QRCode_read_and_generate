require("dotenv").config()

const express = require("express")
const router = require("./routes")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cors())
app.use("/api", router)

const PORT = 5000
app.listen(PORT,()=>{
    console.log("Server running on port : "+ PORT);
})