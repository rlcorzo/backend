/*
class ProductManager {
    constructor() {
      this.products = [];
      this.nextId = 1;
    }
  
    addProduct(product) {
      if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
        console.error("Todos los campos son obligatorios.");
        return;
      }
  
      if (this.products.some(p => p.code === product.code)) {
        console.error("El código del producto ya existe.");
        return;
      }
  
      product.id = this.nextId++;
      this.products.push(product);
      console.log("Producto agregado correctamente.");
    }
  
    getProducts() {
      return this.products;
    }
  
    getProductById(id) {
      const product = this.products.find(p => p.id === id);
      if (product) {
        return product;
      } else {
        console.error("Producto no encontrado.");
        return null;
      }
    }
  }
  
  
  const manager = new ProductManager();
  manager.addProduct({
    title: "Gaseosa",
    description: "Coca Cola",
    price: 500,
    thumbnail: "imagen1.jpg",
    code: "P001",
    stock: 50,
  });
  
  manager.addProduct({
    title: "Producto limpieza",
    description: "Lavandina",
    price: 350,
    thumbnail: "imagen2.jpg",
    code: "P002",
    stock: 30,
  });
  
  console.log(manager.getProducts());
  
  const product = manager.getProductById(1);
  console.log(product);
  */


  const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
  }

  async addProduct(productData) {
    try {
      const products = await this.getProductsFromFile();
      const newProduct = {
        id: products.length + 1,
        ...productData,
      };
      products.push(newProduct);
      await this.saveProductsToFile(products);
      return newProduct;
    } catch (error) {
      throw error;
    }
  }

  async getProducts() {
    try {
      return await this.getProductsFromFile();
    } catch (error) {
      throw error;
    }
  }

  async getProductById(productId) {
    try {
      const products = await this.getProductsFromFile();
      return products.find((product) => product.id === productId);
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(productId, updatedData) {
    try {
      const products = await this.getProductsFromFile();
      const productIndex = products.findIndex((product) => product.id === productId);

      if (productIndex !== -1) {
        const updatedProduct = { ...products[productIndex], ...updatedData };
        products[productIndex] = updatedProduct;
        await this.saveProductsToFile(products);
        return updatedProduct;
      } else {
        throw new Error(`Product with ID ${productId} not found.`);
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(productId) {
    try {
      const products = await this.getProductsFromFile();
      const updatedProducts = products.filter((product) => product.id !== productId);
      await this.saveProductsToFile(updatedProducts);
    } catch (error) {
      throw error;
    }
  }

  async getProductsFromFile() {
    return new Promise((resolve, reject) => {
      fs.readFile(this.path, 'utf8', (error, data) => {
        if (error) {
          if (error.code === 'ENOENT') {
            resolve([]);
          } else {
            reject(error);
          }
        } else {
          try {
            resolve(JSON.parse(data));
          } catch (parseError) {
            reject(parseError);
          }
        }
      });
    });
  }

  async saveProductsToFile(products) {
    return new Promise((resolve, reject) => {
      fs.writeFile(this.path, JSON.stringify(products, null, 2), (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }
}


const productManager = new ProductManager('products.json');

(async () => {
  try {
    await productManager.addProduct({
      title: 'Gaseosa',
      description: 'Coca Cola 2lts',
      price: 450,
      thumbnail: 'imagen1.jpg',
      code: 'P1',
      stock: 10,
    });

    const allProducts = await productManager.getProducts();
    console.log('Todos los productos:', allProducts);

    const productToUpdate = await productManager.getProductById(1);
    if (productToUpdate) {
      const updatedProduct = await productManager.updateProduct(1, { price: 24.99 });
      console.log('Producto actualizado:', updatedProduct);
    } else {
      console.log('Producto no encontrado.');
    }

    await productManager.deleteProduct(1);

    const remainingProducts = await productManager.getProducts();
    console.log('Productos restantes:', remainingProducts);
  } catch (error) {
    console.error('Error:', error);
  }
})();



