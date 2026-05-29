import { AlumnoModel } from '../alumno.model'
import { MateriaModel } from '../extras/materia.model'
export class NotaModel {
  constructor(
    protected id: number,
    protected legajo: AlumnoModel,
    protected idMateria: MateriaModel,
    protected nota: number,
    protected fecha: string = new Date().toISOString().split('T')[0]
  ) {}

  // getters y setters
  public getNota(): number {
    return this.nota
  }
  public getId(): number {
    return this.id
  }
  public getLegajo(): number {
    return this.legajo.getLegajo() // Devuelve el número de legajo del alumno
  }
  public getMateria(): string {
    return this.idMateria.getNombre() // Devuelve el nombre de la materia
  }
  public getFecha(): string {
    return this.fecha
  }
  public setFecha(fecha: string): void {
    this.fecha = fecha
  }
  public setId(id: number): void {
    this.id = id
  }
  public setNota(nota: number): void {
    this.nota = nota
  }
  public setMateria(materia: MateriaModel): void {
    this.idMateria.setNombre(materia.getNombre())
  }

  // método para devolver todos los atributos de la nota en un objeto literal/plano
  public getAllNotaAttributes(): object {
    return {
      id: this.id,
      legajo: this.legajo,
      idMateria: this.idMateria,
      nota: this.nota,
      fecha: this.fecha
    }
  }
}
