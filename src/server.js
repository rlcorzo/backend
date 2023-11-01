import express from "express"
import {productManager} from './ProductsManager.js';
import productsRouter from './router/products.router.js'
import cartsRouter from './router/carts.router.js'
import { __dirname } from "./utils.js"

const app = express()

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
        res.status(500).json({ message: "Internal Server Error"});
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
        res.status(500).json({ message: "Internal Server Error"});
    }
})





app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(express.static(__dirname +'/public'))


app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)






app.listen(8080, () => {
    console.log('escuchando al puerto 8080')
})

