import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { TarefaModule } from './modules/tarefa/tarefa.module';

@Module({
  imports: [TarefaModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
