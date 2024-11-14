import styles from './tarefa.module.css'
import { Pencil, Trash } from '@phosphor-icons/react'
import { formatDate, priceFormatter } from '../../utils/formatter'
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
  const { setData, tarefas, loading, post, get, put, patch, del } = useTarefas()

  const defaultDadosTarefa: IDadosTarefa = {
    nome: '', custo: '', dataLimite: '',
  }
  const [dadosTarefas, setDadosTarefas] =
  useState<IDadosTarefa>(defaultDadosTarefa)

  const [openModal, setOpenModal] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editId, setEditId] = useState<number | null>(null)

  const [draggedTask, setDraggedTask] =
  useState<{ id: number; index: number } | null>(null)

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

  const handleDragStart = (id: number, index: number) => {
    setDraggedTask({ id, index })
  }

  const handleDrop = async (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault()

    if (draggedTask && tarefas) {
      const { id, index: startIndex } = draggedTask

      const updatedTarefas = [...tarefas]
      const [draggedItem] = updatedTarefas.splice(startIndex, 1)

      updatedTarefas.splice(dropIndex, 0, draggedItem)

      setData(updatedTarefas)

      await patch(id, dropIndex)

      await get()

      setDraggedTask(null)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  if (loading) return <div className={styles.loading}>Carregando...</div>

  return (
    <div className={styles.tarefasContainer}>
      {tarefas && tarefas.length > 0
        ? (
          <div className={styles.tarefasTable}>
            {tarefas?.sort((a, b) => a.ordemApresentacao - b.ordemApresentacao)
              .map((tarefa, index) => {
                const custoStyle = parseFloat(tarefa.custo) >= 1000
                  ? { backgroundColor: 'yellow' }
                  : {}

                return (
                  <div
                    key={tarefa.id}
                    className={styles.tarefaRow}
                    style={custoStyle}
                    draggable
                    onDragStart={() => handleDragStart(tarefa.id, index)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, index)}
                  >
                    <div className={styles.tarefaCell}>{tarefa.nome}</div>
                    <div className={styles.tarefaCell}>
                      {priceFormatter.format(parseFloat(tarefa.custo))}
                    </div>
                    <div className={styles.tarefaCell}>
                      {formatDate(tarefa.dataLimite)}
                    </div>
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
