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
productos.push(new producto (1,"Remera", 800,));
productos.push(new producto (2,"Pantalon", 1000,));
productos.push(new producto (3,"Gorra", 500,));

const carroDeCompras = [];
class comprado {
    constructor (id,cantidad,price){ 
    this.id = id;
    this.cantidad = cantidad;
    this.price = price;
     }
}

function comprando(){
    do {
        alert("Lista de precios: \nRemera $800 \nPantalon $1000 \nGorra $500");
        let producto = parseInt(prompt("Ingresa el número del producto a comprar: \n1-Remera \n2-Pantalon \n3-Gorra","Ejemplo: 1 para elejir Remera"));
        let cantidad = prompt("Que cantidad quieres comprar?", 0);
        
        switch (producto){
            case productos[0].id:
                item = productos[0].name;
                precio = productos[0].price;
                subtotal = precio * cantidad;
                if (cantidad != 0){
                    carroDeCompras.push(new comprado (item,cantidad,subtotal));
                } 
                alert("Agregaste "+ cantidad + " Remera/s de $800. Suman " + "$" + subtotal + " a tu compra.");
                
                break;
            case productos[1].id:
                item = productos[1].name;
                precio = productos[1].price;
                subtotal = precio * cantidad;
                if (cantidad != 0){
                    carroDeCompras.push(new comprado (item,cantidad,subtotal));
                } 
                alert("Agregaste "+ cantidad + " Pantalon/es de $1000. Suman " + "$" + subtotal + " a tu compra.");
                break;
            case productos[2].id:
                item = productos[2].name;
                precio = productos[2].price;
                subtotal = precio * cantidad;
                if (cantidad != 0){
                    carroDeCompras.push(new comprado (item,cantidad,subtotal));
                } 
                alert("Agregaste "+ cantidad + " Gorra/s de $500. Suman " + "$" + subtotal + " a tu compra.");      
                break;
        }
        total = total + precio * cantidad;
        alert("LLevas un total de " + "$"+ total + " hasta el momento.");
        otroProducto = confirm ("Queres agregar otro producto?");
    } while (otroProducto);
    alert("El Total de tu compra es de " + "$"+total+".");
}

comprando();

const facturaCompra = carroDeCompras.map((el) => {
    return {
        item : el.id,
        cantidad : el.cantidad,
        precio : el.price
    }
})
console.log(facturaCompra);
   








