import { productos } from "./stock.js";

// Array vacio para los productos
let carrito = [];

const itemsEnCarrito = document.getElementById('carrito-items');

export function agregarAlCarrito(id) {
    const item = productos.find((producto) => producto.id === id)

    carrito.some((item) => item.id === id) ? item.cantidad++ : carrito.push(item);
    
    localStorage.setItem('carritoLocal', JSON.stringify(carrito))

    actualizarCarrito();
}
// Condicional para llamar a los productos guardados en el localStorage
if (localStorage.getItem('carritoLocal')) {
    carrito = JSON.parse(localStorage.getItem('carritoLocal'))
}

actualizarCarrito();

function actualizarCarrito() {
    productosEnCarrito();
}

// Funcion para agregar los items mediante uso del DOM
function productosEnCarrito() {
    itemsEnCarrito.innerHTML = "";
    carrito.forEach((producto) => {
        itemsEnCarrito.innerHTML += `
 <ul class="item-carrito">
 <li class="item-info">
     <img src="${producto.img}" alt="${producto.nombre}">
     <h4>${producto.nombre}</h4>
 </li>
 <li class="precioUnitario">
     <h5>$</h5>${producto.precio}
 </li>
 <li class="cantidades">
     <a id=btnMas>+</a>
     <div id= btnNumero>${producto.cantidad}</div>
     <a id=btnMenos>-</a>
 </li>
</ul>`;
    });
}







