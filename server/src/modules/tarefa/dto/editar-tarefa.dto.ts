import { IsDateString, IsISO8601, IsNumber, IsString } from 'class-validator';

export class EditarTarefaDto {
  @IsString()
  nome: string;

  @IsNumber()
  custo: number;

  @IsDateString()
  @IsISO8601()
  dataLimite: string;

  constructor(nome: string, custo: number, dataLimite: string) {
    this.nome = nome ?? '';
    this.custo = custo ?? 0;
    this.dataLimite = dataLimite ?? '';
  }
}
