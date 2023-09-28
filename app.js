import express from 'express';
import {
    productManager
} from './ProductsManager.js';
const app = express();


app.get('/api/products', async (req, res) => {
    try {
        const products = await productManager.getProducts(req.query);
        if (!products.length) {
            return res.status(200).json({
                message: 'No products'
            });
        }
        res.status(200).json({
            message: 'Products found',
            products
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

app.get('/api/products/:idProduct', async (req, res) => {
    const {
        idProduct
    } = req.params
    try {
        const product = await productManager.getProductById(+idProduct)
        if (!product) {
            return res.status(400).json({
                message: 'Product not found with the id'
            })
        }
        res.status(200).json({
            message: "Product found",
            product
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
})





app.listen(8080, () => {
    console.log('Escuchando al puerto 8080');
});