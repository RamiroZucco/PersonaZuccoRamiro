class Validaciones //No necesita instanciarse, todos metodos estaticos
{
    //Verifica si id es unico en el array
    static VerificarIdUnico(id, array, errorMsg)
    {
        if (Validaciones.IdUnico(id, array)) return id;
        else throw new Error(errorMsg);
    }

    //Recorre array y compara si id existe (true si es unico)
    static IdUnico(id, array)
    {
        let retorno = true;
        for(let i=0; i<array.length; i++)
        {
            if (array[i] == id) 
            {
                retorno = false;
                break;
            }
        }
        return retorno;
    }

    //Recibe un array con [año, mes, dia] y verifica fecha valida
    static ArrayStringToValidDate(array, maxYear, maxMonth, maxDay, errorMsg)
    {
        // Verifica que el array tenga exactamente 3 partes (año, mes, día)
        if (array.length !== 3) {
            throw new Error(errorMsg);
        }

        let year = array[0].toString();
        let month = array[1].toString();
        let day = array[2].toString();

        // Verifica que año tenga 4 dígitos y mes/día tengan 2 dígitos
        if (!/^\d{4}$/.test(year) || !/^\d{2}$/.test(month) || !/^\d{2}$/.test(day)) {
            throw new Error(errorMsg);
        }

        // Convierte los valores a números enteros
        let yearNum = parseInt(year);
        let monthNum = parseInt(month);
        let dayNum = parseInt(day);

        // Verifica que los valores sean positivos y estén dentro de los rangos válidos
        if (yearNum < 1 || monthNum < 1 || monthNum > 12 || dayNum < 1 || dayNum > 31) {
            throw new Error(errorMsg);
        }

        // Verifica si el año está dentro del límite
        if (yearNum >= maxYear || monthNum > maxMonth || dayNum > maxDay) {
            throw new Error(errorMsg);
        }

        // Retorna la fecha en formato numérico AAAAMMDD
        return parseInt(year + month + day);
    }


    //Convierte una cadena en un array de fecha
    static StringToDateArray(str) 
    {
        str = str.toString();
        let year = "";
        let month = "";
        let day = "";
        for (let i=0; i<str.length; i++) //Extrae los primeros 4 caracteres como año, 2 caracteres como mes, y 2 caracteres como día
        {
            if (year.length != 4) year += str[i];
            else if (month.length != 2) month += str[i];
            else if (day.length != 2) day += str[i];
            else break;
        }
        let array = [year, month, day];
        return array;
    }

    //Verifica si un string es válido
    static ValidarString(valor, minimo, msjError) 
    {
        // Verifica que el valor no sea nulo ni vacío
        if (!this.VerificarNulo(valor, msjError)) {
            throw new Error(msjError);
        }

        // Verifica que el valor sea un string y NO un número
        if (typeof valor !== "string" || !isNaN(valor)) {
            throw new Error(msjError);
        }

        // Verifica que tenga al menos `minimo` caracteres
        if (valor.length < minimo) {
            throw new Error(msjError);
        }

        return valor; 
    }


    //Verifica si un número entero está dentro de un rango
    static ValidateNum(num, minimo=0, maximo=100, errorMsg)
    {
        if (!isNaN(num))
        {
            if (minimo!=null && maximo!=null)
            {
                if (parseInt(num) > minimo && parseInt(num) < maximo) return parseInt(num);
                else {throw new Error(errorMsg);}
            }
            else return parseInt(num);
        
        }
        else {throw new Error(errorMsg);}
    }

    //Igual que ValidateNum() pero para números con decimales
    static ValidateNumFloat(num, minimo=0, maximo=100, errorMsg)
    {
        if (!isNaN(num))
        {
            if (minimo!=null && maximo!=null)
            {
                if (parseFloat(num) > minimo && parseFloat(num) < maximo) return parseFloat(num);
                else {throw new Error(errorMsg);}
            }
            else return parseFloat(num);
        }
        else {throw new Error(errorMsg);}
    }

    //Verifica que valor no sea nulo ni vacío
    static VerificarNulo(valor, errorMsg)
    {
        if (valor != null && valor != "") return valor;
        else throw new Error(errorMsg);
    }

    //Verifica que valor no sea un string vacío
    static VerificarStrVacio(valor, errorMsg)
    {
        if (valor != "") return valor;
        else throw new Error(errorMsg);
    }

    //Valida si num es un número entero mayor que minimo
    static VerificarNumMayorInt(num, minimo, errorMsg) {
        if (!isNaN(num)) {
            if (num === "") throw new Error(errorMsg);
            let numInt = parseInt(num);
            if (numInt > minimo) return numInt;
            else throw new Error(errorMsg); 
        } else {
            throw new Error(errorMsg);
        }
    }
    
    //Similar a VerificarNumMayorInt(), pero para números decimales
    static VerificarNumMayorFloat(num, minimo, errorMsg) {
        if (!isNaN(num)) {
            if (num === "") throw new Error(errorMsg);
            let numFloat = parseFloat(num);
            if (numFloat > minimo) return numFloat;
            else throw new Error(errorMsg);  
        } else {
            throw new Error(errorMsg);
        }
    }
    
}

export { Validaciones }