class Producto {
    constructor(id, imagen, titulo, descripcion, precio) {
      this.id = id;
      this.imagen = imagen;
      this.titulo = titulo;
      this.descripcion = descripcion;
      this.precio = precio;
    }
  }
  
  const productos = [
    new Producto(1, "img/ram.png", "Memoria RAM", "Descripción de la RAM", 12699),
    new Producto(2, "img/ZEUS-X.png", "Auriculares ZEUS X", "Descripción de los auriculares", 42500),

  ];
  
  function agregarCards() {
    const container = document.getElementById("all-products");
  
    productos.forEach(producto => {
      const card = document.createElement("div");
      card.className = "product";
      card.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.titulo}" />
        <div class="info">
          <h4 class="product-title">${producto.titulo}</h4>
          <p class="product-info">${producto.descripcion}</p>
          <p class="product-price">$${producto.precio.toFixed(2)}</p>
          <div class="button">
            <a class="product-btn" data-id="${producto.id}" data-img-src>Agregar al carrito</a>
          </div>
        </div>
      `;
  
      container.appendChild(card);
    });
  }

  window.onload = agregarCards;
  