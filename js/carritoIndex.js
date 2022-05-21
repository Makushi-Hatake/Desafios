// import { mostrarProductos } from "./app.js";
import { productos } from "./stock.js";
import { actualizarCarrito } from "./actualizarCarrito.js";

// Array vacio para los productos
let carrito = [];

// Selectores 
const itemsEnCarrito = document.querySelector('#carrito-items tbody');
const subTotalCarrito = document.getElementById('carrito-footer');
const modalCheckout = document.querySelector('.modalCheckout');
const selectorEnvio = document.getElementsByName('valor-envio');
const envioTotal = document.getElementById('total-envio');
const totalPagar = document.getElementById('total-modal');
const itemsCompra = document.querySelector('#modal-items tbody');


//Variables
let subTotal = 0;

//Listeners
document.addEventListener('DOMContentLoaded', () => {
    carrito = JSON.parse(localStorage.getItem('carrito-local')) || [];
    productosEnCarrito();
    footerCarrito();
    mostrarEnModal();
});
const btnCerrarModal = document.getElementById('btnCerrar');
btnCerrarModal.addEventListener('click', () => {
    modalCheckout.classList.toggle('modal-show')
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
     <td><a><i class="fas fa-minus-circle btnMenos" id=btnMenos${producto.id}></i></a></td>
        `;
        itemsEnCarrito.appendChild(row)

        const btnRestar = document.getElementById(`btnMenos${producto.id}`);
        btnRestar.addEventListener('click', () => {
            restarCarrito(producto.id);
            footerCarrito();
        });

    });
    sincronizarStorage();
}

//Funcion para sincronizar el LocalStorage

function sincronizarStorage() {

    localStorage.setItem('carrito-local', JSON.stringify(carrito));
}

// Funcion para mostrar el total de items,valor de la compra y vaciar carrito.
export function footerCarrito() {
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
        footerCarrito();
        productosEnCarrito();
    });
    const finCompra = document.getElementById('finCompra');
    finCompra.addEventListener('click', () => {
        modalCheckout.classList.toggle("modal-show");
        mostrarEnModal();
    });

}

//Funcion para restar unidades del carrito y/o eliminarlas.
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
        sincronizarStorage();

    }
}

//Modal para finalizar la compra


function mostrarEnModal() {

    itemsCompra.innerHTML = '';

    carrito.forEach((producto) => {
        let itemsComprados = producto.precio * producto.cantidad;
        const div = document.createElement('tr');
        div.innerHTML = `
        <td>${producto.nombre}</td>
        <td>$${itemsComprados}</td>
        `;
        itemsCompra.appendChild(div);
    })

    totalModal();
}

//Funcion que calcula el total de la compra

const totalModal = () => {

    carrito = JSON.parse(localStorage.getItem('carrito-local'))

    subTotal = carrito.reduce((acc, producto) => acc + producto.cantidad * producto.precio, 0);


    selectorEnvio.forEach((radio) => {
        radio.addEventListener('change', () => {
            switch (radio.value) {
                case "0":
                    envioTotal.innerText = `Costo de Envio: $ ${radio.value}`;
                    totalPagar.innerText = `Total a pagar $ ${subTotal + 0}`;
                    break;
                case "500":
                    envioTotal.innerText = `Costo de Envio: $ ${radio.value}`
                    totalPagar.innerText = `Total a pagar $ ${subTotal + 500}`;
                    break;
                default:
                    break;
            }
        });
    });

    sincronizarStorage();

}






