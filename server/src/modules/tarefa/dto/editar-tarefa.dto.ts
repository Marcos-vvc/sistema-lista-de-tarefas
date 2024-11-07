import { IsDateString, IsNumber, IsString } from 'class-validator';

export class EditarTarefaDto {
  @IsString()
  nome: string;

  @IsNumber()
  custo: number;

  @IsDateString()
  dataLimite: string;

  constructor(nome: string, custo: number, dataLimite: string) {
    this.nome = nome ?? '';
    this.custo = custo ?? 0;
    this.dataLimite = dataLimite ?? '';
  }
}
