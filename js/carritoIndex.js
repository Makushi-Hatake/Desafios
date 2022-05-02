import { productos } from "./stock.js";

// Array vacio para los productos
let carrito = [];

const itemsEnCarrito = document.getElementById('carrito-items');
const subTotalCarrito = document.getElementById('subTotal');

export function agregarAlCarrito(id) {
    const item = productos.find((producto) => producto.id === id)

    carrito.some((item) => item.id === id) ? item.cantidad++ : carrito.push(item);
    
    localStorage.setItem('carritoLocal', JSON.stringify(carrito))

    actualizarCarrito();
}
// Condicional para recuperar los productos guardados en el localStorage al actualiazar la página
localStorage.getItem('carritoLocal') ? carrito = JSON.parse(localStorage.getItem('carritoLocal')) : []

actualizarCarrito();


function actualizarCarrito() {
    productosEnCarrito();
    mostrarTotal();
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
     <div id=numero>${producto.cantidad}</div>
    <a><i id=btnMenos class="fas fa-minus-circle"></i></a>
 </li>
</ul>
`;

    });
}

// Funcion para mostrar el total items y valor de la compra

function mostrarTotal(){
    let subTotal = 0,
        itemsTotal = 0;
    carrito.forEach((producto) => {
        subTotal += producto.precio * producto.cantidad;
        itemsTotal += producto.cantidad;
    });
    subTotalCarrito.innerHTML = `Subtotal (${itemsTotal} items): $${subTotal}`;
}







