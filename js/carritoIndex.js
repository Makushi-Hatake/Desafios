// import { mostrarProductos } from "./app.js";
import { productos } from "./stock.js";
import { actualizarCarrito } from "./actualizarCarrito.js";



// Array vacio para los productos
let carrito = [];

// Variables 
const itemsEnCarrito = document.getElementById('carrito-items');
const subTotalCarrito = document.getElementById('subTotal');


// Funcion para agregar productos al carrito
export function agregarAlCarrito(id) {
    const item = productos.find((producto) => producto.id === id)

    carrito.some((item) => item.id === id) ? item.cantidad++ : carrito.push(item);

    carritoLocal();
    actualizarCarrito();
}



    
// Funcion para agregar los items mediante uso del DOM
export function productosEnCarrito() {

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
     <div id="numero">${producto.cantidad}</div>
 </li>
 <li>
 <a><i class="fas fa-minus-circle" id=btnMenos${producto.id}></i></a>
 </li>
</ul>
`;
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
    // let indiceDeItem = carrito.indexOf(item);
    
    if (item.cantidad > 1) {
        item.cantidad -= 1;
        actualizarCarrito();
      }
    // else {
    //     item.cantidad = 0;
    //     carrito.splice(indiceDeItem, 1);
    //     const itemHtml = document.getElementsByClassName(`item-carrito`);
    //     itemHtml.remove();
    //     actualizarCarrito();
    //   }

}

// Condicional para recuperar los productos guardados en el localStorage al actualiazar la página
// localStorage.getItem('carritoLocal') ? carrito = JSON.parse(localStorage.getItem('carritoLocal')) : [];

const carritoLocal = () => {
    carritoUpToStorage = JSON.stringify(carrito);
    localStorage.setItem("carritoLocal", carritoUpToStorage);
  };

export const recuperarCarrito = () => {
    carritoInStorage = localStorage.getItem("carritoLocal");
    carrito = JSON.parse(carritoInStorage);
  };