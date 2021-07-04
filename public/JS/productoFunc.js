/* Variables globales */
const sectionDestacados = document.getElementById('divDestacado');
const sectionPcEscritorio = document.getElementById('divEscritorio');
const sectionNotebooks = document.getElementById('divNotebook');
const sectionConsolas = document.getElementById('divConsolas');

/* Esta función crea un nuevo artcle para el producto */
function crearNuevoArticulo(nuevoProducto, categoria) {

    const nuevoArticulo = document.createElement('article');

    nuevoArticulo.classList.add('mainArticle');

    const nuevoP = document.createElement('p');
    nuevoP.classList.add('article-p');
    nuevoP.textContent = nuevoProducto.descripcioncorta;
    nuevoArticulo.appendChild(nuevoP);

    const nuevaImg = document.createElement('img');
    nuevaImg.src = nuevoProducto.imagen;
    nuevaImg.classList.add('img-article');
    nuevoArticulo.appendChild(nuevaImg);

    const nuevoPrecio = document.createElement('p');
    nuevoPrecio.classList.add('p-precio-article');
    nuevoPrecio.textContent = "USD " + nuevoProducto.precio;
    nuevoArticulo.appendChild(nuevoPrecio);

    const btnAgregar = document.createElement('button');
    btnAgregar.type = "submit";
    btnAgregar.classList.add('btnAgregar-article');
    nuevoArticulo.appendChild(btnAgregar);

    const nuevoI = document.createElement('i');
    nuevoI.classList.add('fas');
    nuevoI.classList.add('fa-cart-plus');

    btnAgregar.appendChild(nuevoI);

    switch(categoria){
        case "destacados":
            sectionDestacados.appendChild(nuevoArticulo);
            break;
        case "pcEscritorio":
            sectionPcEscritorio.appendChild(nuevoArticulo);
            break;
        case "Notebook":
            sectionNotebooks.appendChild(nuevoArticulo);
            break;
        case "Consolas":
            sectionConsolas.appendChild(nuevoArticulo);
            break;
        default:
            alert("Se produjo un error");
    }
}

/* Esta función recorre la lista de productos para crear dinámicamente los contenedores de los productos */
async function agregarProductos(){
    const destacados = await obtDestacados();
    const cantidadDestacados = destacados.length;
    for(i=0; i<cantidadDestacados; i++){
        crearNuevoArticulo(destacados[i], "destacados");
    }

    const pcsEscritorio = await obtPCEscritorio();
    const cantidadPcsEscritorio = pcsEscritorio.length;
    for(i=0; i<cantidadPcsEscritorio; i++){
        crearNuevoArticulo(pcsEscritorio[i], "pcEscritorio");
    }

    const notebooks = await obtNotebook();
    const cantidadNotebooks = notebooks.length;
    for(i=0; i<cantidadNotebooks; i++){
        crearNuevoArticulo(notebooks[i], "Notebook");
    }

    const consolas = await obtConsolas();
    const cantidadConsolas = consolas.length;
    for(i=0; i<cantidadConsolas; i++){
        crearNuevoArticulo(consolas[i], "Consolas");
    }
}

agregarProductos();