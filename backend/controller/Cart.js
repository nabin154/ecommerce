const {Cart} = require('../model/Cart');

const addToCart = async (req, res) => {
    const cart = new Cart(req.body);
    try {
        const data = await cart.save();
        const result= await data.populate('product');
        res.status(201).json(data)
    } catch (error) {
        res.status(400).json(error);
    }
}

const fetchCartByUser = async(req,res)=> {
    const {user} = req.query;
    try {
        const cartItems = await Cart.find({user:user})
        .populate('product');
        res.status(200).json(cartItems);
    } catch (error) {
        res.status(400).json(error);
    }
}

const updateCart = async (req,res) => {
    const {id} = req.params;
    try {
        const cart= await Cart.findByIdAndUpdate(id, req.body, {new:true});
        res.status(200).json(cart);
    } catch (error) {
        res.status(400).json(error);
    }

}


const deleteFromCart = async (req,res) => {
    const {id} = req.params;
    try {
       const cart = await Cart.findByIdAndDelete(id);
       res.status(200).json(cart);
    } catch (error) {
        res.status(400).json(error);
    }
}


module.exports = {addToCart, fetchCartByUser, updateCart, deleteFromCart};