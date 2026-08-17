const express = require("express")
const {
    getAllProduct,
    getProductById,
    editProductById,
    deleteProductById,
    addProduct
} = require("./product.service");

const router = express.Router()

router.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    const product = await getProductById(id);
    res.status(200).json({ product })
})

router.get('/', async (req, res, next) => {
    const products = await getAllProduct();
    res.status(200).json({ products });
})

router.post("/", async (req, res, next) => {

    const product = await addProduct(req.body);

    res.status(201).json({
        message: "Product added successfully",
        product
    });

});

router.put('/:id', async (req, res, next) => {
    const product = await editProductById(req.params.id, req.body);

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }
    res.status(200).json({
        message: "Product updated successfully",
        product
    });
})

router.delete('/:id', async (req, res, next) => {
    const id = req.params.id;
    const deletedProduct = await deleteProductById(id);

        if (!deletedProduct) {
        return res.status(404).json({
            message: "Product not found"
        });
    }
    
    res.status(200).json({
        message: "Product deleted successfully",
        deletedProduct
    });

})

module.exports = router;