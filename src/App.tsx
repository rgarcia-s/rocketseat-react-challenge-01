import {PlusCircle} from 'phosphor-react';

import styles from './App.module.css';
import { Header } from './components/Header';

import clipboard from './assets/clipboard.svg';

import './global.css';

function App() {

  return (
    <>
      <Header />
      <main className={styles.wrapper}>
        <form action="submit" className={styles.form}>
          <input placeholder='Adicione uma nova tarefa'/>
          <button type='submit'>
            Criar
            <PlusCircle />
          </button>
        </form>

        <div className={styles.listContainer}>
          <div className={styles.listHeader}>
            <strong>Tarefas criadas <span>0</span></strong>
            <strong>Concluídas <span>0</span></strong>
          </div>

          <div className={styles.listContent}>
            <img src={clipboard} alt="Lista de tarefas vazia" />
            <strong>Você ainda não tem tarefas cadastradas</strong>
            <p>Cria tarefas e organize seus itens a fazer</p>
          </div>
        </div>
      </main>
    </>
  )
}

export default App
