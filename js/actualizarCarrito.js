import { mostrarTotal, productosEnCarrito, recuperarCarrito  } from "./carritoIndex.js";

export function actualizarCarrito() {
    productosEnCarrito();
    mostrarTotal();
    recuperarCarrito();
}