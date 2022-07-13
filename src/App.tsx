import {Check, PlusCircle, Trash} from 'phosphor-react';

import styles from './App.module.css';
import { Header } from './components/Header';

import clipboard from './assets/clipboard.svg';

import './global.css';
import { ChangeEvent, FormEvent, useState } from 'react';

interface Task {
  id: number;
  content: string;
  done: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');

  const handleTaskDone = (id: number) => {
    const tasksAux = tasks.map(task => {
      if(task.id === id) task.done = !task.done
      return task
    })

    setTasks(tasksAux)
  }

  const handleNewTaskChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.target.setCustomValidity('');
    setNewTask(event.target.value)
  }

  const handleInvalidNewTask = (event: ChangeEvent<HTMLInputElement>) => {
    event.target.setCustomValidity('Não é possível adicionar uma tarefa vazia.')
  }

  const handleCreateNewTask = (event: FormEvent) => {
    event.preventDefault();

    const lastTask = tasks.at(-1);
    let id: number;

    if(lastTask) {
      id = lastTask.id + 1;
    } else {
      id = 1
    }

    setTasks([...tasks, {
      id,
      content: newTask,
      done: false
    }])
  }

  const handleTaskDelete = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id));
  }

  const isNewTaskEmpty = newTask.length === 0;

  const completedTasksCount = tasks.reduce((prev, task) => {
    if (task.done) return prev += 1;
    return prev
  }, 0)

  return (
    <>
      <Header />
      <main className={styles.wrapper}>
        <form action="submit" 
          className={styles.form} 
          onSubmit={handleCreateNewTask}
        >
          <input 
            placeholder='Adicione uma nova tarefa'
            value={newTask}
            onChange={e => handleNewTaskChange(e)}
            onInvalid={handleInvalidNewTask}
          />
          <button type='submit' disabled={isNewTaskEmpty}>
            Criar
            <PlusCircle />
          </button>
        </form>

        <div className={styles.listContainer}>
          <div className={styles.listHeader}>
            <strong>Tarefas criadas <span>{tasks.length}</span></strong>
            <strong>Concluídas <span>{`${completedTasksCount} de ${tasks.length}`}</span></strong>
          </div>

          {tasks.length === 0 ? 
            (
              <div className={styles.emptyListContent}>
                <img src={clipboard} alt="Lista de tarefas vazia" />
                <strong>Você ainda não tem tarefas cadastradas</strong>
                <p>Cria tarefas e organize seus itens a fazer</p>
              </div>
            ) :
            tasks.map(task => (
              <div className={styles.listContent}>
                <div>
                  <div className={task.done ? styles.checkBoxDone : styles.checkBox} onClick={() => handleTaskDone(task.id)}>
                    <Check />
                  </div>
                  <p className={task.done ? styles.taskDone : ''}>{task.content}</p>
                  <button onClick={() => handleTaskDelete(task.id)}>
                    <Trash />
                  </button>
                </div>
              </div>
            ))
          }
        </div>
      </main>
    </>
  )
}

export default App
