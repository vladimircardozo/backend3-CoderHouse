async function fetchProducts() {
    try {
        const response = await fetch('http://localhost:8080/');
        if (!response.ok) {
            throw new Error('Error al obtener los productos');
        }

        const products = await response.json();
        const productsContainer = document.getElementById('products');

        products.forEach(product => {
            const productCard = `
            <div class="col-md-4 mb-3">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text">${product.description}</p>
                        <p class="card-text">${product.price}</p>
                        <button class="btn btn-primary">Agregar al carrito</button>
                    </div>
                </div>
            </div>
            `;
            productsContainer.innerHTML += productCard;
        })

    } catch (error) {
        console.error('Error:', error);
    }
}

fetchProducts();