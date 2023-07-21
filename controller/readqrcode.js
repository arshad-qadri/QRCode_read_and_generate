const fs = require("fs");
const qrCode = require("qrcode-reader");
const jimp = require("jimp");

exports.readQRCode = (req,res) => {
  const qrCodeImagePath = "./qrcode.png";

  // Read the QR code image
  fs.readFile(qrCodeImagePath, async (err, data) => {
    if (err) {
      console.error("Error reading QR code image:", err);
      return;
    }

    try {
      // Decode the QR code
      const image = await jimp.read(data);
      const qr = new qrCode();
      qr.callback = (err, value) => {
        if (err) {
            res.status(500).send(err)
        } else {
          console.log("QR Code Text:", value.result);
          res.status(200).send(value.result)
        }
      };
      qr.decode(image.bitmap);
    } catch (error) {
      console.error("Error decoding QR code:", error.message);
    }
  });
};
