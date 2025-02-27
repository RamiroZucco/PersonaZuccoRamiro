class Utilidades //Clase estatica, contiene métodos para interactuar con elementos HTML (extraer elementos, eliminarlos y crearlos dinámicamente)
{
    //Recibe un string idString como parámetro (el ID de un elemento HTML). Usa document.getElementById(idString) para buscar y devolver el elemento con ese ID.
    static ExtraerObjetoID(idString) { return document.getElementById(idString); }

    //Recibe un nombre de clase (classString) como parámetro. Usa document.getElementsByClassName(classString) para obtener una colección de elementos con esa clase.
    static ExtraerListaClase(classString) { return document.getElementsByClassName(classString); }
    
    //Recibe elemento HTML padre y otro hijo (dentro del padre), util para eliminar dinámicamente elementos del DOM
    static EliminarObjeto(objetoPadre, objetoHijo) 
    {
        let hijoEliminado = objetoHijo;
        objetoPadre.removeChild(objetoHijo);
        return hijoEliminado; //Retorna elemento HTML hijo eliminado
    }
    
    //Recibe: tipoEtiqueta (div, p, button, etc.), nombreClase (Clase CSS para el nuevo elemento), valorTexto (Texto dentro del elemento)
    static CrearElementoHtml(tipoEtiqueta, nombreClase, valorTexto, conTexto=true)
    {
        let etiqueta = document.createElement(tipoEtiqueta); //Crea elemento
        etiqueta.setAttribute("class", nombreClase); //Asigna clase
    
        if (conTexto)
        {
            let hijo = document.createTextNode(valorTexto); //Crea texto
            etiqueta.appendChild(hijo); //Agrega texto al elemento
        }
    
        return etiqueta;
    }
}
export { Utilidades }

