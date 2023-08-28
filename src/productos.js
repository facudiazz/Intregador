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
  new Producto(
    1,
    "img/ram.png",
    "Memoria RAM",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab illum iste officiis deserunt? Reprehenderit nesciunt dolorem similique sapiente consectetur optio ea non! Optio quos iusto hic ea, aut aliquam beatae!",
    12699
  ),
  new Producto(
    2,
    "img/ZEUS-X.png",
    "Auriculares ZEUS X",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab illum iste officiis deserunt? Reprehenderit nesciunt dolorem similique sapiente consectetur optio ea non! Optio quos iusto hic ea, aut aliquam beatae!",
    42500
  ),
  new Producto(
    3,
    "img/KUMARA.png",
    "Teclado Redragon Kumara",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab illum iste officiis deserunt? Reprehenderit nesciunt dolorem similique sapiente consectetur optio ea non! Optio quos iusto hic ea, aut aliquam beatae!",
    59999
  ),
  new Producto(
    4,
    "img/4090.png",
    "Placa de video RTX 4090",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab illum iste officiis deserunt? Reprehenderit nesciunt dolorem similique sapiente consectetur optio ea non! Optio quos iusto hic ea, aut aliquam beatae!",
    2585999
  ),
];

function agregarCards() {
  const container = document.getElementById("all-products");

  productos.forEach((producto) => {
    const card = document.createElement("div");
    card.className = "product";
    
    const formattedPrice = formatNumber(producto.precio);

    card.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.titulo}" />
      <div class="info">
        <h4 class="product-title">${producto.titulo}</h4>
        <p class="product-info">${producto.descripcion}</p>
        <p class="product-price">$${formattedPrice}</p>
        <div class="button">
          <a class="product-btn" data-id="${producto.id}" data-img-src>Agregar al carrito</a>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

window.onload = agregarCards;
