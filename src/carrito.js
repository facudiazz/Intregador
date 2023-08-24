document.addEventListener("DOMContentLoaded", function () {
    const cartOverlay = document.getElementById("cartOverlay");
    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");
    const closeCartBtn = document.getElementById("closeCartBtn");
    const clearCartBtn = document.getElementById("clearCartBtn");
    const cartIcon = document.querySelector(".fa-cart-shopping");
    const productButtons = document.querySelectorAll(".product-btn");
  
    let cart = [];
  
    function showCart() {
      cartOverlay.style.transform = "translateX(0)";
    }
  
    function hideCart() {
      cartOverlay.style.transform = "translateX(100%)";
    }
  
    function updateCart() {
      cartItems.innerHTML = "";
      let total = 0;
  
      cart.forEach((item) => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
          <img src="${item.image}" alt="${item.name}" />
          <div class="item-info">
            <h4>${item.name}</h4>
            <p>Precio: $${item.price}</p>
            <button class="remove-item-btn" data-id="${item.id}">Quitar</button>
          </div>
        `;
        cartItems.appendChild(cartItem);
        total += item.price;
      });
  
      cartTotal.textContent = `$${total.toFixed(2)}`;
    }
  
    function addToCart(product) {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      });
  
      updateCart();
      showCart();
    }
  
    function removeFromCart(id) {
      cart = cart.filter((item) => item.id !== id);
      updateCart();
    }
  
    productButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const productContainer = button.closest(".product");
        const productName = productContainer.querySelector(".product-title").textContent;
        const productPrice = parseFloat(productContainer.querySelector(".product-price").textContent.slice(1));
        const productImage = productContainer.querySelector("img").src;
  
        const product = {
          id: cart.length + 1,
          name: productName,
          price: productPrice,
          image: productImage,
        };
  
        addToCart(product);
      });
    });
  
    cartIcon.addEventListener("click", showCart);
    closeCartBtn.addEventListener("click", hideCart);
    clearCartBtn.addEventListener("click", function () {
      cart = [];
      updateCart();
    });
  
    cartItems.addEventListener("click", function (event) {
      if (event.target.classList.contains("remove-item-btn")) {
        const itemId = parseInt(event.target.getAttribute("data-id"));
        removeFromCart(itemId);
      }
    });
  
    document.addEventListener("click", function (event) {
      if (!cartOverlay.contains(event.target) && !cartIcon.contains(event.target)) {
        hideCart();
      }
    });
  });
  