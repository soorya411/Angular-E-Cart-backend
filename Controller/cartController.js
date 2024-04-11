const carts = require('../Models/cartSchema')

//AddToCart

exports.addToCart = async (req, res) => {
    //get details
    const { id, title, price, image, quantity } = req.body
    try {
        const cartitem = await carts.findOne({ id })
        if (cartitem) {
            cartitem.quantity += 1
            cartitem.price = cartitem.quantity * cartitem.price
            res.status(200).json("Product updated successfully")
        }
        else {
            const cartNewProduct = new carts({ id, title, price, image, quantity })
            await cartNewProduct.save()
            res.status(200).json("Product added successfully")
        }
    }
    catch (err) {
        res.status(404).json(err)
    }
}

exports.getCart = async (req, res) => {
    try {
        const allCartProducts = await carts.find()
        res.status(200).json(allCartProducts)
    }
    catch (err) {
        res.status(404).json(err)
    }
}
//delete from cart
exports.deleteCart = async (req, res) => {
    const { id } = req.params
    try {
        const deleteCardProduct = await carts.deleteOne({ id })
        if (deleteCardProduct) {
            const allCartProducts = await carts.find()
            res.status(200).json(allCartProducts)
        }
    } catch (error) {
        return res.status(404).json({ error: error.message });

    }
}

exports.incrementCart=async(req,res)=>{
    const {id} = req.params
    try {
        //check if product already exists
        const incrementCartProduct = await carts.findOne({id})
//if product already exists,then increament product quantity by 1 and update the price accordingly
        if(incrementCartProduct){
            incrementCartProduct.quantity+=1
            incrementCartProduct.grandTotal = incrementCartProduct.price*incrementCartProduct.quantity
            //if its updated,then stored to mongodb
            await incrementCartProduct.save()
            //get all the products item details after updating
            const allCartProducts = await carts.find()
            res.status(200).json(allCartProducts)
        }
        else{
            res.status(402).json("item not found")
        }
    } catch (error) {
        res.status(404).json(error)
    }
}

exports.decrementCart=async(req,res)=>{
    const {id} = req.params
    try{
        //check if product already exists
        const decrementCartProduct = await carts.findOne({id})
        //if product already exists, then decrement product quantity by 1 and update the price accordingly
        if(decrementCartProduct){
            decrementCartProduct.quantity-=1
            if(decrementCartProduct.quantity==0){
                //if product quantity is 0, then delete product from cart
                const deleteCartProduct = await carts.deleteOne({id})
                if(deleteCartProduct){
                    const allCartProducts = await carts.find()
                res.status(200).json(allCartProducts)
                }
            }
            else{
                //if product quantity is not 0, then update price accordingly
                decrementCartProduct.grandTotal = decrementCartProduct.price*decrementCartProduct.quantity
                //if its updated,then stored to mongodb
                await decrementCartProduct.save()
                //get all the products item details after updating
                const allCartProducts = await carts.find()
                res.status(200).json(allCartProducts)
            }
        }
        else{
            res.status(402).json("item not found")
        }
    }
    catch(err){
        res.status(404).json(err)
    }
  
  }
