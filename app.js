const API_URL = 'https://fakestoreapi.com/products';
const productList = document.getElementById('product-list');
const form = document.getElementById('product-form');
const getButton = document.getElementById('get-products-btn');

let productsArray = []; 

getButton.addEventListener('click', async () => {
    try {
        getButton.textContent = 'Загрузка...';
        getButton.disabled = true;

        const response = await fetch(API_URL);
        productsArray = await response.json();
        
        renderProducts(productsArray);
        
        getButton.textContent = 'Загрузить все товары';
        getButton.disabled = false;
    } catch (error) {
        console.error(error);
        getButton.textContent = 'Ошибка! Повторить';
        getButton.disabled = false;
    }
});

function renderProducts(products) {
    productList.innerHTML = '';
    
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product-card';
        productDiv.innerHTML = `
            <h3>${product.title}</h3>
            <p><strong>Цена:</strong> $${product.price}</p>
            <p><strong>Категория:</strong> ${product.category}</p>
            <img src="${product.image}" alt="Изображение товара">
            <br>
            <button class="btn-delete" onclick="deleteProduct(${product.id})">Удалить</button>
        `;
        productList.appendChild(productDiv);
    });
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const newProductData = {
        title: document.getElementById('title').value,
        price: parseFloat(document.getElementById('price').value),
        description: document.getElementById('description').value,
        category: document.getElementById('category').value,
        image: document.getElementById('image').value
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newProductData)
        });
        const createdProduct = await response.json();
        
        createdProduct.id = Date.now(); 

        productsArray.unshift(createdProduct); 
        
        renderProducts(productsArray);
        
        form.reset();
    } catch (error) {
        console.error(error);
    }
});

async function deleteProduct(id) {
    if (!confirm('Удалить этот товар?')) return;

    try {
        await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        
        productsArray = productsArray.filter(product => product.id !== id);
        
        renderProducts(productsArray);
        
    } catch (error) {
        console.error(error);
    }
}
