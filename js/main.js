
const buscar = document.getElementById("buscar");
const busqueda = document.getElementsByTagName("p");
const input = document.getElementById("ingreso");
const form = document.querySelector("form");
const contenedorProductos = document.getElementById("contenedorVino")
const verCarrito = document.getElementById("verCarrito");
const contenedorLista = document.getElementById("contenedor-lista");
const contadorCarrito = document.getElementById("contador-carrito");
const botonVaciar = document.getElementById('vaciar-carrito')
const botonComprar = document.getElementsByClassName('boton-agregar')

Swal.fire('Bienvenido a la mejor vinoteca de Buenos Aires!, Recuerda que tienes que ser mayor de 18 años para comprar nuestros productos.')
   
  
//   //            creando carrito y aplicando guardado local     //
        let carrito = [];
        document.addEventListener('DOMContentLoaded', () => {
        if (localStorage.getItem('carrito')){
         carrito = JSON.parse(localStorage.getItem('carrito'))
         actualizarCarrito()
     }
 })
// //                   boton eliminacion del carrito  

 botonVaciar.addEventListener('click',() =>{
   Swal.fire({
     title: 'Seguro que quieren eliminarlos?',
     showDenyButton: true,
     showCancelButton: true,
     confirmButtonText: 'Si',
     denyButtonText: `no`,
   }).then((result) => {
     if (result.isConfirmed) {
       Swal.fire({
           icon: 'success',
           title: 'Hemos eliminado tus productos!',
           text: 'Tu carrito esta vacio!',
           })
           carrito.length = 0
           localStorage.clear()
           actualizarCarrito()
    } 
     else if (result.isDenied) {
       Swal.fire('No se han borrado tus productos', '', 'info')
     }
   })      
 })
 //                         *******        HTML        *******
const zonaProductos = (arr) => {
  let html;
  for (const item of arr) {
    const { id, nombre, img, precio } = item;

    html = `
      <div class="cards">
        <img src="../img/${img}">
        <h3>${nombre.toUpperCase()}</h3>
        <p class = "precioProducto">$${precio}</p>
        <button class="boton-agregar">Comprar</button>
      </div>
     `;
    contenedorProductos.innerHTML += html;
    
  }
};
//         ***************sacando los productos del data y traerlos al main *******
const extraer = async () =>{
const  response = await fetch('./js/data.json');

const data = await response.json();
zonaProductos(data)
}
extraer()

              //             click carrito para mostrar //
 const mostrarcarrito = () =>{
   document.getElementById("contenedor-lista").style.display ="inline-block";
 }
  verCarrito.addEventListener("click",()=>{
    mostrarcarrito();
  })
 //                           push al carrito
 const agregarAlCarrito = (prodId) => {

   const items = extraer.find(prod => prod.id === prodId)

       carrito.push(items)
       actualizarCarrito()
      
   }

//                            lista productos  //////
 
 const actualizarCarrito = () => {
     contenedorLista.innerHTML = ""

   carrito.forEach((prod) => {
     const div = document.createElement('div')
     div.className = ('listaProductos')
     div.innerHTML = `
     <img src="${prod.img}">
     <p>${prod.nombre}</p>
     <p>Precio:$${prod.precio}</p>
    
     `

     contenedorLista.appendChild(div)
    
   localStorage.setItem('carrito',JSON.stringify(carrito))
  

   })

//                          contador a pagar
   contadorCarrito.innerText = carrito.length;
   const total = carrito.reduce((acc , el) => acc + el.precio,0);

      const totalProductos = document.createElement("div")
      totalProductos.className = "totalProductos"
      totalProductos.innerHTML = `
        <h3>Total a pagar: $ ${total}
    `;
      contenedorLista.append(totalProductos);
    
   
// //                  boton salir de la lista   
      const listaButton = document.createElement("h1")
      listaButton.innerText = "x";
      listaButton.className = "listaButton";
   
   
      listaButton.addEventListener("click",() => {
           contenedorLista.style.display = "none"
      });
   
      contenedorLista.append(listaButton);
  
}



  
  