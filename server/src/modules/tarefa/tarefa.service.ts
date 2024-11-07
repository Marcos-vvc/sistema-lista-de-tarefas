import { BadRequestException, Injectable } from '@nestjs/common';
import { TarefaRepository } from './repository/tarefa.reposiory';
import { CriarTarefaDto } from './dto/criar-tarefa.dto';
import * as dayjs from 'dayjs';
import { EditarTarefaDto } from './dto/editar-tarefa.dto';

@Injectable()
export class TarefaService {
  constructor(private readonly tarefaRepository: TarefaRepository) {}

  async criar(criarTarefaDto: CriarTarefaDto) {
    await this.tarefaExistente(criarTarefaDto.nome);
    const maxOrdem = await this.tarefaRepository.prismaService.tarefa.aggregate(
      {
        _max: {
          ordemApresentacao: true,
        },
      },
    );

    const novaOrdem = (maxOrdem._max.ordemApresentacao || 0) + 1;

    const dataLimite = dayjs(criarTarefaDto.dataLimite).startOf('day').toDate();

    const tarefa = await this.tarefaRepository.criar({
      ...criarTarefaDto,
      dataLimite,
      ordemApresentacao: novaOrdem,
    });

    return {
      ...tarefa,
      dataLimite: dayjs(tarefa.dataLimite).locale('pt-br').format('DD/MM/YYYY'),
    };
  }

  async listarTarefas() {
    const tarefas = await this.tarefaRepository.listarTarefas();

    return tarefas.map((t) => ({
      ...t,
      dataLimite: dayjs(t.dataLimite).locale('pt-br').format('DD/MM/YYYY'),
    }));
  }

  async editar(id: number, editarTarefaDto: EditarTarefaDto) {
    const dataLimite = dayjs(editarTarefaDto.dataLimite)
      .startOf('day')
      .toDate();

    await this.tarefaExistente(editarTarefaDto.nome);
    const editarTarefa = await this.tarefaRepository.editar(id, {
      ...editarTarefaDto,
      dataLimite,
    });

    return {
      ...editarTarefa,
      dataLimite: dayjs(editarTarefa.dataLimite)
        .locale('pt-br')
        .format('DD/MM/YYYY'),
    };
  }

  private async tarefaExistente(nome: string) {
    const tarefaExistente =
      await this.tarefaRepository.prismaService.tarefa.findFirst({
        where: { nome },
      });

    if (tarefaExistente) {
      throw new BadRequestException('Nome de tarefa já existente.');
    }
  }

  async deletar(id: number) {
    await this.tarefaRepository.deletar(id);
  }
}
