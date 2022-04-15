import { productos } from "./stock.js";


let carrito = [];
const itemsEnCarrito = document.getElementById('carrito-items');

export function agregarAlCarrito(id) {
    if (carrito.some((item) => item.id === id)) {
        alert("El producto ya esta en el carrito")
    }
    const item = productos.find((producto) => producto.id === id)
        carrito.push(item);
    
    actualizarCarrito();
}

function actualizarCarrito() {
    productosEnCarrito();
}

function productosEnCarrito(){
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

