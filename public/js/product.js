const socket = io(); // Conecta al servidor WebSocket automáticamente

async function fetchProducts() {
    try {
        const response = await fetch('http://localhost:8080/'); // Asegúrate de que coincide con tu ruta backend
        if (!response.ok) {
            throw new Error('Error al obtener los productos');
        }

        const products = await response.json();
        renderProducts(products);
    } catch (error) {
        console.error('Error:', error);
    }
}

function renderProducts(products) {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = ""; // Limpia el contenedor antes de agregar los nuevos productos

    products.forEach((product) => {
        const productCard = `
            <div class="col-md-4 mb-3">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text">${product.description}</p>
                        <p class="card-text"><strong>Precio:</strong> $${product.price}</p>
                        <button class="btn btn-primary">Agregar al carrito</button>
                    </div>
                </div>
            </div>
        `;
        productsContainer.innerHTML += productCard;
    });
}

// Escucha las actualizaciones en tiempo real desde el servidor
socket.on("actualizarProductos", (products) => {
    console.log("Productos actualizados:", products);
    renderProducts(products);
});

fetchProducts();
