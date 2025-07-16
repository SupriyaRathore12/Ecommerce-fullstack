const productModel = require("../Model/productModel");
const mongoose = require("mongoose");
const { isValid, isValidURL } = require("./validator");


// Add Products

const addProducts = async (req, res) => {

    try {

        let productData = req.body;
        // console.log("Product data:", req.body);

        if (Object.keys(productData).length === 0) {
            return res.status(400).json({ msg: "Bad request, Please provide all fields" });
        }

        const { productName, productImage, description, price, category, rating, isFreeDelivery } = productData;


        // product name validation

        if (!isValid(productName))
            return res.status(400).json({ msg: "product name not provided" });

        // product image validation

        if (!isValid(productImage) || !isValidURL(productImage))
            return res.status(400).json({ msg: "invalid product image" });

        // product description validation
        if (!isValid(description))
            return res.status(400).json({ msg: "product Description not provided" });

        // product price validation
        if (!isValid(price) || price < 0)
            return res.status(400).json({ msg: "valid product price is required" });

        // product category validation
        if (!isValid(category))
            return res.status(400).json({ msg: "product category not provided" });
        let validCategory = [
            "electronics",
            "clothing",
            "food",
            "books",
            "furniture",
        ];
        if (!validCategory.includes(category.trim().toLowerCase())) {
            return res.status(400).json({ msg: "Invalid category" });
        }

        // product rating validation
        if (!isValid(rating) || rating < 0 || rating > 5)
            return res.status(400).json({ msg: "valid rating is required" });

        // product isfreeDelivery validation
        if (productData.hasOwnProperty("isFreeDelivery")) {
            if (typeof isFreeDelivery !== "boolean") {
                return res.status(400).json({ msg: "isFreeDelivery must be a boolean" })
            }
        }

        let product = await productModel.create(productData);
        return res.status(201).json({ msg: "Product added successfully", product });

    } catch (error) {
        console.log(error);

        return res.status(500).json({ msg: error.msg, error });



    }
};

// Get all products

const getAllProducts = async (req, res) => {
    try {
        let product = await productModel.find();
        if (product.length === 0) {
            return res.status(404).json({ msg: "No products found" });
        }
        return res.status(200).json({ msg: "product list", count: product.length, product })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal server error", error })

    }
};

// Get product by Id

const getProductsById = async (req, res) => {
    try {
        let productId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ msg: "Invalid product id" });
        }
        let product = await productModel.findById(productId)
        if (!product) {
            return res.status(404).json({ msg: "Product not found" });
        }
        return res.status(200).json({ msg: "product found", product })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal server error", error })

    }
};

// get product by query
const getProductsByQuery = async (req, res) => {
    try {
        const category = req.query.productCategory;

        // basic validation
        if (!category) {
            return res.status(400).json({ msg: "Category is required" });
        }
        let product = await productModel.find({ productCategory: category })
        if (product.length === 0) {
            return res.status(404).json({ msg: "No products found" });
        }
        return res.status(200).json({ product });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal server error", error })
    }
}

//Update Product

const updateProducts = async (req, res) => {
    try {
        let productId = req.params.id;
        let productData = req.body;
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ msg: "Invalid product id" });
        }
        if (Object.keys(productData).length === 0) {
            return res.status(400).json({ msg: "Product data is required" });
        }
        const { productName, productImage, description, price, category, rating, isFreeDelivery } = productData;

        const updateData = {};

        // prdct Name validation

        if (!isValid(productName))
            return res.status(400).json({ msg: "product name not provided" });
        const duplicateProduct = await productModel.findOne({ productName });
        if (duplicateProduct) {
            return res.status(400).json({ msg: "Product name already exists" });
        }
        updateData.productName = productName;

        //product image validation
        if (!isValid(productImage) || !isValidURL(productImage))
            return res.status(400).json({ msg: "valid product image" });

        //product description validation

        if (!isValid(description))
            return res.status(400).json({ msg: "product Description not provided" });

        // product price validation
        if (!isValid(price) || price < 0)
            return res.status(400).json({ msg: "valid product price is required" });

        // product category validation
        if (!isValid(category))
            return res.status(400).json({ msg: "product category not provided" });
        let validCategory = [
            "electronics",
            "clothing",
            "food",
            "books",
            "furniture",
        ];
        if (!validCategory.includes(category.trim().toLowerCase())) {
            return res.status(400).json({ msg: "Invalid category" });
        }

        // product rating validation
        if (!isValid(rating) || rating < 0 || rating > 5)
            return res.status(400).json({ msg: "valid rating is required" });

        // product isfreeDelivery validation
        if (productData.hasOwnProperty(isFreeDelivery)) {
            if (typeof isFreeDelivery !== "boolean") {
                return res.status(400).json({ msg: "isFreeDelivery must be a boolean" })
            }
        }

        let product = await productModel.findByIdAndUpdate(productData);
        return res.status(201).json({ msg: "Product updated successfully", product });


    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ msg: "Internal Server Error" })

    }
}


//Delete Products
const deleteProducts = async (req, res) => {
    try {
        let productId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ msg: "Invalid product id" });

        }
        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({ msg: "Product not found" });
        }
        await productModel.findByIdAndDelete(productId);
        res.status(200).json({ msg: "Product deleted successfully" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal server error", error })


    }
}

module.exports = { addProducts, getAllProducts, getProductsById, getProductsByQuery, updateProducts, deleteProducts }