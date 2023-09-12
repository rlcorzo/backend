
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
  