const AdminModel = require('../Models/AdminModel');
const { v2 : cloudinary } = require('cloudinary');
const dotenv = require('dotenv');
const ProductModel = require('../Models/productModel');
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});


const registerAdmin = async (req, res) => {
    try {
        const admin = new AdminModel({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        const createAdmin = await admin.save();
        res.status(201).json(createAdmin);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const loginAdmin = async (req, res) => {
    try {
        const admin = await AdminModel.findOne({ email: req.body.email });
        if (!admin) {
            return res.status(404).json({ message: 'Admin not Found' });
        }
        if (admin.password !== req.body.password) {
            return res.status(400).json({ message: 'Invalid Password' });
        }
        res.status(200).json(admin);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
 const AddProduct = async (req, res) => {
 const { title, price, description, category} = req.body;
 const images = req.files;
 try {
     const product = new ProductModel({
         title,
         price,
         description,
         category,
         image: images.map(image => image.path)
     });
     await product.save();
 } catch (error) {
     console.log(error);
 }
     res.send("ok");
 }
module.exports = { 
    
    registerAdmin,
     loginAdmin,
     AddProduct

     };