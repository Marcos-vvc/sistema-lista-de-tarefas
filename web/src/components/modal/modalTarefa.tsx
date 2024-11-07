import * as Dialog from '@radix-ui/react-dialog'
import styles from './modal.module.css'
import { Pencil, X } from '@phosphor-icons/react'
import React from 'react'
import { IDadosTarefa } from '../task/tarefaList'

interface IModalTarefaProps {
  handleSubmit: (e: React.FormEvent) => void;
  setDadosTarefas: React.Dispatch<React.SetStateAction<IDadosTarefa>>;
  dadosTarefas: IDadosTarefa;
  isEditing: boolean;
}

export function ModalTarefa({
  handleSubmit,
  setDadosTarefas,
  dadosTarefas,
  isEditing,
}: IModalTarefaProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        {isEditing
          ? (
            <Pencil className={styles.Pencil} size={24} />
            )
          : (
            <button className={`${styles.Button} violet`}>Adicionar</button>
            )}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.Overlay} />
        <Dialog.Content className={styles.Content}>
          <Dialog.Title className={styles.Title}>
            {isEditing
              ? 'Editar Tarefa'
              : 'Adicionar Tarefa'}
          </Dialog.Title>

          <Dialog.Close className={styles.Close}>
            <X size={24} />
          </Dialog.Close>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nome"
              value={dadosTarefas.nome}
              onChange={(e) =>
                setDadosTarefas((prevState) => ({
                  ...prevState,
                  nome: e.target.value,
                }))}
              required
            />
            <input
              type="number"
              placeholder="Custo"
              value={dadosTarefas.custo}
              onChange={(e) =>
                setDadosTarefas((prevState) => ({
                  ...prevState,
                  custo: Number(e.target.value),
                }))}
              required
            />
            <input
              type="date"
              placeholder="Data"
              value={dadosTarefas.dataLimite}
              onChange={(e) =>
                setDadosTarefas((prevState) => ({
                  ...prevState,
                  dataLimite: e.target.value,
                }))}
              required
            />

            <button type="submit">
              {isEditing
                ? 'Editar Tarefa'
                : 'Adicionar Tarefa'}
            </button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
