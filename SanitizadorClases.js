import {Ciudadano} from "./clases/Ciudadano.js"; 
import {Extranjero} from "./clases/Extranjero.js"; 

class SanitizadorClases 
{
    //Convierte un objeto común en una instancia de Ciudadano o Extranjero
    static FromObjectToClass(obj)
    {
        let retorno;
        if (obj["dni"] == undefined)
        {
            retorno = new Extranjero(obj["nombre"], obj["apellido"],
            obj["fechaNacimiento"], obj["paisOrigen"], obj["id"],
            )
        }
        else
        {
            retorno = new Ciudadano(obj["nombre"], obj["apellido"],
            obj["fechaNacimiento"], obj["dni"], obj["id"],
            )
        }
        return retorno;
    }

    //Convierte un array de objetos en un array de instancias de Ciudadano o Extranjero.
    static FromObjectArrayToClassArray(arrayObject)
    {
        try
        {
            let arrayFinal = [];
            for (let i=0; i<arrayObject.length; i++)
            {
                let objeto = SanitizadorClases.FromObjectToClass(arrayObject[i]);
                arrayFinal.push(objeto);
            }
            return arrayFinal;
        }
        catch (e) {throw e;}
    }
    
    //Busca la posición (índice) de un objeto dentro de un array utilizando su id
    static EncontrarIndice(arrayObject, id)
    {
        try
        {
            let retorno = -1;

            for (let i=0; i<arrayObject.length; i++)
            {
                if (arrayObject[i].id == id) retorno = i; //Guarda indice en retorno
            }
            return retorno;
        }
        catch (e) {throw e;}
    }

    //Extrae ciertos valores de un objeto y los coloca en un array
    static ArrayValuesDeObjeto(objeto)
    {
        let lista = [objeto["id"], objeto["nombre"], objeto["apellido"], objeto["fechaNacimiento"]]; //Extrae valores

        if (objeto["dni"] != undefined) 
        {
            lista.push(objeto["dni"]); //Si el obj tiene dni, lo agrega y coloca "N/A" en paisOrigen
            lista.push("N/A");
        }
        else
        {
            lista.push("N/A"); //Si no tiene dni, viceversa
            lista.push(objeto["paisOrigen"]);
        }
        return lista;
    }

    //Crea una lista de clases CSS (ciudadano o extranjero) para filas de una tabla HTML.
    static ListaClasesTr(arrayObjetosFinal)
    {
        let clasesTr = [];
        for (let i=0; i<arrayObjetosFinal.length; i++)
        {
            //Determina si el objeto es ciudadano o extranjero y agrega la clase resultante a un array
            clasesTr.push(SanitizadorClases.StringSegunDosObjetos(arrayObjetosFinal[i], "ciudadano", "extranjero", Ciudadano, Extranjero));
        }
        return clasesTr;
    }

    //Retorna un string dependiendo del tipo de objeto
    //Si el objeto es un Ciudadano, devuelve "ciudadano"
    //Si es un Extranjero, devuelve "extranjero"
    static StringSegunDosObjetos(objeto, valor1, valor2, clase1, clase2)
    {
        let strRetorno = "";
        if (objeto instanceof clase1) strRetorno = valor1;
        else if (objeto instanceof clase2) strRetorno = valor2;
        return strRetorno;
    }
}

export {SanitizadorClases}