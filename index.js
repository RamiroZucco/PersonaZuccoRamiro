import {Ciudadano} from "./clases/Ciudadano.js"; 
import {Extranjero} from "./clases/Extranjero.js"; 
import { Tabla } from "./Tabla.js"; 
import {Utilidades} from "./Utilidades.js";
import {SanitizadorClases} from "./SanitizadorClases.js";
import {Validaciones} from "./Validaciones.js";
import {FormularioABM} from "./FormularioABM.js";
import {FormularioSpinner} from "./FormularioSpinner.js";

export var arrayFinal = []; //Almacena datos de la tabla en memoria

export function ActualizarTabla()
{
    let arrayColumnasTabla = ["id", "apellido", "nombre", "fechaNacimiento", "dni", "paisOrigen", "modificar", "eliminar"];
                             //Sirve como campos de encabezado y a la vez como clases de encabezado y filas

    let clasesFilas = SanitizadorClases.ListaClasesTr(arrayFinal); //Genera las clases CSS de las filas 
    clasesFilas = [...clasesFilas, "modificar", "eliminar"]; //Le agrego a las clases de las filas las de los btn

    let elementos = document.getElementsByClassName('tablaDatos');

    if (elementos.length > 0) //Si ya existe una tabla en el dom, la elimina
    {
        Utilidades.ExtraerListaClase("contenedorTabla")[0].removeChild(elementos[0]);
    }

    //Crea una nueva tabla
    new Tabla(Utilidades.ExtraerListaClase("contenedorTabla")[0], arrayFinal, arrayColumnasTabla, 
            arrayColumnasTabla, clasesFilas, "alta", true);

}

//Cuando se cambia el tipo (ciudadano o extranjero), actualiza el label del campo correspondiente.
function ChangeLbl()
{
    let select = Utilidades.ExtraerObjetoID("selectTipo");
    let lblAtr1 = Utilidades.ExtraerListaClase("lbl_atr1")[0];
    if (select.value == "ciudadano")
    {
        lblAtr1.textContent = "dni";
    }
    else
    {
        lblAtr1.textContent = "paisOrigen";
    }
}

export function LlamarFormABM(objetoClickeado, accion)
{
    //Muestra formulario ABM y oculta tabla de datos
    Utilidades.ExtraerObjetoID("formulario-abm").style.display = "";
    Utilidades.ExtraerObjetoID("formulario-lista").style.display = "none";

    //Define los arrays de clases y textos para los elementos del formulario
    let arrayClasesDiv = ["div_id", "div_apellido", "div_nombre", "div_fechaNacimiento", "div_atr1"];
    let arrayLabelsClases = ["lbl_id", "lbl_apellido", "lbl_nombre", "lbl_fechaNacimiento", "lbl_atr1"];
    let arrayLabelsTxt = ["id", "apellido", "nombre", "fechaNacimiento", "dni", "paisOrigen"]; 
    let arrayClasesInput = ["txt_id", "txt_apellido", "txt_nombre", "txt_fechaNacimiento", "txt_atr1"];

    //Crea instancia de form ABM y la muestra en la interfaz
    new FormularioABM(Utilidades.ExtraerObjetoID("formulario-abm"), arrayClasesDiv, 
                arrayLabelsClases, arrayLabelsTxt, arrayClasesInput, accion, objetoClickeado, true, "selectTipo", 
                "ciudadano", "extranjero", null, null, true, ChangeLbl);
}


function traerDatos()
{ 
    new FormularioSpinner(Utilidades.ExtraerObjetoID("body"));
    
    //Hace una solicitud GET a la API usando XMLHttpRequest
    let http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        if (http.readyState==4 && http.status==200) 
        {
            let arrayRespuesta = JSON.parse(http.response);
            console.log(arrayRespuesta);
            try
            {
                arrayFinal = SanitizadorClases.FromObjectArrayToClassArray(arrayRespuesta); //Si en el set vienen incorrectos tira error
                ActualizarTabla(arrayFinal);

                Utilidades.ExtraerListaClase("agregar")[0].addEventListener("click", function(){LlamarFormABM(false, "alta");}); //Agrega evento al btn agregar para abrir form ABM
                Utilidades.ExtraerObjetoID("body").removeChild(Utilidades.ExtraerListaClase("spinner")[0]);
            }
            catch (e) {alert(e.message);}
        }
        else if (http.readyState==4){ alert("No se le pudo pegar al endpoint. Fijate la url o donde esté el servidor");}
    };

    http.open("GET", "https://examenesutn.vercel.app/api/PersonaCiudadanoExtranjero"); 
    http.send(); 
}

traerDatos();
Utilidades.ExtraerObjetoID("formulario-abm").style.display = "none"; //Oculta formulario ABM al inicio