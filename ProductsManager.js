import { error } from 'console'
import { json } from 'express'
import fs from 'fs'



class ProductsManager{
    constructor(path){
        this.path=path
    }

async getProducts(queryObj){
    const {limit} = queryObj
    try{

        if(fs.existsSync(this.patch)){
            const productsFile = await fs.promises.readFile(this.patch, 'utf-8')
            const productsArray = JSON.parse(productsFile)
            return limit ? productsArray.slice(0,limit) : productsArray
        }else {
            return []
        }

    }catch (error) {
        return error
    }

}

    async getProductsId(id){
        try {
            const productsFile = await this.getProducts({})
            const product = productsFile.find(p=>p.id===id)
            return product

        } catch(error){
            return error
       }
    }


    async createProduct(obj){
        try{
            const products = await this.getProducts({})
            let id
            if (!products.length){
                id = 1
            }else{
                id = products[products.length -1].id +1
            }
            const newProduct = { id, ...obj }
            products.push(newProduct)
            await fs.promises.writeFile(this.path, JSON.stringify(products))
            return newProduct

        } catch (error) {
            return error
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

export const productManager = new ProductsManager ();