document.addEventListener('DOMContentLoaded', function(){
    inicarApp();
})

function inicarApp(){
    mostrarServicios();
}

async function mostrarServicios(){
    try {
       const resultado = await fetch('./servicios.json');
       const db = await resultado.json();
    //   const servicios = db.servicios;
       const {servicios} = db; //destructuring

       //Generar HTML
       servicios.forEach( servicio => {
           const { id,nombre,precio} = servicio;
       });

       //DOM scripting


    } catch (error) {
        console.log(error);
    }
}