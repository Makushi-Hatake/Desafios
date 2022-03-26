//Carro de Compras

let total = 0;
let precio = 0;
let otroProducto = false;
                
function agregarAlCarrito(){

    do {
        alert("Lista de precios: Remera $800 , Pantalon $1000, Gorra $500");
        let producto = prompt("Ingresa el número del producto a comprar: 1-Remera 2-Pantalon 3-Gorra",0); //Pertime al usuario elejir el item mediante un número.
        let cantidad = prompt("Que cantidad quieres comprar?", 0);
       
        switch (producto){
            case "1":
                precio = 800;
                subtotal = precio * cantidad;   //Realiza un producto entre el precio y la cantidad del item seleccionado.
                alert("Agregaste "+ cantidad + " Remera/s de $800. Suman " + "$" + subtotal + " a tu compra."); //Informa el subtotal del item seleccionado.
                break;
            case "2":
                precio = 1000;
                subtotal = precio * cantidad;
                alert("Agregaste "+ cantidad + " Pantalon/es de $1000. Suman " + "$" + subtotal + " a tu compra.");
                break;
            case "3":
                precio = 500;
                subtotal = precio * cantidad;
                alert("Agregaste "+ cantidad + " Gorra/s de $500. Suman " + "$" + subtotal + " a tu compra.");      
                break;
            default:
                alert("Alguno de los datos ingresados no son correctos");
                precio = 0;
                cantidad = 0;
        }
        
        total = total + precio * cantidad;
        alert("LLevas un total de " + "$"+ total + " hasta el momento.");
        otroProducto = confirm ("Queres agregar otro producto?");
    } while (otroProducto);
    alert("El Total de tu compra es de " + "$"+total+".");
}
agregarAlCarrito();


