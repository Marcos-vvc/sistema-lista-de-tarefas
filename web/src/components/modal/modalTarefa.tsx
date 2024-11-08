import * as Dialog from '@radix-ui/react-dialog'
import styles from './modal.module.css'
import React from 'react'
import { IDadosTarefa } from '../task/tarefaList'
import { X } from '@phosphor-icons/react'

interface IModalTarefaProps {
  handleSubmit: (e: React.FormEvent) => void;
  setDadosTarefas: React.Dispatch<React.SetStateAction<IDadosTarefa>>;
  dadosTarefas: IDadosTarefa;
  isEditing: boolean;
  open: boolean;
  onClose: ()=>void;
}

export function ModalTarefa({
  handleSubmit,
  setDadosTarefas,
  dadosTarefas,
  isEditing,
  open,
  onClose,
}: IModalTarefaProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Trigger asChild />
      <Dialog.Portal>
        <Dialog.Overlay className={styles.Overlay} />
        <Dialog.Content className={styles.Content}>
          <Dialog.Title className={styles.Title}>
            {isEditing
              ? 'Editar Tarefa'
              : 'Adicionar Tarefa'}
          </Dialog.Title>

          <Dialog.Close className={styles.Close} onClick={onClose}>
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
              placeholder="Custo"
              value={dadosTarefas.custo}
              onChange={(e) =>
                setDadosTarefas((prevState) => ({
                  ...prevState,
                  custo: (e.target.value),
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
