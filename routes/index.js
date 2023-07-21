const { generateqr } = require("../controller/createqrcode")
const { readQRCode } = require("../controller/readqrcode")

const router = require("express").Router()



router.post("/generate-qr", generateqr)
router.get("/read-qr", readQRCode)


module.exports = router