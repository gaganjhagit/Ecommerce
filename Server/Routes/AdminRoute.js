const express = require('express');
const router = express.Router();
const {upload} = require('../middilwere/multer');

const { cloudinary } = require('../config/cloudinery');
const fs = require('fs');
const path = require('path');

const dir = './uploads';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

router.post('/addProduct', upload.array('images', 12), async (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).send({ message: 'No files uploaded' });
    }

    try {
        const result = await Promise.all(
            req.files.map(file => cloudinary.uploader.upload(file.path))
        );

        req.files.forEach(file => fs.unlinkSync(file.path));

        res.status(200).send({
            message: 'Files uploaded successfully',
            fileUrls: result.map(file => file.secure_url),
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});


const AdminController = require('../Controller/AdminController');
router.post('/register' ,AdminController.registerAdmin)
router.post('/login',AdminController.loginAdmin)
router.post('/addProduct',upload.array('images'),AdminController.AddProduct)


module.exports = router;    

