const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      default: "user",
    },
    enabled: {
      type: Boolean,
      default: false,
    },
    address:String,
    wishlist:[{
      type: ObjectId,
      ref: 'product'
    }]
  },
  { timestamps: true }
);
module.exports = User = mongoose.model("users", UserSchema);
