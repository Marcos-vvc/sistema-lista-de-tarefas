import { Header } from '../components/header/header'
import { TarefaList } from '../components/task/tarefaList'
// import styles from './page.module.css'

export function Page() {
  return (
    <div>
      <Header />
      <TarefaList />
    </div>
  )
}
