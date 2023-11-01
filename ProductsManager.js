import {
    error
} from 'console'
import {
    json
} from 'express'
import fs from 'fs'



class ProductsManager {
    constructor(path) {
        this.path = path
    }

    async getProducts() {
        try {
            if (fs.existsSync(this.patch)) {
                const Products = await fs.promises.readFile(this.patch, 'utf-8')
                return JSON.parse(products);
            } else {
                return [];
            }

        } catch (error) {
            return error;
        }

    }



    async addProduct(title, description, price, thumbnail, code, stock) {
        try {
            const products = await this.getProducts();
            if (!title || !description || !price || !thumbnail || !code || !stock) {
                return console.log("error: All fields are required");
            } else if (products.some((product) => product.code === code.trim())) {
                return console.log("error: Product code already exists");
            } else {
                const product = {
                    id: products.length ? products[products.length - 1].code + 1 : 1,
                    title: title.trim(),
                    description: description.trim(),
                    price: price,
                    thumbnail: thumbnail.trim(),
                    code: code.trim(),
                    stock: stock,
                };
                products.push(product);
                await fs.promises.writeFile(this.path, JSON.stringify(products));
            }
        } catch (error) {
            return error;
        }
    }


    async getProductById(id) {
        try {
            const products = await this.getProducts();
            return (
                products.find((product) => product.id == id) || {
                    error: "Product Not Found",
                }
            );
        } catch (error) {
            return error;
        }
    }



    async updateProductById(id, data) {
        try {
            const products = await this.getProducts();
            const productIndex = products.findIndex((product) => product.id == id);
            if (productIndex === -1) {
                return {
                    error: "Product Not Found"
                };
            }

            if (data.id && data.id !== id) {
                throw new Error("Updating the product ID is not allowed");
            }

            const updatedProduct = {
                ...products[productIndex],
                ...data
            };
            products[productIndex] = updatedProduct;
            await fs.promises.writeFile(this.path, JSON.stringify(products));
            return updatedProduct;
        } catch (error) {
            return error;
        }
    }




    async deleteProductById(id) {
        try {
            const products = await this.getProducts();
            const newProductsArray = products.filter((product) => product.id != id);
            await fs.promises.writeFile(this.path, JSON.stringify(newProductsArray));
        } catch (error) {
            return error;
        }
    }
}





const product1 = {
    name: 'Gaseosa',
    price: 600
}
const product2 = {
    name: 'Galletas',
    price: 300
}
const product3 = {
    name: 'Alfajores',
    price: 100
}
const product4 = {
    name: 'Helados',
    price: 400
}
const product5 = {
    name: 'Queso',
    price: 300
}

/*async function test(){
    const productManager = new ProductsManager("products.json")
    await productManager.createProduct(product1);
    await productManager.createProduct(product2);
    await productManager.createProduct(product3);
    await productManager.createProduct(product4);
    await productManager.createProduct(product5);
}
*/

export const productManager = new ProductManager("productsAPI.json");