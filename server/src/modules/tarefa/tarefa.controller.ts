import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { TarefaService } from './tarefa.service';
import { CriarTarefaDto } from './dto/criar-tarefa.dto';
import { EditarTarefaDto } from './dto/editar-tarefa.dto';
import { ReorderTarefaDto } from './dto/reorder-tarefa.dto';

@Controller('tarefa')
export class TarefaController {
  constructor(private readonly tarefaService: TarefaService) {}

  @Post('criar-tarefa')
  async criarTarefa(@Body() criarTarefaDto: CriarTarefaDto) {
    return await this.tarefaService.criar(criarTarefaDto);
  }

  @Get()
  async listar() {
    return await this.tarefaService.listarTarefas();
  }

  @Put('/editar/:id')
  async editarTarefa(
    @Param('id') id: number,
    @Body() editarTarefaDto: EditarTarefaDto,
  ) {
    const tarefaEditada = await this.tarefaService.editar(id, editarTarefaDto);

    return tarefaEditada;
  }

  @Patch('/reorder/:id')
  async reorder(
    @Param('id') id: number,
    @Body() reorderTarefaDto: ReorderTarefaDto,
  ) {
    return this.tarefaService.reorder(id, reorderTarefaDto.ordemApresentacao);
  }

  @Delete('/deletar/:id')
  async deleteTarefa(@Param('id') id: number) {
    return await this.tarefaService.deletar(id);
  }
}
