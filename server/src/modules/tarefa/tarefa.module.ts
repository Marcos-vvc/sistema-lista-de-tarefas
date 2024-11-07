import { Module } from '@nestjs/common';
import { TarefaController } from './tarefa.controller';
import { TarefaService } from './tarefa.service';
import { TarefaRepository } from './repository/tarefa.reposiory';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [TarefaController],
  providers: [TarefaService, TarefaRepository, PrismaService],
})
export class TarefaModule {}
