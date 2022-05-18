// import { mostrarProductos } from "./app.js";
import { productos } from "./stock.js";
import { actualizarCarrito } from "./actualizarCarrito.js";

// Array vacio para los productos
let carrito = [];

// Variables 
const itemsEnCarrito = document.querySelector('#carrito-items tbody');
const subTotalCarrito = document.getElementById('carrito-footer');

//Listeners

document.addEventListener('DOMContentLoaded', () => {
    carrito = JSON.parse(localStorage.getItem('carrito-local')) || [];
    productosEnCarrito();
    mostrarTotal();
})

// Funcion para agregar productos al carrito
export function agregarAlCarrito(id) {
    const item = productos.find((producto) => producto.id === id)

    carrito.some((item) => item.id === id) ? item.cantidad++ : carrito.push(item);

    sincronizarStorage();
    actualizarCarrito();
}

// Funcion para agregar los items mediante uso del DOM
export function productosEnCarrito() {

    itemsEnCarrito.innerHTML = '';

    carrito.forEach((producto) => {
        const row = document.createElement('tr');
        row.className = "item-carrito";
        row.setAttribute("id", `item${producto.id}`);
        row.innerHTML = `
     <td><img src="${producto.img}" alt="${producto.nombre}"></td>
     <td><h5>${producto.nombre}</h5></td> 
     <td>$${producto.precio}</td>
     <td id="numero">${producto.cantidad}</td>
     <td><a><i class="fas fa-minus-circle" id=btnMenos${producto.id}></i></a></td>
`;
        itemsEnCarrito.appendChild(row)

        const btnRestar = document.getElementById(`btnMenos${producto.id}`);
        btnRestar.addEventListener("click", () => {
            restarCarrito(producto.id);
            mostrarTotal();
        });

    });
    sincronizarStorage();
}

//Funcion para sincronizar el LocalStorage

function sincronizarStorage() {

    localStorage.setItem('carrito-local', JSON.stringify(carrito));
}

// Funcion para mostrar el total de items,valor de la compra y vaciar carrito.
export function mostrarTotal() {
    let subTotal = 0,
        itemsTotal = 0;
    carrito.forEach((producto) => {
        subTotal += producto.precio * producto.cantidad;
        itemsTotal += producto.cantidad;
    });
    subTotalCarrito.innerHTML = `
    <tr id="carritoFooterItems">
    <td id="vaciarCarrito">Vaciar Carrito</td>
    <td>Subtotal (${itemsTotal} items): $${subTotal}</td>
    <td id= finCompra>CHECKOUT</td>
    </tr>
    `;

    const vaciarCarrito = document.getElementById('vaciarCarrito');
        vaciarCarrito.addEventListener('click', () => {
            carrito = [];
            mostrarTotal();
            productosEnCarrito();
    });
    // const finCompra = document.getElementById('finCompra');
    // finCompra.addEventListener('click', () =>{
    //     mostrarModal();
    // });
}

const restarCarrito = (id) => {

    let item = carrito.find((producto) => producto.id === id);
    let indiceDeItem = carrito.indexOf(item);

    if (item.cantidad > 1) {
        item.cantidad -= 1;
        actualizarCarrito();
    } else {
        item.cantidad = 0;
        carrito.splice(indiceDeItem, 1);
        const itemHtml = document.querySelector('#carrito-items tbody');
        itemHtml.removeChild(itemHtml.children[0]);
        actualizarCarrito();
    }

}




//Acomodar el CCS
//Tratar de que todo se maneje se maneje con el localStorage para poder restar y tambien interacuar con el carro al resfrescar la pantalla
//Agregar una mini pasarela de pago o alguna otra interactividad con el usuario

