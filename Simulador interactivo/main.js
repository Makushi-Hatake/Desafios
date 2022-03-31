//Carro de Compras

let total = 0;
let precio = 0;
let otroProducto = false;
class producto{
    constructor (id, name, price){
        this.id = id;
        this.name = name;
        this.price = parseInt(price);
    }
}
const productos = [];
productos.push(new producto (1,"Remera", 800));
productos.push(new producto (2,"Pantalon", 1000));
productos.push(new producto (3,"Gorra", 500));

function agregarAlCarrito(){
    do {
        alert("Lista de precios: \nRemera $800 \nPantalon $1000 \nGorra $500");
        let producto = parseInt(prompt("Ingresa el número del producto a comprar: \n1-Remera \n2-Pantalon \n3-Gorra","Ejemplo: 1 para elejir Remera")); //Pertime al usuario elejir el item mediante un número.
        let cantidad = prompt("Que cantidad quieres comprar?", 0);
       
        switch (producto){
            case productos[0].id:
                precio = 800;
                subtotal = precio * cantidad;   //Realiza un producto entre el precio y la cantidad del item seleccionado.
                alert("Agregaste "+ cantidad + " Remera/s de $800. Suman " + "$" + subtotal + " a tu compra."); //Informa el subtotal del item seleccionado.
                break;
            case productos[1].id:
                precio = 1000;
                subtotal = precio * cantidad;
                alert("Agregaste "+ cantidad + " Pantalon/es de $1000. Suman " + "$" + subtotal + " a tu compra.");
                break;
            case productos[2].id:
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


