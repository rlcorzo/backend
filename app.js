import express from 'express';
import { productManager} from './ProductsManager.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}));


app.get("/", (req,res) =>{
    res.send ("Bienvenidos al servidor de productos");
});

app.get("/products", async (req, res) => {
    try {
        const products = await productManager.getProducts();
        const {limit} = req.query;
        if (!products.length) {
            res.status(200).json({ message: 'No Products Found'});
        }else{
            if (limit) {
                res.status(200).json(products.slice(0,limit));
            }else{
                res.status(200).json({message: "Products found", products});
            }

        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

app.get("/products/:pid", async (req, res) => {
    const {pid} = req.params;
    try {
        const product = await productManager.getProductById(pid);
        if (product.error === "Product Not Found") {
             res.status(404).json({ message: "Product not found" })
        }else{
            res.status(200).json({ message: "Product found",product});
        }

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error"});
    }
});





app.listen(8080, () => {
    console.log('Escuchando al puerto 8080');
});