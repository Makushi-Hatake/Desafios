import { productos } from "./stock.js";

let carritoDeCompras = [];

export const carritoIndex = (productoId) => {

    const contenedorCarrito = document.getElementById('contenedor-carrito');

    const renderProductosCarrito = () => {
        let producto = productos.find( producto => producto.id == productoId );
        carritoDeCompras.push(producto);

       producto.cantidad = 1;

       let div = document.createElement('div');
       div.classList.add('productoEnCarrito');
       div.innerHTML = `<p>${producto.nombre}</p>
                        <p>Precio: ${producto.precio}</p>
                        <p id="cantidad${producto.id}">Cantidad: ${producto.cantidad}</p>
       `;
       contenedorCarrito.appendChild(div);

    }

    renderProductosCarrito();
}