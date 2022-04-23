import { agregarAlCarrito } from "./carritoIndex.js";
import { productos } from "./stock.js";

// Funcion para mostrar el stock de productos mediante DOM
export const mostrarProductos = (productos) =>{
    const contenedorProductos = document.getElementById("contenedor-productos");
    productos.forEach(producto => {
        const div = document.createElement("div");
        div.innerHTML += `
        <div class="card" style="width: 18rem">
        <img src=${producto.img} class="card-img-top" alt="imgproducto"></img>
        <div class="card-body">
            <h5 class="card-title">${producto.nombre}</h5>
            <p id=item-desc class="card-text">${producto.desc}</p>
            <p class="card-text">Talle: ${producto.talle}</p>
            <p class="card-text">Precio: $ ${producto.precio}</p>
            <a class="btn btn-primary" id=boton${producto.id}><i class="fas fa-cart-plus"></i></a>
        </div>
        </div>
                         `
        contenedorProductos.appendChild(div);
        const boton = document.getElementById(`boton${producto.id}`);
    boton.addEventListener('click', () => {

        Toastify({
            text: "Agregado al Carrito!",
            className : "alert",
            duration: 1500, 
            position: "center",
            style: {
                background: "linear-gradient(to right, #AA076B, #61045F)",
            },
        }).showToast();
      agregarAlCarrito(producto.id);
    })
    });
 
} 
mostrarProductos(productos);


