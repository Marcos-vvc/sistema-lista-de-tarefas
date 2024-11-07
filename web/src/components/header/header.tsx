import styles from './header.module.css'

export function Header() {
  return (
    <div>
      <header className={styles.header}>
        <h2>Lista de Tarefas</h2>
      </header>
    </div>
  )
}
