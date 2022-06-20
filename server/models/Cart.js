const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const CartSchema = new mongoose.Schema(
  {
    products:[
      {
        product:{
          type: ObjectId,
          ref:'product'
        },
        count: Number,
        price: Number
      }
    ],
    cartTotal: Number,
    orderdBy:{
      type:ObjectId,
      ref:'users'
    }
  },
  { timestamps: true }
);
module.exports = Cart = mongoose.model("cart", CartSchema);
