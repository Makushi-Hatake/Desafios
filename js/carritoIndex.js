import { productos } from "./stock.js";


let carrito = [];
const itemsEnCarrito = document.getElementById('carrito-items');

export function agregarAlCarrito(id) {
    const item = productos.find((producto) => producto.id === id)

    if (carrito.some((item) => item.id === id)) {
        item.cantidad += 1;

    } else {
        carrito.push(item);
        item.cantidad += 1;
    }

    localStorage.setItem('carritoLocal', JSON.stringify(carrito))

    actualizarCarrito();
}

if (localStorage.getItem('carritoLocal')) {
    carrito = JSON.parse(localStorage.getItem('carritoLocal'))
}
actualizarCarrito();

function actualizarCarrito() {
    productosEnCarrito();
}

function productosEnCarrito() {
    itemsEnCarrito.innerHTML = "";
    carrito.forEach((producto) => {
        itemsEnCarrito.innerHTML += `
 <div class="item-carrito">
 <div class="item-info">
     <img src="" alt="">
     <h5>${producto.nombre}</h5>
 </div>
 <div class="precioUnitario">
     <h5>$</h5>${producto.precio}
 </div>
 <div class="cantidades">
     <div class="btn menos">-</div>
     <div class="btn numero">${producto.cantidad}</div>
     <div class="btn mas">+</div>
 </div>
</div>`;
    });
}



