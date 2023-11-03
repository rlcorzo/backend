import express from "express";
import {engine} from "express-handlebars";
import viewsRouter from "./router/views.router.js";
import {productManager} from './ProductsManager.js';
import productsRouter from './router/products.router.js';
import cartsRouter from './router/carts.router.js';
import { __dirname } from "./utils.js";
import { Server } from "socket.io";

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
});




app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(__dirname +'/public'));


app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);


app.engine("handlebars", engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use("/", viewsRouter);



const PORT = 8080;

const httpServer = app.listen(PORT, () => {
    console.log(`Escuchando al puerto ${PORT}`);
});



//websocket - server

const socketServer = new Server(httpServer);

//connection - disconnect

socketServer.on('connection', (socket) =>{
    socket.on(`disconnect`, () =>{
    });

    socket.on("firstEvent", (info)=>{
        //names.push(info);
        socketServer.emit('secondEvent', info);
    });
});