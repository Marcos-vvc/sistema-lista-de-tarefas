import styles from './tarefa.module.css'
import { Pencil, Trash } from '@phosphor-icons/react'
import { priceFormatter } from '../../utils/formatter'
import { useTarefas } from '../../hook/useTarefas'
import React, { useState } from 'react'
import Clip from '../../assets/Clipboard.png'
import { ModalTarefa } from '../modal/modalTarefa'

export interface IDadosTarefa {
  nome: string;
  custo: string;
  dataLimite: string;
}

export function TarefaList() {
  const { tarefas, loading, post, get, put, del } = useTarefas()

  const defaultDadosTarefa: IDadosTarefa = {
    nome: '', custo: '', dataLimite: '',
  }
  const [dadosTarefas, setDadosTarefas] =
  useState<IDadosTarefa>(defaultDadosTarefa)

  const [openModal, setOpenModal] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editId, setEditId] = useState<number | null>(null)

  const handleAddTarefa = async (e: React.FormEvent) => {
    e.preventDefault()

    await post({
      nome: dadosTarefas.nome,
      custo: parseFloat(dadosTarefas.custo),
      dataLimite: dadosTarefas.dataLimite,
    })

    await get()

    setDadosTarefas(defaultDadosTarefa)
    setOpenModal(false)
  }

  const handleUpdateTarefa = async (e: React.FormEvent) => {
    e.preventDefault()

    if (editId !== null) {
      await put(editId, {
        nome: dadosTarefas.nome,
        custo: parseFloat(dadosTarefas.custo),
        dataLimite: dadosTarefas.dataLimite,
      })

      await get()

      setDadosTarefas(defaultDadosTarefa)
      setOpenModal(false)
      setIsEditing(false)
      setEditId(null)
    }
  }

  const handleDeleteTarefa = async (id: number) => {
    const confirmed = window.confirm(
      'Tem certeza que deseja deletar esta tarefa?',
    )

    if (confirmed) {
      await del(id)
    }
  }

  const handleOpenAddModal = () => {
    setDadosTarefas(defaultDadosTarefa)
    setIsEditing(false)
    setOpenModal(true)
  }

  const handleOpenEditModal = (id: number, tarefa: IDadosTarefa) => {
    setDadosTarefas(tarefa)
    setIsEditing(true)
    setEditId(id)
    setOpenModal(true)
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

                    <Pencil
                      className={styles.Pencil}
                      size={24}
                      onClick={() => handleOpenEditModal(tarefa.id, tarefa)}
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

      <button
        className={styles.Button}
        onClick={handleOpenAddModal}
      >
        Adicionar
      </button>
      <ModalTarefa
        handleSubmit={isEditing
          ? handleUpdateTarefa
          : handleAddTarefa}
        dadosTarefas={dadosTarefas}
        setDadosTarefas={setDadosTarefas}
        isEditing={isEditing}
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
    </div>
  )
}
