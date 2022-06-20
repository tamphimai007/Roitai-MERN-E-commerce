const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const OrderSchema = new mongoose.Schema(
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
    orderstatus:{
      type:String,
      default:'Not Process'
    },
    orderdBy:{
      type:ObjectId,
      ref:'users'
    }
  },
  { timestamps: true }
);
module.exports = Order = mongoose.model("order", OrderSchema);
