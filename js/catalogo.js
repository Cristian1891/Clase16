let contenedor = document.getElementById("contenedor");



fetch('/json/productos.json')
    .then( (res) => res.json())
    .then( (data) => {
        data.forEach((prod) => {
            let {id, nombre, precio, img} = prod
            contenedor.innerHTML +=  `
            <div class="card border-primary mb-3 text-center" style="max-width: 15rem; margin:4px">
                <div class="card-header name" style="max-width: 15rem; margin:4px">${nombre}</div>
                <img src="../img/hamburguesas/${img}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h4 class="card-title">$${precio}</h4>
                    <button class="btn btn-primary my-3 agregar-carrito" data-id="${id}">Agregar al carrito</button>
                </div>
            </div>
            
            `
        })
    })
    .catch((error) => {
        console.log(error)
        Swal.fire({
            imageUrl: '../img/logo.png',
            imageHeight: 80,
            imageWidth: 80,
            background: '#be1e24',
            width: 300,
            title: `<h5 class="text-warning">No se pudo realizar la carga del los productos. Intente nuevamente.</h5>`,
            showConfirmButton: true,
          })
    });
    
