let pagina = 1;

document.addEventListener('DOMContentLoaded', function(){
    inicarApp();
})

function inicarApp(){
    mostrarServicios();

    //Resalta el div actual según el tab al que se presiona
    mostrarSeccion();

    //Oculta o muestra una sección según el tab al que se presiona
    cambiarSeccion();

    //Paginacion Siguiente y anterior
    paginaSiguiente();
    paginaAnterior();

    //Comprueba la pagina actual para ocultar o mostrar la paginacion
    botonesPaginador();

}

function mostrarSeccion(){

    //Eliminar mostrar-seccion de la seccion anterior
    const seccionAnterior = document.querySelector('.mostrar-seccion');
    if(seccionAnterior){
        seccionAnterior.classList.remove('mostrar-seccion');
    }


   
    const seccionActual = document.querySelector(`#paso-${pagina}`);
    seccionActual.classList.add('mostrar-seccion');

   //Eliminar la clase actual en el tab anterior
    const tabAnterior = document.querySelector('.tabs .actual');    
    if(tabAnterior){
        tabAnterior.classList.remove('actual');
    }

    //Resalta el tab actual
    const tab = document.querySelector(`[data-paso="${pagina}"]`);
    tab.classList.add('actual');
}

function cambiarSeccion(){ //cambia entre tabs
    const enlaces = document.querySelectorAll('.tabs button');

    enlaces.forEach(enlace => {
        enlace.addEventListener('click', e =>{
            e.preventDefault();
            pagina = parseInt(e.target.dataset.paso);
            // //Agrega mostrar seccion donde dimos click
            // const seccion = document.querySelector(`#paso-${pagina}`);
            // seccion.classList.add('mostrar-seccion');
            // //Agregar la clase de actual en el nuevo tab
            // const tab = document.querySelector(`[data-paso="${pagina}"]`);
            // tab.classList.add('actual');
            //Llamar la fucnión de mostrar sección
            mostrarSeccion();
            botonesPaginador();
        })
    })
}

async function mostrarServicios(){
    try {
       const resultado = await fetch('./servicios.json');
       const db = await resultado.json();
    //   const servicios = db.servicios;
       const {servicios} = db; //destructuring
       //Generar HTML
       servicios.forEach( servicio => {
           const {id, nombre,precio} = servicio;
 
       //DOM scripting
       const nombreServicio = document.createElement('P');
       nombreServicio.textContent = nombre;
       nombreServicio.classList.add('nombre-servicio');

       const precioServicio = document.createElement('P');
       precioServicio.textContent = `$ ${precio}`;
       precioServicio.classList.add('precio-servicio');

       //Generar DIV contenedor de servicio
       const servicioDiv = document.createElement('DIV');
       servicioDiv.classList.add('servicio');
       servicioDiv.dataset.idServicio = id;

       //Inyectar precio y nombre al div servicio
       servicioDiv.appendChild(nombreServicio);
       servicioDiv.appendChild(precioServicio);

       //Inyectar el div con los servicios al HTML
       document.querySelector('#servicios').appendChild(servicioDiv);
       //SELECCIONA UN SERVICIO PARA LA CITA
       servicioDiv.onclick = seleccionarServicio;
        });
    } catch (error) {
        console.log(error);
    }
}


function seleccionarServicio(e){

    let elemento;
    //Forzar que el elemento al cual le damos click sea el DIV
    if (e.target.tagName === 'P') {
        elemento = e.target.parentElement;
    } else {
        elemento =e.target;
    }

    if (elemento.classList.contains('seleccionado')) {
        elemento.classList.remove('seleccionado');
    }else{
        elemento.classList.add('seleccionado');
    }
    
}

function paginaSiguiente(){
    const paginaSiguiente = document.querySelector('#siguiente');
    paginaSiguiente.addEventListener('click', () =>{
        pagina++;

        console.log(pagina);
        botonesPaginador();
    })
}
function paginaAnterior(){
    const paginaAnterior= document.querySelector('#anterior');
        paginaAnterior.addEventListener('click', () =>{
        pagina--;

        console.log(pagina);
        botonesPaginador();
    })
}

function botonesPaginador(){
    const paginaSiguiente = document.querySelector('#siguiente');
    const paginaAnterior= document.querySelector('#anterior');

    if (pagina === 1) {
        paginaAnterior.classList.add('ocultar');
    }else if(pagina === 3){
        paginaSiguiente.classList.add('ocultar');
        paginaAnterior.classList.remove('ocultar');
    }else {
        paginaAnterior.classList.remove('ocultar');
        paginaSiguiente.classList.remove('ocultar');
    }

    mostrarSeccion(); //Cambia la seccion que se muestra por la de la pagina
}