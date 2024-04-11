const wishlists = require('../Models/wishlistSchema');

// Add To wishlist
exports.addwishlist = async (req, res) => {
    // Get product details from the request body
    const { id, title, image, price } = req.body;
    // Get the user id from the payload (assuming it's already set in the request)
    const userId = req.payload;

    try {
        // Check if the product already exists in the wishlist
        const existingProduct = await wishlists.findOne({ id });
        if (existingProduct) {
            return res.status(404).json("Product already exists in the wishlist");
        } else {
            // If the product doesn't exist, add it to the wishlist
            const newProduct = new wishlists({
                id,
                title,
                price,
                image,
                userId
            });
            await newProduct.save();
            return res.status(200).json("Product added to wishlist successfully");
        }
    } catch (error) {
        // If an error occurs, return a 500 status code with the error message
        return res.status(500).json({ error: error.message });
    }
};

//get all products from the wishlists
exports.getwishlist = async (req, res) => {
    try {
        const wishlistProduct = await wishlists.find()
        if (wishlistProduct) {
            res.status(200).json(wishlistProduct)
        }
        else {
            res.status(404).json("product not found")
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });

    }
}

//delete from wishlist
exports.deleteFromwishlist = async (req, res) => {
    const { id } = req.params
    try {
        const deleteItem = await wishlists.deleteOne({ id })
        if (deleteItem) {
            const wishlistProduct = await wishlists.find()
            res.status(200).json(wishlistProduct)
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });

    }
}