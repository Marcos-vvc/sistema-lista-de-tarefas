-- CreateTable
CREATE TABLE "Tarefa" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "custo" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "dataLimite" TIMESTAMP(3) NOT NULL,
    "ordem_apresentacao" INTEGER NOT NULL,

    CONSTRAINT "Tarefa_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tarefa_ordem_apresentacao_key" ON "Tarefa"("ordem_apresentacao");
