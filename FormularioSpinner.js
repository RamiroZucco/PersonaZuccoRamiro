import { Utilidades } from "./Utilidades.js"

class FormularioSpinner //Crear y gestiona un spinner de carga dentro de un elemento HTML padre
{
    constructor(etiquetaPadre) //elemento HTML donde se insertará el spinner
    {
        etiquetaPadre
        let div = Utilidades.CrearElementoHtml("div", "spinner", "", false); //Crea un div principal con la clase "spinner", que será el contenedor del spinner
        let div2 = Utilidades.CrearElementoHtml("div", "spinnerGirar", "", false); //Crea otro div dentro del primero, con la clase "spinnerGirar", con la animación de giro.
        div.appendChild(div2); //Agrega div2 dentro de div
        etiquetaPadre.appendChild(div); //Inserta el spinner en etiquetaPadre, haciéndolo visible en la página
    }
}
export {FormularioSpinner}