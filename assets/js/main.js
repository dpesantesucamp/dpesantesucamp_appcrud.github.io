const txtProducto = document.getElementById('txtProducto');
const txtCantidad = document.getElementById('txtCantidad');
const txtPrecio = document.getElementById('txtPrecio');
const tblProductos = document.getElementById('tblProductos');


let productos =  (localStorage.getItem("productos")) ? JSON.parse(localStorage.getItem("productos")) : [];
let cantidades = (localStorage.getItem("cantidades")) ? JSON.parse(localStorage.getItem("cantidades")) : [];
let precios = (localStorage.getItem("precios")) ? JSON.parse(localStorage.getItem("precios")) : [];

mostrarProductos();

function guardar(){
    console.log("Entro a guardar");
    const producto = txtProducto.value;
    const cantidad = txtCantidad.value;
    const precio = txtPrecio.value;
    productos.push(producto);
    cantidades.push(cantidad);
    precios.push(precio);
    console.log(productos);
    console.log(cantidades);
    console.log(precios);
    actualizarStorage();
    mostrarProductos();
    limpiarCajaTexto();
}

function limpiarCajaTexto()
{
    txtProducto.value = "";
    txtCantidad.value = "";
    txtPrecio.value = "";
}

function actualizarStorage()
{
    localStorage.setItem("productos",JSON.stringify(productos));
    localStorage.setItem("cantidades",JSON.stringify(cantidades));
    localStorage.setItem("precios",JSON.stringify(precios));
    mostrarProductos();
}

function mostrarProductos()
{
    if (productos.length === 0)
    {
        tblProductos.innerHTML = `<tr class="text-center font-weight-bold">
        <td colspan="4">NO HAY REGISTROS</td></tr>`;
    }else
    {
        tblProductos.innerHTML = "";
        for (const producto of productos)
        {            
            const tr = document.createElement("tr");
            const tdProducto = document.createElement("td");
            tdProducto.innerText = producto;
            tr.appendChild(tdProducto);
            tblProductos.appendChild(tr);

            const index = productos.indexOf(producto);
            const tdCantidad = document.createElement("td");
            tdCantidad.innerText = cantidades[index];
            tr.appendChild(tdCantidad);
            tblProductos.appendChild(tr);

            const tdPrecio = document.createElement("td");
            tdPrecio.innerText = precios[index];
            tr.appendChild(tdPrecio);
            tblProductos.appendChild(tr);

            const tdAcciones = document.createElement("td");
            const btnEliminar = document.createElement("button");
            btnEliminar.innerText = "Eliminar";
            btnEliminar.classList.add("btn","btn-danger");
            btnEliminar.onclick = () => eliminar(producto);
            tdAcciones.appendChild(btnEliminar);
            tr.appendChild(tdAcciones);

            const btnEditar = document.createElement("button");
            btnEditar.innerText = "Editar";
            btnEditar.classList.add("btn","btn-warning", "ml-2");
            btnEditar.onclick = () => editar(producto, cantidades[index], precios[index]);
            tdAcciones.appendChild(btnEditar);
            tr.appendChild(tdAcciones);
        }
        
    }
}

function eliminar(producto)
{
        const index = productos.indexOf(producto);
        productos.splice(index,1);
        cantidades.splice(index,1);
        precios.splice(index,1);
        actualizarStorage();
}

function editar(producto, cantidad, precio)
{
        const index = productos.indexOf(producto);
        const nuevo_nombre_producto = prompt(`Ingrese el nuevo nombre del item, 
        actual: ${producto}`);
        productos[index] = nuevo_nombre_producto;
        const nueva_cantidad = prompt(`Ingrese la nueva cantidad, 
        actual: ${cantidad}`);
        cantidades[index] = nueva_cantidad;
        const nuevo_precio = prompt(`Ingrese el nuevo precio, 
        actual: ${precio}`);
        precios[index] = nuevo_precio;
        actualizarStorage();
}