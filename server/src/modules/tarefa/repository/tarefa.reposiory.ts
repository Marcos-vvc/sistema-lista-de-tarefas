import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TarefaRepository {
  constructor(public readonly prismaService: PrismaService) {}

  async criar(task: Prisma.TarefaUncheckedCreateInput) {
    return await this.prismaService.tarefa.create({ data: task });
  }

  async listarTarefas() {
    return await this.prismaService.tarefa.findMany();
  }

  async editar(id: number, task: Prisma.TarefaUpdateInput) {
    const resposta = await this.prismaService.tarefa.update({
      where: { id },
      data: task,
    });

    return resposta;
  }

  async deletar(id: number) {
    return await this.prismaService.tarefa.delete({ where: { id } });
  }
}
