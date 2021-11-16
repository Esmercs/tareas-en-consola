const Tarea = require('./tarea');


/**
 * _listado:
 *      {'uuid-123712-123123-2: {id: 12, desc: asd, completadoEN : 92231}'},
 */

class Tareas{
    _listado = {};

    get listadoArray(){

        const listado = [];
        Object.keys(this._listado).forEach(key =>{
            const tarea = this._listado[key];
            listado.push(tarea);
            // console.log(key);
        })

        return listado;
    }
    constructor(){
        this._listado={};
    }

    borrarTarea(id = ''){
        if(this._listado[id]){
            delete this._listado[id];
        }
    }

    cargarTareasFromArray(tareas = [])
    {
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });
    }
    crearTarea(desc = ''){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }
    listadoCompleto(){
            console.log();
            this.listadoArray.forEach( (tarea, i) =>{
            const idx = `${i+1}`.green;
            const {desc, completadoEn} = tarea;
            const estado = (completadoEn)
                            ? 'Completado'.green
                            : 'Pendiente'.red
            console.log(`${idx}. ${desc} :: ${estado}`);

        })
        // console.log(this.listadoArray.length);
        // for(let i=0;i<this.listadoArray.length;i++){
        //     console.log(`${this.listadoArray(id)}`)
        // }
        //1. en verde
        // Completada en verde
        // Pendiente en rojo
        //1. SI es la primera tarea ::Completada o pendiente
    }
    listarPendientesCompletadas(completadas = true){
        console.log();
        let contador = 0;
        this.listadoArray.forEach((tarea)=>{
            const {desc, completadoEn} = tarea;
            const estado = (completadoEn)
                    ? 'Completado'.green
                    : 'Pendiente'.red
            if(completadas)
            {
                if(completadoEn)
                {
                    contador += 1;
                    console.log(`${(contador + '.').green} ${desc} :: ${completadoEn.green}`);
                }
                return null;
            }
            else 
            {
                if(!completadoEn)
                {
                    contador += 1;
                    console.log(`${(contador + '.').green} ${desc} :: ${estado}`);
                }

            }
        })
    }

    toggleCompletadas(ids = []){
        ids.forEach(id => {
            const tarea = this._listado[id];
            if(!tarea.completadoEn)
            {
                tarea.completadoEn = new Date().toISOString();
            }

        });

        this.listadoArray.forEach(tarea =>{
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
            }
        })
    }
}

module.exports= Tareas;