const express = require("express")
const router = express.Router()
const fs = require("fs/promises");
const path = require("path")

const filePath = path.join(__dirname, "product.json");

async function readMyFile(path) {
    try {
        const content = await fs.readFile(path, "utf8");
        return JSON.parse(content);

    } catch (err) {

        console.log("Something went wrong:", err);
    }
}

async function writeMyFile(path, content) {

    try {
        const myContent = JSON.stringify(content);
        await fs.writeFile(path, myContent, "utf8");

    } catch (err) {
        console.log("Something went wrong:", err);
    }

}



async function getAllProduct() {
   const products = await readMyFile(filePath)
    return products;
}

async function getProductById(id) {
   const products = await readMyFile(filePath)
    const product = products.find(element => element.id == id);
    return product;
}

async function addProduct(productData) {
    const products = await readMyFile(filePath);

    products.push(productData);

    await writeMyFile(filePath, products);

    return productData;
}

async function editProductById(id, data) {
    const { name, desc, price } = data;
    const products = await readMyFile(filePath);

    const product = products.find(
        element => element.id === Number(id)
    );

    if (!product) {
        return null;
    }

    product.name = name;
    product.desc =desc;
    product.price = price;

    await writeMyFile(filePath, products);

    return product;
}

async function deleteProductById(id) {
    const products = await readMyFile(filePath);

    const product = products.find(
        element => element.id === Number(id)
    );

    if (!product) {
        return null;
    }

    const newProducts = products.filter(
        element => element.id !== Number(id)
    );

    await writeMyFile(filePath, newProducts);

    return product;
}




module.exports = {
    getAllProduct,
    getProductById,
    editProductById,
    deleteProductById,
    addProduct
};




