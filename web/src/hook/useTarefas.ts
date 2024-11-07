import { baseURL } from '../constants/baseURL'
import useApi, { Tarefa } from './apiResult'

export function useTarefas() {
  const { data: tarefas, loading, get, post, put, del } =
  useApi<Tarefa[]>(`${baseURL}/tarefa`)

  return { tarefas, loading, get, post, put, del }
}
