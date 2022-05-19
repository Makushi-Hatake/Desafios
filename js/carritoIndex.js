// import { mostrarProductos } from "./app.js";
import { productos } from "./stock.js";
import { actualizarCarrito } from "./actualizarCarrito.js";

// Array vacio para los productos
let carrito = [];

// Variables 
const itemsEnCarrito = document.querySelector('#carrito-items tbody');
const subTotalCarrito = document.getElementById('carrito-footer');
const modalCheckout = document.querySelector('.modalCheckout');

//Listeners
document.addEventListener('DOMContentLoaded', () => {
    carrito = JSON.parse(localStorage.getItem('carrito-local')) || [];
    productosEnCarrito();
    footerCarrito();
    mostrarEnModal();
});
const btnCerrarModal = document.getElementById('btnCerrar');
    btnCerrarModal.addEventListener('click', ()=>{
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
    finCompra.addEventListener('click', () =>{
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
    }
}

//Modal para finalizar la compra

const itemsCompra = document.querySelector('#modal-items tbody');

function mostrarEnModal(){

    itemsCompra.innerHTML = '';

    carrito.forEach((producto) =>{
    let subTotal = producto.precio * producto.cantidad
        const div = document.createElement('tr');
        div.innerHTML = `
        <td>${producto.nombre}</td>
        <td>$${subTotal}</td>
        `;
        itemsCompra.appendChild(div);
    })
    totalModal();

}
//Funcion que calcula el total de la compra
const totalCompra = document.getElementById('total-modal');

const totalModal = () =>{

    carrito = JSON.parse(localStorage.getItem('carrito-local'))

    let total = carrito.reduce((acc, producto) => acc + producto.cantidad * producto.precio, 0);
    console.log(total);
    totalCompra.innerHTML = `<h3>Total a pagar: $${total}</h3>`;
    
    sincronizarStorage();
}

//Funcion para agregar el costo de envio

const selectorEnvio = document.getElementsByName('flexRadioDefault');
const envioTotal = document.getElementById('total-envio');

selectorEnvio.forEach((radio) =>{
    radio.addEventListener('change', () => {

        switch (radio.value) {
            case "0":
                envioTotal.innerText = 'Costo de Envio: $0';
                break;
            case "500":
                envioTotal.innerText =  'Costo de Envio $500';
                    break;
            default:
                break;
        }
    });
});
        
//VER LA MANAERA DE QUE SE MUESTRE EL TOTAL DE LA COMPRA MAS EL ENVIO EN EL H3 DE TOTAL A PAGAR



