import { PersonaModel } from './persona.model'

// La clase AlumnoModel hereda de PersonaModel
export class AlumnoModel extends PersonaModel {
  // Atributos privados propios del alumno
  private legajo: number
  private fechaAlta: string
  private modificacion: string
  private isActive: boolean

  // Constructor de la clase
  constructor(
    nombre: string,
    apellido: string,
    email: string,
    legajo: number,

    // Si no se pasa fecha, se usa la fecha actual
    fechaAlta: string = new Date().toISOString().split('T')[0],
    modificacion: string = new Date().toISOString().split('T')[0],

    // Por defecto el alumno se crea activo
    isActive: boolean = true
  ) {
    // Llamo al constructor de PersonaModel
    super(nombre, apellido, email)

    // Inicializo los atributos propios
    this.legajo = legajo
    this.fechaAlta = fechaAlta
    this.modificacion = modificacion
    this.isActive = isActive
  }

  // Getter del legajo
  public getLegajo(): number {
    return this.legajo
  }

  // Getter del estado activo
  public getIsActive(): boolean {
    return this.isActive
  }

  // Setter para cambiar el estado
  public setIsActive(status: boolean): void {
    this.isActive = status
  }

  // Getter de la fecha de modificación
  public getModificacion(): string {
    return this.modificacion
  }

  // Setter de la fecha de modificación
  public setModificacion(fecha: string): void {
    this.modificacion = fecha
  }

  // Polimorfismo:
  // Sobrescribo el método de la clase padre
  // para devolver todos los atributos del alumno
  public override getAllAttributes(): {
    legajo: number
    nombre: string
    apellido: string
    email: string
    fechaAlta: string
    modificacion: string
    isActive: boolean
  } {
    // Retorno un objeto con todos los datos
    return {
      legajo: this.legajo,

      // Estos atributos vienen de PersonaModel
      // y se pueden usar porque son protected
      nombre: this.nombre,
      apellido: this.apellido,
      email: this.email,

      fechaAlta: this.fechaAlta,
      modificacion: this.modificacion,
      isActive: this.isActive
    }
  }
}
