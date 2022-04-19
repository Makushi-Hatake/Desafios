import { productos } from "./stock.js";

// Array vacio para los productos
let carrito = [];

const itemsEnCarrito = document.getElementById('carrito-items');

// Funcion para agregar productos al carrito
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
// Condicional para llamar a los productos guardados en el localStorage
if (localStorage.getItem('carritoLocal')) {
    carrito = JSON.parse(localStorage.getItem('carritoLocal'))
}
actualizarCarrito();

// Funcion para actualizar el carrito con los productos seleccionados por el usuario
function actualizarCarrito() {
    productosEnCarrito();
}

// Funcion para agregar los items mediante uso del DOM
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



