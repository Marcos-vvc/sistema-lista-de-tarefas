import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import axios from 'axios'
import { baseURL } from '../constants/baseURL'
import { IDadosTarefa } from '../components/task/tarefaList'

interface ApiResult<T> {
  data: T | null;
  loading: boolean;
  get: () => void;
  post: (payload: any) => Promise<void>;
  put: (id: number, payload: any) => Promise<void>;
  patch: (id: number, ordemApresentacao: number) => Promise<void>;
  del: (id: number) => Promise<void>;
  setData: Dispatch<SetStateAction<T | null>>;
}

export interface Tarefa {
  id: number;
  nome: string;
  custo: string;
  dataLimite: string;
  ordemApresentacao: number;
}

function useApi<T>(baseUrl: string): ApiResult<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const get = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${baseURL}/tarefa`)
      setData(response.data)
    } catch (error) {
      console.log(error || 'Erro ao buscar dados')
    } finally {
      setLoading(false)
    }
  }

  const post = async (payload: IDadosTarefa) => {
    setLoading(true)
    try {
      const response = await axios.post(
        `${baseURL}/tarefa/criar-tarefa`,
        payload)
      setData(response.data)
    } catch (error) {
      console.log(error || 'Erro ao criar dados')
    } finally {
      setLoading(false)
    }
  }

  const put = async (id: number, payload: IDadosTarefa) => {
    setLoading(true)
    try {
      const response = await axios.put(`${baseURL}/tarefa/editar/${id}`,
        payload)
      setData(response.data)
    } catch (error) {
      console.log(error || 'Erro ao atualizar dados')
    } finally {
      setLoading(false)
    }
  }
  const patch = async (id: number, ordemApresentacao: number) => {
    setLoading(true)
    try {
      const response = await axios.patch(`${baseURL}/tarefa/reorder/${id}`,
        { ordemApresentacao })
      setData(response.data)
    } catch (error) {
      console.log(error || 'Erro ao atualizar dados')
    } finally {
      setLoading(false)
    }
  }

  const del = async (id: number) => {
    setLoading(true)
    try {
      await axios.delete(`${baseURL}/tarefa/deletar/${id}`)
      await get()
    } catch (error: unknown) {
      console.log(error || 'Erro ao deletar dados')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    get()
  }, [baseUrl])

  return { data, loading, setData, get, post, put, patch, del }
}

export default useApi
