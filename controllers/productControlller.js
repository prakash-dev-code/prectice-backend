const Product = require("./../models/productModel");
const Factory = require("./handleCrud");

exports.getAllProduct = Factory.getAll(Product);
exports.updateProduct = Factory.updateOne(Product);
exports.deleteProduct = Factory.deleteOne(Product);
exports.getProduct = Factory.getOne(Product);

// In your controller
exports.createProduct = async (req, res) => {
  try {
    console.log(req, "REq")

    // Extract text fields
    const {
      name,
      description,
      price,
      discountedPrice,
      category,
      stock,
      variants,
    } = req.body;

    // Process variants safely
    let parsedVariants = [];
    if (variants) {
      try {
        parsedVariants =
          typeof variants === "string" ? JSON.parse(variants) : variants;
      } catch (e) {
        return res.status(400).json({
          success: false,
          message: "Invalid variants format",
          error: e.message,
        });
      }
    }

    // Process images
    const imageData = (req.files || []).map((file, i) => {
      // Get altText for this index
      const altText = req.body[`altText${i}`] || `Image ${i + 1}`;

      return {
        url: file.location, // S3 URL
        altText: altText,
      };
    });

    // Create product
    const product = await Product.create({
      name,
      description,
      price: parseFloat(price),
      discountedPrice: parseFloat(discountedPrice),
      category,
      stock: parseInt(stock),
      seller:req.user._id,
      variants: parsedVariants,
      images: imageData, // This will store S3 URLs in MongoDB
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error("Create Product Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
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
