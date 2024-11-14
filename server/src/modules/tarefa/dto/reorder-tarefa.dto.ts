import { IsNumber } from 'class-validator';

export class ReorderTarefaDto {
  @IsNumber()
  ordemApresentacao: number;
}
