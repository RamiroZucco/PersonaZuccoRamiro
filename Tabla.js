import {Utilidades} from "./Utilidades.js";
import {SanitizadorClases} from "./SanitizadorClases.js";
import {LlamarFormABM} from "./index.js";
class Tabla //Clase encargada de crear y administrar una tabla HTML dinámica
{
    constructor(etiquetaPadre, arrayFilas, arrayEncabezado, arrayClasesEncabezado, arrayClasesFilas, accion="alta", eventoTd=false, funcion=null)
    {
        this.accion = accion; //Alta, modificar o eliminar
        this.eventoTd = eventoTd; //Indica si tendran eventos de clic
        this.funcion = funcion; //Para personalizar eventos

        this.arrayFilas = arrayFilas; //Lista de objetos que representan los datos de la tabla
        this.arrayEncabezado = arrayEncabezado; //Lista con titulos de las columnas
        
        //Se llama a CrearTabla para generar la estructura de la tabla
        //etiquetaPadre: Elemento HTML donde se insertará la tabla
        //arrayClasesEncabezado: Clases CSS para el encabezado
        //arrayClasesFilas: Clases CSS para las fila
        this.CrearTabla(etiquetaPadre, arrayClasesEncabezado, arrayClasesFilas);
    }

    CrearTabla(etiquetaPadreDeTabla, arrayClasesEncabezado, arrayClasesFilas)
    {
        //Crea un elemento <table> con la clase "tablaDatos"
        let table = Utilidades.CrearElementoHtml("table", "tablaDatos", "", false);

        //Se genera una fila de encabezado con clases CSS adicionales y se agrega a la tabla.
        let arrayColumnasClaseTd = arrayClasesEncabezado.map(function(element){return element + " encabezadoTd";})
        let encabezado = this.CrearFilaTabla("encabezado", this.arrayEncabezado, arrayColumnasClaseTd);
        table.appendChild(encabezado);

        //Llama a DibujarFilasTabla para agregar los datos
        //Inserta la tabla en el elemento padre proporcionado
        this.DibujarFilasTabla(arrayClasesFilas, arrayClasesEncabezado, table, true);
        etiquetaPadreDeTabla.appendChild(table);
    }


    CrearFilaTabla(claseTr, listaValores, arrayClasesTd=null)
    {
        //Se genera un <tr> con la clase claseTr
        let tr = Utilidades.CrearElementoHtml("tr", claseTr, "", false);

        //Se recorre la lista de valores
        for (let i=0; i<listaValores.length; i++)
        {
            //Se crean celdas <td> para cada valor
            let casillaTd = Utilidades.CrearElementoHtml("td", "tdTabla " + arrayClasesTd[i], listaValores[i]);

            //Agrega eventos de clic para modificar o eliminar registros
            if (claseTr != "encabezado" && this.eventoTd != false && (i==listaValores.length-2 || i==listaValores.length-1 )) 
            {
                if (i==listaValores.length-2) 
                {
                    casillaTd.addEventListener("click", function() {
                        LlamarFormABM(tr, "modificar");
                    });
                }
                else if (i==listaValores.length-1)
                {
                    casillaTd.addEventListener("click", function() {
                        LlamarFormABM(tr, "eliminar");
                    });
                }
            }

            tr.appendChild(casillaTd); //Se agregan celdas a la fila
        }
        return tr; //Retorna fila creada
    }

    DibujarFilasTabla(clasesFilas, arrayColumnas, tablaObjeto, editarEliminar=false)
    {
        for (let i=0; i<this.arrayFilas.length; i++) //Itera sobre los datos a mostrar
        {
            //Convierte cada objeto en una lista de valores
            let listaValoresActual = SanitizadorClases.ArrayValuesDeObjeto(this.arrayFilas[i]);

            //Agrega opciones de modificar y eliminar
            if (editarEliminar != false)
            {
                listaValoresActual[listaValoresActual.length] = "modificar"; // agrega nuevo indice
                listaValoresActual[listaValoresActual.length] = "eliminar";
            }

            //Crea fila con valores extraidos
            let fila;
            if (clasesFilas == null) fila = this.CrearFilaTabla("", listaValoresActual, arrayColumnas);
            else fila = this.CrearFilaTabla(clasesFilas[i], listaValoresActual, arrayColumnas);

            tablaObjeto.appendChild(fila); //Añade fila a la tabla
        }
    }
}
export { Tabla };