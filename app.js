const API_URL = 'https://fakestoreapi.com/products';
const productList = document.getElementById('product-list');
const form = document.getElementById('product-form');

async function fetchProducts() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        renderProducts(data);
    } catch (error) {
        console.error('Ошибка при загрузке товаров:', error);
    }
}

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
            <button onclick="editProduct(${product.id})">Редактировать</button>
            <button onclick="deleteProduct(${product.id})">Удалить</button>
        `;
        productList.appendChild(productDiv);
    });
}

async function editProduct(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        const product = await response.json();
        

        document.getElementById('product-id').value = product.id;
        document.getElementById('title').value = product.title;
        document.getElementById('price').value = product.price;
        document.getElementById('description').value = product.description;
        document.getElementById('category').value = product.category;
        document.getElementById('image').value = product.image;
        
        window.scrollTo(0, 0); 
    } catch (error) {
        console.error('Ошибка при получении товара:', error);
    }
}


form.addEventListener('submit', async (e) => {
    e.preventDefault(); 

    const id = document.getElementById('product-id').value;
    const productData = {
        title: document.getElementById('title').value,
        price: parseFloat(document.getElementById('price').value),
        description: document.getElementById('description').value,
        category: document.getElementById('category').value,
        image: document.getElementById('image').value
    };

    try {
        if (id) {
           
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productData)
            });
            const updatedProduct = await response.json();
            console.log('Товар обновлен:', updatedProduct);
            alert('Товар успешно обновлен (симуляция)');
        } else {

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productData)
            });
            const newProduct = await response.json();
            console.log('Товар создан:', newProduct);
            alert(`Товар успешно создан с ID: ${newProduct.id} (симуляция)`);
        }
        
        form.reset(); 
        document.getElementById('product-id').value = '';
        

        
    } catch (error) {
        console.error('Ошибка при сохранении товара:', error);
    }
});


async function deleteProduct(id) {
    if (!confirm('Вы уверены, что хотите удалить этот товар?')) return;

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        const deletedProduct = await response.json();
        console.log('Товар удален:', deletedProduct);
        alert('Товар удален (симуляция)');
        

    } catch (error) {
        console.error('Ошибка при удалении:', error);
    }
}


fetchProducts();
