// =============== generate qr code ===========

const fs = require("fs");
const qrCode = require("qrcode");
const path = require('path');
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});


exports.generateqr = (req, res) => {
  const content = req.body.text;

  // Generate the QR code
  qrCode.toFile('qrcode.png', content, {
    type: 'png',
    errorCorrectionLevel: 'H',
    scale: 10,
  }, (err) => {
    if (err) {
      console.error('Error generating QR code:', err);
      res.status(500).send('Error generating QR code');
    } else {
      // Upload the QR code image to Cloudinary
      cloudinary.uploader.upload('qrcode.png',{
        public_id: process.env.PUBLIC_id,
        overwrite: true, // Set this to 'true' to allow overwriting, or 'false' to prevent it
      }, (cloudinaryErr, result) => {
        if (cloudinaryErr) {
          console.error('Error uploading to Cloudinary:', cloudinaryErr);
          res.status(500).send('Error uploading QR code to Cloudinary');
        } else {
          // Send the Cloudinary URL of the uploaded image as a response
        //   console.log(result);
          res.send({url:result.secure_url});

          // Optionally, delete the local QR code image after serving the response
          fs.unlink('qrcode.png', (unlinkErr) => {
            if (unlinkErr) {
              console.error('Error deleting local QR code image:', unlinkErr);
            } else {
              console.log('Local QR code image deleted successfully.');
            }
          });
        }
      });
    }
  });
};
