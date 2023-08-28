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
        document.getElementById('all-products').addEventListener('click', function (event) {
            if (event.target.classList.contains('product-btn')) {
                agregarAlCarrito(event);
            }
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
            const tituloElement = producto.querySelector('.product-title');
            const titulo = tituloElement.textContent.trim();
            const precioTexto = producto.querySelector('.product-price').textContent;
            const precio = parseInt(precioTexto.replace('$', '').replace(/\./g, ''));
    
            if (carritoProductos[titulo]) {
                carritoProductos[titulo].cantidad++;
            } else {
                carritoProductos[titulo] = {
                    cantidad: 1,
                    precio: precio
                };
            }
    
            actualizarCarrito();

            setTimeout(() => {
                toggleCarrito();
            }, 100);
        }
    }
    

    function eliminarElemento(e) {
        if (e.target.classList.contains('delete')) {
            const fila = e.target.closest('tr');
            const tituloElement = fila.querySelector('td:nth-child(1)');
            const productoNombre = tituloElement.textContent.trim();
            const titulo = productoNombre.split(' x')[0];

            if (carritoProductos[titulo]) {
                if (carritoProductos[titulo].cantidad > 1) {
                    carritoProductos[titulo].cantidad--;
                } else {
                    delete carritoProductos[titulo];
                }

                actualizarCarrito();
                fila.remove();
            }
        }
        e.preventDefault();
        e.stopPropagation();
    }

    function vaciarCarrito() {
        carritoProductos = {};
        actualizarCarrito();
    }

    function actualizarCarrito() {
        lista.innerHTML = '';
        let total = 0;

        for (const producto in carritoProductos) {
            const { cantidad, precio } = carritoProductos[producto];

            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>
                    ${producto}
                    <input
                        type="number"
                        class="cantidad-input"
                        min="1"
                        max="5"
                        value="${cantidad}"
                    />
                </td>
                <td>
                    $${formatNumber(precio * cantidad)}
                </td>
                <td><a href="#" class="delete">X</a></td>
            `;

            total += precio * cantidad;
            lista.appendChild(fila);

            fila.querySelector('.cantidad-input').addEventListener('change', (e) => {
                const nuevaCantidad = parseInt(e.target.value);
                carritoProductos[producto].cantidad = nuevaCantidad;
                actualizarCarrito();
            });
        }

        const totalElement = document.getElementById('total');
        totalElement.textContent = `Total: $${formatNumber(total)}`;
    }

    function formatNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
});
