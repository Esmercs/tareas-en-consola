require('colors');
const {guardarDB,leerDB} = require('./helpers/guardarArchivo');

const { inquirerMenu, 
        pausa,
        leerInput,
        listadoTareasBorrar,
        confirmar,
        mostrarListadoChecklist
     } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');


const main = async() =>{

    let opt = '0';
    const tareas = new Tareas();

    const tareasDB = leerDB();


    if(tareasDB){
        //Cargar tareas 
        tareas.cargarTareasFromArray(tareasDB);
    }

    do{
        //IMPRIMIR MENU
        opt = await inquirerMenu();

        switch (opt) {
            case '1': 
                //crear tarea
                const desc = await leerInput('Descripcion: ');
                tareas.crearTarea(desc);
            break;
            case '2':
                // Listar tareas
                tareas.listadoCompleto();
            break;
            case '3':
                // listar tareas pendientes
                tareas.listarPendientesCompletadas(true);
            break;
            case '4':
                // listar taras completadas
                tareas.listarPendientesCompletadas(false);
            break;
            case '5':
                // Completado - pendiente 
                const ids = await mostrarListadoChecklist(tareas.listadoArray);
                tareas.toggleCompletadas(ids);
            break;
            case '6':
                // Borrar tarea
                const id = await listadoTareasBorrar(tareas.listadoArray);
                if(id !== '0')
                {
                    const ok = await confirmar('¿Estas seguro?');
                    if(ok){
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada');
                    }
                }
            break;
        }

        guardarDB(tareas.listadoArray);

        await pausa();


    }while( opt!= '0')



}

main();




