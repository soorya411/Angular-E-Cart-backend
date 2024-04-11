

const express = require('express')
const productController = require('../Controller/productController')
const userController = require('../Controller/userController')
const wishlistController = require('../Controller/wishlistController')
const cartController = require('../Controller/cartController')
const router = new express.Router()
const jwtMiddleware = require('../Middlewares/jwtMiddleware')


//get all products path
router.get('/all-products',productController.getAllProducts)

//register
router.post('/user/register',userController.register)

//login
router.post('/user/login',userController.login)

//get a product
router.get('/view-product/:id',productController.getProduct)

//wishlist
router.post('/wishlist',jwtMiddleware,wishlistController.addwishlist)

//get a wishlist item
router.get('/get-wishlist',jwtMiddleware,wishlistController.getwishlist)

//delete a wishlist item
router.delete('/delete-wishlist/:id',jwtMiddleware,wishlistController.deleteFromwishlist)

//add to cart
router.post('/add-cart',jwtMiddleware,cartController.addToCart)

//get cart items
router.get('/get-cart',jwtMiddleware,cartController.getCart)

//delete cart items
router.delete('/delete-cart/:id',jwtMiddleware,cartController.deleteCart)

//increment cart
router.get('/increment-cart/:id',jwtMiddleware,cartController.incrementCart)

//increment cart
router.get('/decrement-cart/:id',jwtMiddleware,cartController.decrementCart)



module.exports = router