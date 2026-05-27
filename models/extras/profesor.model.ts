import { PersonaModel } from '../persona.model'

export class ProfesorModel extends PersonaModel {
  private legajo: number
  private fechaAlta: string
  private modificacion: string
  private isActive: boolean
  private especialidad: string

  constructor(
    nombre: string,
    apellido: string,
    email: string,
    legajo: number,
    especialidad: string,
    fechaAlta: string = new Date().toISOString().split('T')[0],
    modificacion: string = new Date().toISOString().split('T')[0],
    isActive: boolean = true
  ) {
    super(nombre, apellido, email)
    this.legajo = legajo
    this.especialidad = especialidad
    this.fechaAlta = fechaAlta
    this.modificacion = modificacion
    this.isActive = isActive
  }

  public getLegajo(): number {
    return this.legajo
  }

  public getEspecialidad(): string {
    return this.especialidad
  }
  public setEspecialidad(especialidad: string): void {
    this.especialidad = especialidad
  }

  public getIsActive(): boolean {
    return this.isActive
  }
  public setIsActive(status: boolean): void {
    this.isActive = status
  }

  public getModificacion(): string {
    return this.modificacion
  }
  public setModificacion(fecha: string): void {
    this.modificacion = fecha
  }

  public override getAllAttributes(): object {
    return {
      legajo: this.legajo,
      nombre: this.nombre,
      apellido: this.apellido,
      email: this.email,
      especialidad: this.especialidad,
      fechaAlta: this.fechaAlta,
      modificacion: this.modificacion,
      isActive: this.isActive
    }
  }
}
