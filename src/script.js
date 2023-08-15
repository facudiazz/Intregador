document.addEventListener('DOMContentLoaded', function () {
    const cartItems = [];
    const cartPreview = document.querySelector('.cart-preview');
    const totalAmount = document.querySelector('.total-price');
    const clearCartButton = document.querySelector('.clear-cart-btn');
    const addToCartButtons = document.querySelectorAll('.product-btn');
    const cartIcon = document.querySelector('.fa-cart-shopping');
  
    addToCartButtons.forEach(button => {
      button.addEventListener('click', addToCart);
    });
  
    cartIcon.addEventListener('click', toggleCartPreview);
  
    function addToCart(event) {
      const product = event.target.closest('.product');
      const productName = product.querySelector('.product-title').textContent;
      const productPrice = parseFloat(product.querySelector('.product-price').textContent.replace(/[$,.]/g, ''));
      const productImage = product.querySelector('img').getAttribute('src');
  
      const item = { name: productName, price: productPrice, image: productImage };
      cartItems.push(item);
  
      updateCartPreview();
    }
  
    function updateCartPreview() {
      const cartItemsPreview = document.querySelector('.cart-items-preview');
      cartItemsPreview.innerHTML = '';
  
      let totalPrice = 0;
  
      cartItems.forEach(item => {
        const li = document.createElement('li');
        li.className = 'cart-item'; // Agrega la clase 'cart-item' para estilos
        li.innerHTML = `
          <img src="${item.image}" alt="Product Image">
          <div class="cart-item-details">
            <span class="cart-item-name">${item.name}</span>
            <span class="cart-item-price">$${formatPrice(item.price)}</span>
            <button class="remove-item">Eliminar</button>
          </div>
        `;
  
        cartItemsPreview.appendChild(li);
        totalPrice += item.price;
      });
  
      totalAmount.textContent = `Total: $${formatPrice(totalPrice)}`;
      cartPreview.classList.add('visible');
    }
  
    function formatPrice(price) {
      return price.toLocaleString('es-AR', { minimumFractionDigits: 2 });
    }
  
    const removeButtons = document.querySelectorAll('.remove-item');
    removeButtons.forEach((button, index) => {
      button.addEventListener('click', () => removeFromCart(index));
    });
  
    clearCartButton.addEventListener('click', clearCart);
  
    function toggleCartPreview() {
      cartPreview.classList.toggle('visible');
    }
  
    function removeFromCart(index) {
      cartItems.splice(index, 1);
      updateCartPreview();
    }
  
    function clearCart() {
      cartItems.length = 0;
      updateCartPreview();
    }
  });
  