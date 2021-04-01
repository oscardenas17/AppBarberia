//PAGINACION
let pagina = 1;


//VALIDACION PARA FORM
const cita = {
    nombre: '',
    fecha : '',
    hora: '',
    servicios: []

}



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

    //Muestra el resumen de la cita (o mensaje de error)
    mostrarResumen();

    //Almacena el nombre de la cita en el objeto
    nombreCita();

    //Almacena la fecha de la cita en el objeto
    fechaCita();

    //Deshabilita días pasados para la fecha
    deshabilitarFechaAnterior();
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

        //seleccionar o deseleccionar el servicio en data
        // console.log(elemento.dataset.idServicio)
        const id = parseInt(elemento.dataset.idServicio);
        eliminarServicio(id);
    }else{
        elemento.classList.add('seleccionado');

        //seleccionar o deseleccionar el servicio en data
        // console.log(elemento.dataset.idServicio):
        // console.log(elemento.firstElementChild.textContent):

        const servicioObj = {
            id: parseInt(elemento.dataset.idServicio),
            nombre: elemento.firstElementChild.textContent,
            precio: elemento.firstElementChild.nextElementSibling.textContent     
          }
        //   console.log(servicioObj);

          agregarServicio(servicioObj);
    }  
}


///FUNCIONES PARA SERVICIOS
function  eliminarServicio(id){
    const { servicios } = cita;
    cita.servicios = servicios.filter( service => service.id != id);
     console.log(cita);
}
function agregarServicio(servicioObj){
    const { servicios } = cita;
    cita.servicios = [...servicios, servicioObj];
    //  console.log(cita);
}
///FUNCIONES PARA SERVICIOS


//PAGINADORES
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
//PAGINADORES

//VALIDACION FORM
function mostrarResumen(){
    //dESTRUCTURING
    const {nombre, fecha, hora, servicios} = cita;
    //SELECCIONAR RESUMEN
    const resumenDIV = document.querySelector('.contenido-resumen');
    //VALIDACION OBJETO ¿vacio?
    if(Object.values(cita).includes('')){
        const noServicios = document.createElement('P');
        noServicios.textContent = 'Faltan Datos Solicitados';

        noServicios.classList.add('invalidar-cita');

        //agregar a resumenDiv
        resumenDIV.appendChild(noServicios);
    }
}


//Insert name
function nombreCita(){
    const nombreInput = document.querySelector('#nombre');

    nombreInput.addEventListener('input', e =>{
        const nombreTexto = e.target.value.trim();

        //Validacion nombre no vacio
        if(nombreTexto === '' || nombreTexto.length <3){
            mostrarAlerta('nombre no valido', 'error');
        }else{
            const alerta = document.querySelector('.alerta');

            if(alerta){
                alerta.remove();
            }
            cita.nombre = nombreTexto;
       }
     });
}

function mostrarAlerta(mensaje, tipo){
    // console.log('msn es', mensaje);

    //si hay un alert previo no generar otro
    const alertaPrevia = document.querySelector('.alerta');
    if(alertaPrevia){
        return;//detiene ejecucion de ese code
    }

    const alerta = document.createElement('DIV');
    alerta.textContent = mensaje;
    alerta.classList.add('alerta');

    if(tipo === 'error'){
        alerta.classList.add('error');
    }
    // console.log(alerta);
    
    //Eliminar alerta
    setTimeout(() => {
        alerta.remove();
    }, 3000);




    //INSERTAR EN EL FORM
    const formulario = document.querySelector('.formulario');
    formulario.appendChild(alerta);
}


function fechaCita(){
    const fechaInput = document.querySelector('#fecha');
    fechaInput.addEventListener('input', e =>{
        //getUTCDay devuelve # edl dia 0= dom
        const dia = new Date(e.target.value).getUTCDay();
        console.log(dia);
        if([0,6].includes(dia)){
            // console.log('Seleccionaste domingo o sabado, no se labora');
            e.preventDefault();
            fechaInput.value = '';
            mostrarAlerta('Fines de semana no son permitidos', 'error')
        }else{
            cita.fecha = fechaInput.value;
        }

        //generar nombre dia largo (libreria pasar a español moment  o datefns)
        // const opciones = {
        //     weekday: 'long',
        //     year: 'numeric',
        //     month: 'long'
        // }

        // console.log(dia.toLocaleDateString('es-ES', opciones));
      
    })
}


function deshabilitarFechaAnterior(){
    const inputFecha =  document.querySelector('#fecha');

    const fechaAhora = new Date();
    const year = fechaAhora.getFullYear();
    const mes = fechaAhora.getMonth() + 1 ;
    const dia = fechaAhora.getDate() + 1 ;

    //Formato deseado: AAAA-MM-DD
    // const fechaDeshabilitar = `${year}-${mes}-${dia}`;
    const fechaDeshabilitar =`${year}-${mes < 10 ? `0${mes}` : mes}-${dia < 10 ? `0${dia}` : dia}`
   

    inputFecha.min= fechaDeshabilitar;


}

