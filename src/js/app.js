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

}

function mostrarSeccion(){
    const seccionActual = document.querySelector(`#paso-${pagina}`);
    seccionActual.classList.add('mostrar-seccion');

    //Resalta el tab actual
    const tab = document.querySelector(`[data-paso="${pagina}"]`);
    tab.classList.add('actual');
}

function cambiarSeccion(){
    const enlaces = document.querySelectorAll('.tabs button');

    enlaces.forEach(enlace => {
        enlace.addEventListener('click', e =>{
            e.preventDefault();
            pagina = parseInt(e.target.dataset.paso);

            //Eliminar mostrar-seccion de la seccion anterior
            document.querySelector('.mostrar-seccion').classList.remove('mostrar-seccion');

            //Agrega mostrar seccion donde dimos click
            const seccion = document.querySelector(`#paso-${pagina}`);
            seccion.classList.add('mostrar-seccion');

            //Eliminar la clase actual en el tab anterior
            document.querySelectorAll('.tabs .actual').classList.remove('actual');
            //Agregar la clase de actual en el nuevo tab
            const tab = document.querySelector(`[data-paso="${pagina}"]`);
            tab.classList.add('actual');
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