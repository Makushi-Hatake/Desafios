import { carritoIndex } from "./carritoIndex.js";
import { productos } from "./stock.js";


const mostrarProductos = (productos) =>{
    const contenedorProductos = document.getElementById("contenedor-productos");
    productos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML += `
                         <img src=${producto.img} class="card-img-top" alt="imgproducto"></img>
                         <div class="card-body">
                         <h5 class="card-title">${producto.nombre}</h5>
                         <p class="card-text">${producto.desc}</p>
                         <p class="card-text">${producto.talle}</p>
                         <p class="card-text">Precio: $ ${producto.precio}</p>
                         <a class="btn btn-primary" id=boton${producto.id}><i class="fas fa-cart-plus"></i></a>
                         </div>
                         `
        contenedorProductos.appendChild(div);
        const boton = document.getElementById(`boton${producto.id}`);
    boton.addEventListener('click', () => {
      carritoIndex(producto.id);
    })
    });
 
} 
mostrarProductos(productos);


