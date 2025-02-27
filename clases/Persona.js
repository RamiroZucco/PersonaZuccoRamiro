class Persona
{
    //Propiedades de la clase
    id;
    nombre;
    apellido;
    fechaNacimiento;

    constructor(nombre,apellido,fechaNacimiento,id=null)
    {
        this.id = id; //Asigna valores recibidos en el construct a las propiedades del objeto
        this.nombre = nombre;
        this.apellido = apellido;
        this.fechaNacimiento = fechaNacimiento;
    }

    toString() {
        return `ID: ${this.id}, Nombre: ${this.nombre}, Apellido: ${this.apellido}, Fecha de nacimiento: ${this.fechaNacimiento}`;
    }
}
export { Persona }; //Permite que sea importada y usada en otros archivos


//http://localhost/PersonaZuccoRamiro-main/index.html