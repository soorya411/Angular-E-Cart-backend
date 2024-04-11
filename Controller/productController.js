const products = require('../Models/productSchema')


//getallproducts

exports.getAllProducts = async(req,res)=>{
    //get all products from mongodb - find()
    try {
        const AllProducts = await products.find()
        res.status(200).json(AllProducts)
    } catch (error) {
        res.status(404).json(error)
    }
}

//get a product details

exports.getProduct = async(req,res)=>{
    const {id} = req.params
    //get a particular product details from the database - findOne()
    try {
        getAProduct=await products.findOne({id})
        res.status(200).json(getAProduct)
    } catch (error) {
        res.status(404).json(error)
    }
}