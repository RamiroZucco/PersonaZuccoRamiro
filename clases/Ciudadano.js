import { Persona }  from "./Persona.js";

class Ciudadano extends Persona
{
    dni

    constructor(nombre,apellido,fechaNacimiento,dni,id=null)
    {
        super(nombre,apellido,fechaNacimiento,id); 
        this.dni = dni;
    }

    toString() {
        return `${super.toString()}, Dni: ${this.dni}`;
    }
    toJson(){return JSON.parse(this);}
}
export { Ciudadano };