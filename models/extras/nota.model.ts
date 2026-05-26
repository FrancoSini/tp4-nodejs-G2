import { AlumnoModel } from '../alumno.model'
export class NotaModel {
  constructor(
    protected nota: number,
    protected Alumno: AlumnoModel,
    protected Materia: string
  ) {}

  // getters y setters
  public getNota(): number {
    return this.nota
  }
  public getAlumno(): AlumnoModel {
    return this.Alumno
  }
  public getMateria(): string {
    return this.Materia
  }
  public setNota(nota: number): void {
    this.nota = nota
  }
  public setAlumno(alumno: AlumnoModel): void {
    this.Alumno = alumno
  }
  public setMateria(materia: string): void {
    this.Materia = materia
  }
  // método para devolver todos los atributos de la nota en un objeto literal/plano
  public getAllNotaAttributes(): object {
    return {
      nota: this.nota,
      Alumno: this.Alumno.getAllAttributes(),
      Materia: this.Materia
    }
  }
}
