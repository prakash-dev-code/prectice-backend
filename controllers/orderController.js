const Order = require("./../models/orderModel");
const User = require("../models/userModel");
const Factory = require("./handleCrud");

exports.getAllOrdersAdmin = Factory.getAll(Order);
exports.updateOrder = Factory.updateOne(Order);
exports.deleteOrder = Factory.deleteOne(Order);
exports.getOrder = Factory.getOne(Order);

exports.createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, status, price } = req.body;

    // Validate
    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Order items are required" });
    }

    if (
      !shippingAddress ||
      !shippingAddress.address ||
      !shippingAddress.phone
    ) {
      return res.status(400).json({ message: "Shipping address is required" });
    }

    const newOrder = await Order.create({
      user: req.user._id,
      items,
      shippingAddress,
      status,
      price,
    });

    res.status(201).json({
      status: "success",
      data: newOrder,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
