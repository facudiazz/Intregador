document.addEventListener('DOMContentLoaded', () => {
    const carrito = document.getElementById('cart');
    const carritoIcono = document.getElementById('cart-img');
    const lista = document.getElementById('cart-items');
    const vaciarCarritoBtn = document.getElementById('cart-clear');
    let carritoAbierto = false;
    let carritoProductos = {}; 

    cargarEventListeners();

    function cargarEventListeners() {
        carritoIcono.addEventListener('click', toggleCarrito);
        document.addEventListener('click', manejarClic);
        document.querySelectorAll('.product-btn').forEach(btn => {
            btn.addEventListener('click', agregarAlCarrito);
        });
        lista.addEventListener('click', eliminarElemento);
        vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
    }

    function toggleCarrito() {
        carritoAbierto = !carritoAbierto;
        carrito.classList.toggle('abierto', carritoAbierto);
    }

    function manejarClic(e) {
        if (!carrito.contains(e.target) && !carritoIcono.contains(e.target)) {
            carritoAbierto = false;
            carrito.classList.remove('abierto');
        }
    }

    function agregarAlCarrito(e) {
        if (e.target.classList.contains('product-btn')) {
            const producto = e.target.closest('.product');
            const titulo = producto.querySelector('.product-title').textContent;
            const precioTexto = producto.querySelector('.product-price').textContent.replace('$', '');
            const precio = parseFloat(precioTexto.replace('.', '')); 

            if (carritoProductos[titulo]) {
                carritoProductos[titulo].cantidad++;
            } else {
                carritoProductos[titulo] = {
                    cantidad: 1,
                    precio: precio
                };
            }

            actualizarCarrito();
        }
    }

    function eliminarElemento(e) {
        if (e.target.classList.contains('delete')) {
            const fila = e.target.closest('tr');
            const titulo = fila.querySelector('td:nth-child(1)').textContent.split(' x')[0];
            
            if (carritoProductos[titulo].cantidad > 1) {
                carritoProductos[titulo].cantidad--;
            } else {
                delete carritoProductos[titulo];
            }

            actualizarCarrito();
            fila.remove();
        }
        e.preventDefault();
        e.stopPropagation();
    }

    function vaciarCarrito() {
        carritoProductos = {};
        actualizarCarrito();
        carritoAbierto = false;
        carrito.classList.remove('abierto');
    }

    function actualizarCarrito() {
        lista.innerHTML = '';
        let total = 0;
        for (const producto in carritoProductos) {
            const { cantidad, precio } = carritoProductos[producto];
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${producto} x${cantidad}</td>
                <td>$${(precio * cantidad).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                <td><a href="#" class="delete">X</a></td>
            `;
            total += precio * cantidad;
            lista.appendChild(fila);
        }
        const totalElement = document.getElementById('total');
        totalElement.textContent = `Total: $${total.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
});
