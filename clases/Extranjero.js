import { Persona }  from "./Persona.js"; //Hereda propiedades y metodos de Persona

class Extranjero extends Persona //Obtiene propiedades y constructor de Persona
{
    paisOrigen; //Propiedad exclusiva de Extranjero

    constructor(nombre,apellido,fechaNacimiento,paisOrigen,id)
    {
        super(nombre,apellido,fechaNacimiento,id); //Llama al constructor de la clase padre
        this.paisOrigen = paisOrigen;
    }

    toString() {
        return `${super.toString()}, Pais de origen: ${this.paisOrigen}`;
    }

    toJson(){return JSON.parse(this);}
}
export { Extranjero };