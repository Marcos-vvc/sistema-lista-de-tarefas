import styles from './tarefa.module.css'
import { Trash } from '@phosphor-icons/react'
import { formatDate, priceFormatter } from '../../utils/formatter'
import { useTarefas } from '../../hook/useTarefas'
import React, { useState } from 'react'
import Clip from '../../assets/Clipboard.png'
import { ModalTarefa } from '../modal/modalTarefa'

export interface IDadosTarefa {
  nome: string;
  custo: number;
  dataLimite: string;
}

export function TarefaList() {
  const { tarefas, loading, post, get, put, del } = useTarefas()

  const defaultDadosTarefa: IDadosTarefa = {
    nome: '', custo: 0, dataLimite: '',
  }
  const [dadosTarefas, setDadosTarefas] =
  useState<IDadosTarefa>(defaultDadosTarefa)

  const handleAddTarefa = async (e: React.FormEvent) => {
    e.preventDefault()

    const newTarefa = {
      nome: dadosTarefas.nome,
      custo: dadosTarefas.custo,
      dataLimite: dadosTarefas.dataLimite,
    }

    await post(newTarefa)

    await get()

    setDadosTarefas(defaultDadosTarefa)
  }

  const handleUpdateTarefa = async (id: number, e: React.FormEvent) => {
    e.preventDefault()

    const newTarefa = {
      nome: dadosTarefas.nome,
      custo: dadosTarefas.custo,
      dataLimite: dadosTarefas.dataLimite,
    }

    await put(id, newTarefa)

    await get()

    setDadosTarefas(defaultDadosTarefa)
  }

  const handleDeleteTarefa = async (id: number) => {
    const confirmed = window.confirm(
      'Tem certeza que deseja deletar esta tarefa?',
    )

    if (confirmed) {
      await del(id)
    }
  }

  if (loading) return <div>Carregando...</div>

  return (
    <div className={styles.tarefasContainer}>

      {tarefas && tarefas.length > 0
        ? (
          <div className={styles.tarefasTable}>

            {tarefas?.map((tarefa) => {
              const custoStyle = tarefa.custo >= 1000
                ? { backgroundColor: 'yellow' }
                : {}

              return (
                <div
                  key={tarefa.id}
                  className={styles.tarefaRow}
                  style={custoStyle}
                >
                  <div className={styles.tarefaCell}>{tarefa.nome}</div>
                  <div className={styles.tarefaCell}>
                    {priceFormatter.format(tarefa.custo)}
                  </div>
                  <div className={styles.tarefaCell}>{tarefa.dataLimite}</div>
                  <div className={styles.icon}>

                    <ModalTarefa
                      dadosTarefas={{
                        nome: tarefa.nome,
                        custo: tarefa.custo,
                        dataLimite: formatDate(tarefa.dataLimite),
                      }}
                      handleSubmit={(e) =>
                        handleUpdateTarefa(tarefa.id, e)}
                      setDadosTarefas={setDadosTarefas}
                      isEditing
                    />
                    <Trash
                      className={styles.Trash}
                      onClick={() => handleDeleteTarefa(tarefa.id)}
                      size={24}
                    />

                  </div>
                </div>
              )
            })}
          </div>
          )
        : (

          <div className={styles.containerNoTasks}>
            <img src={Clip} alt="" />
            <p>Você ainda não tem tarefas cadastradas</p>
            <span>Crie tarefas e organize seus itens a fazer</span>
          </div>
          )}
      <ModalTarefa
        handleSubmit={handleAddTarefa}
        dadosTarefas={dadosTarefas}
        setDadosTarefas={setDadosTarefas}
        isEditing={false}
      />
    </div>
  )
}
