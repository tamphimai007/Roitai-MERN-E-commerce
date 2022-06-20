const bcrypt = require("bcryptjs");

// Models
const User = require("../models/User");
const Product = require("../models/Product");
const Cart = require("../models/Cart");
const Order = require("../models/Order");

const jwt = require("jsonwebtoken");

exports.listUsers = async (req, res) => {
  try {
    // Code
    const user = await User.find({}).select("-password").exec();
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};
exports.readUsers = async (req, res) => {
  try {
    // Code
    const id = req.params.id;
    const user = await User.findOne({ _id: id }).select("-password").exec();
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};
exports.updateUsers = async (req, res) => {
  try {
    // Code
    var { id, password } = req.body.values;
    // 1 gen salt
    const salt = await bcrypt.genSalt(10);
    // 2 encrypt
    var enPassword = await bcrypt.hash(password, salt);

    const user = await User.findOneAndUpdate(
      { _id: id },
      { password: enPassword }
    );
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};
exports.removeUsers = async (req, res) => {
  try {
    // Code
    const id = req.params.id;
    const user = await User.findOneAndDelete({ _id: id });
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};
exports.changeStatus = async (req, res) => {
  try {
    // Code
    console.log(req.body);
    const user = await User.findOneAndUpdate(
      { _id: req.body.id },
      { enabled: req.body.enabled }
    );
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};
exports.changeRole = async (req, res) => {
  try {
    // Code
    console.log(req.body);
    const user = await User.findOneAndUpdate(
      { _id: req.body.id },
      { role: req.body.role }
    );
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};

exports.userCart = async (req, res) => {
  try {
    const { cart } = req.body;

    // Check User
    let user = await User.findOne({ username: req.user.username }).exec();
    // สร้าง array [{1},{2},{3}]
    let products = [];
    // Check ตะกร้าสินค้าอันเก่า
    let cartOld = await Cart.findOne({ orderdBy: user._id }).exec();
    if (cartOld) {
      cartOld.remove();
      console.log("remove old cart");
    }
    //แต่งสินค้า
    for (let i = 0; i < cart.length; i++) {
      let object = {};

      object.product = cart[i]._id;
      object.count = cart[i].count;
      object.price = cart[i].price;

      // {3}
      products.push(object);
    }
    // หาผลรวมของตะกร้า
    let cartTotal = 0;
    for (let i = 0; i < products.length; i++) {
      //code
      cartTotal = cartTotal + products[i].price * products[i].count;
    }

    let newCart = await new Cart({
      products,
      cartTotal,
      orderdBy: user._id,
    }).save();

    console.log(newCart);
    res.send("userCart Ok");
  } catch (err) {
    console.log(err);
    res.status(500).send("userCart Server Error");
  }
};

exports.getUserCart = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username }).exec();

    let cart = await Cart.findOne({ orderdBy: user._id })
      .populate("products.product", "_id title price")
      .exec();

    const { products, cartTotal } = cart;
    res.json({ products, cartTotal });
  } catch (err) {
    res.status(500).send("getUserCart Error");
  }
};

exports.emptyCart = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username }).exec();

    const empty = await Cart
    .findOneAndRemove({orderdBy:user._id})
    .exec()

    res.send(empty)

  } catch (err) {
    res.status(500).send("Remove Cart Error");
  }
};

exports.saveAddress = async (req, res) => {
  try {
    //code
    const userAddress = await User.findOneAndUpdate(
      { username: req.user.username },
      { address: req.body.address }
    ).exec();
    res.json({ ok: true });
  } catch (err) {
    res.status(500).send("Save Address Error");
  }
};


// Order
exports.saveOrder = async (req, res) => {
  try {
    //code
    let user = await User
    .findOne({username:req.user.username})
    .exec()

    let userCart = await Cart
    .findOne({orderdBy:user._id})
    .exec()

    let order = await new Order({
      products: userCart.products,
      orderdBy: user._id,
      cartTotal: userCart.cartTotal
    }).save()

    // + - products
    let bulkOption = userCart.products.map((item)=>{
      return {
        updateOne:{
          filter:{ _id:item.product._id},
          update:{ $inc:{quantity : -item.count,sold:+item.count}}
        }
      }
    })

    let updated = await Product.bulkWrite(bulkOption,{})

    res.send(updated);
  } catch (err) {
    res.status(500).send("Save Order Error");
  }
};

exports.getOrder = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username }).exec();

    let order = await Order.find({ orderdBy: user._id })
      .populate("products.product")
      .exec();
    res.json(order)
  } catch (err) {
    res.status(500).send("get Order Error");
  }
};



exports.addToWishList = async(req,res)=>{
  try{
    //code
    const { productId } = req.body
    let user = await User.findOneAndUpdate(
      {username:req.user.username},
      {$addToSet:{wishlist:productId}}
    ).exec()

    res.send(user)

  }catch(err){
    res.status(500).send('Add Wishlist Error')
  }
}
exports.getWishList = async(req,res)=>{
  try{
    //code
    let list = await User
    .findOne({username:req.user.username})
    .select('wishlist')
    .populate('wishlist')
    .exec()
    res.json(list)

  }catch(err){
    res.status(500).send('GET Wishlist Error')
  }
}
exports.removeWishList = async(req,res)=>{
  try{
    //code
    // //https://localhost/user/wishlist/465465456456456
    const { productId } = req.params
    let user = await User.findOneAndUpdate(
      {username:req.user.username},
      {$pull:{wishlist: productId}}
    ).exec()

    res.send(user)

  }catch(err){
    res.status(500).send('GET Wishlist Error')
  }
}