import Product from "../data/mongo/models/product.model.js";

const setupSocket = (io) => {
  io.on("connection", async (socket) => {
    console.log("Nuevo cliente conectado ✔️");

    try {
      const products = await Product.find();
      socket.emit("actualizarProductos", products);
    } catch (error) {
      console.error("Error al obtener los productos", error);
    }

    socket.on("deleteProduct", async (productId) => {
      try {
        await Product.findByIdAndDelete(productId);
        const products = await Product.find();
        io.emit("actualizarProductos", products);
      } catch (error) {
        console.error("Error al eliminar el producto", error);
      }
    });

    socket.on("addProduct", async (newProduct) => {
      try {
        const productToAdd = await Product.create(newProduct);
        await productToAdd.save();
        const products = await Product.find();
        io.emit("actualizarProductos", products);
      } catch (error) {
        console.error("Error al agregar el producto", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("Cliente desconectado ❌");
    });
  });
};

export default setupSocket;