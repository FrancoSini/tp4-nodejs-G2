export class ClaseModel {
  constructor(
    protected idMateria: string,
    protected nombre: string,
    protected cuatrimestre: number
  ) {}

  // id de la materia
  public getIdMateria(): string {
    return this.idMateria
  }
  public setIdMateria(idMateria: string): void {
    this.idMateria = idMateria
  }

  // nombre de la clase
  public getNombre(): string {
    return this.nombre
  }
    public setNombre(nombre: string): void {
    this.nombre = nombre
  }
  // cuatrimestre de la clase
  public getCuatrimestre(): number {
    return this.cuatrimestre
  }
  public setCuatrimestre(cuatrimestre: number): void {
    this.cuatrimestre = cuatrimestre
  }

  public getAllMateriaAttributes(): object {
    return {
      idMateria: this.idMateria,
      nombre: this.nombre,
      cuatrimestre: this.cuatrimestre
    }
  }
}