import { baseURL } from '../constants/baseURL'
import useApi, { Tarefa } from './apiResult'

export function useTarefas() {
  const { data: tarefas, setData, loading, get, post, put, del } =
  useApi<Tarefa[]>(`${baseURL}/tarefa`)

  return { tarefas, loading, setData, get, post, put, del }
}
