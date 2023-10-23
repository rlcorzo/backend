import { Router } from "express";

const router = Router();



router.get('/', async (req, res) => {
    try {
        const products = await productManager.getProducts(req.query)
        if (!users.leng) {
            res.status(200).json({
                messagge: 'Product found',
                products
            })
        }
    } catch (error) {
        res.status(500).json({
            messagge: error
        })
    }
})

router.get('/:idCarts', async (req, res) => {
    const {
        idProduct
    } = req.param
    try {
        const product = await productManager.getProductsId(+idProduct)
        if (!product) {
            res.status(400).json({
                messagge: 'Product not found with the id sent'
            })
        } else {
            res.status(200).json({
                messagge: 'Product found',
                product
            })
        }
    } catch (error) {
        res.status(500).json({
            messagge: error
        })
    }
})

router.post('/', async (req, res) => {
    try {
        const newProduct = await productManager.createProduct(req.body)
        res.status(200).json({
            messagge: 'Product created',
            product: newProduct
        })
    } catch (error) {
        res.status(500).json({
            messagge: error
        })
    }
})

router.delete('/:idCarts', async (req, res) => {
    const {
        idProducts
    } = req.params
    try {
        const response = await productManager.deleteProduct(+idProducts)
        if (response === -1) {
            res.status(400).json({
                messagge: 'Product not found with the id sent'
            })
        } else {
            res.status(200).json({
                messagge: 'Products deleted'
            })
        }

    } catch (error) {
        res.status(500).json({
            messagge: error
        })
    }
})

router.put('/:idCarts', async (req, res) => {
    const {
        idProduct
    } = req.params
    try {
        const response = await productManager.updateProducts(+idProduct, req.body)
        if (response === -1) {
            res.status(400).json({
                messagge: 'Product not found with the id sent'
            })
        } else {
            res.status(200).json({
                messagge: 'Products update'
            })
        }

    } catch (error) {
        res.status(500).json({
            messagge: error
        })
    }
})

export default router