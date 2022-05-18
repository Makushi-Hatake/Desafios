// import { mostrarProductos } from "./app.js";
import { productos } from "./stock.js";
import { actualizarCarrito } from "./actualizarCarrito.js";



// Array vacio para los productos
let carrito = [];

// Variables 
const itemsEnCarrito = document.querySelector( '#carrito-items tbody');
const subTotalCarrito = document.getElementById('subTotal');


// Funcion para agregar productos al carrito
export function agregarAlCarrito(id) {
    const item = productos.find((producto) => producto.id === id)

    carrito.some((item) => item.id === id) ? item.cantidad++ : carrito.push(item);
    localStorage.setItem('carritoLocal', JSON.stringify(carrito))

    actualizarCarrito();
}



    
// Funcion para agregar los items mediante uso del DOM
export function productosEnCarrito() {

    itemsEnCarrito.innerHTML= '';

    carrito.forEach((producto) => {
        const row = document.createElement('tr');
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

}

// Funcion para mostrar el total de items y valor de la compra
export function mostrarTotal(){
    let subTotal = 0,
        itemsTotal = 0;
    carrito.forEach((producto) => {
        subTotal += producto.precio * producto.cantidad;
        itemsTotal += producto.cantidad;
    });
    subTotalCarrito.innerHTML = `Subtotal (${itemsTotal} items): $${subTotal}`;
}

const restarCarrito = (id) => {

    let item = carrito.find((producto) => producto.id === id);
    
    if (item.cantidad > 1) {
        item.cantidad -= 1;
        actualizarCarrito();
      }
 
}

// Condicional para recuperar los productos guardados en el localStorage al actualiazar la página
localStorage.getItem('carritoLocal') ? carrito = JSON.parse(localStorage.getItem('carritoLocal')) : [];

//Acomodar el CCS
//Tratar de que todo se maneje se maneje con el localStorage para poder restar y tambien interacuar con el carro al resfrescar la pantalla
//Agregar una mini pasarela de pago o alguna otra interactividad con el usuario

