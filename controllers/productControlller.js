const Product = require("./../models/productModel");
const Factory = require("./handleCrud");

exports.getAllProduct = Factory.getAll(Product);
exports.updateProduct = Factory.updateOne(Product);
exports.deleteProduct = Factory.deleteOne(Product);
exports.getProduct = Factory.getOne(Product);

exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountedPrice,
      category,
      stock,
      seller,
      variants,
    } = req.body;

    // map S3 uploaded images
    const imageData = req.files.map((file, i) => ({
      url: file.location,
      altText: req.body[`altText${i}`] || `Image ${i + 1}`,
    }));

    const product = await Product.create({
      name,
      description,
      price,
      discountedPrice,
      category,
      stock,
      seller,
      variants: JSON.parse(variants), // if sent as stringified JSON
      images: imageData,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error("Create Product Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Implement this for new arrivals and best sellers:

// ✅ Option 1: Dynamic Calculation (Recommended)
// Use existing fields like createdAt (for new arrivals) and ratings.count or sales count (if you track it) to dynamically sort products in your backend queries.

// 🔹 New Arrivals
// Sort by createdAt descending.

// Example:

// javascript
// Copy
// Edit
// const newArrivals = await Product.find().sort({ createdAt: -1 }).limit(10);
// 🔹 Best Sellers
// Sort by ratings.count descending (or sales if you implement it).

// Example:

// javascript
// Copy
// Edit
// const bestSellers = await Product.find().sort({ "ratings.count": -1 }).limit(10);
// ➡️ No changes needed in the schema!
