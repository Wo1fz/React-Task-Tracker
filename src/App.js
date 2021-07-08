import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import About from './components/About'

const getLocalStorage = () => {
  let ttList = localStorage.getItem('taskTracker')

  if (ttList) {
    return JSON.parse(localStorage.getItem('taskTracker'))
  } else {
    return []
  }
}

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState(getLocalStorage())

  //Add Task
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1
    const newTask = { id, ...task }
    setTasks([...tasks, newTask])
  }

  // Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const toggleReminder = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    )
  }

  useEffect(() => {
    localStorage.setItem('taskTracker', JSON.stringify(tasks))
  }, [tasks])

  return (
    <Router>
      <div className='container'>
        <Header
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />
        <Route
          path='/'
          exact
          render={(props) => (
            <>
              {showAddTask && <AddTask onAdd={addTask} />}
              {tasks.length > 0 ? (
                <Tasks
                  tasks={tasks}
                  onDelete={deleteTask}
                  onToggle={toggleReminder}
                />
              ) : (
                'No Tasks To Show'
              )}
            </>
          )}
        />
        <Route path='/about' component={About} />
        <Footer />
      </div>
    </Router>
  )
}

// package.json - scripts
// "server": "json-server --watch db.json --port 5000"

// useEffect(() => {
//   const getTasks = async () => {
//     const tasksFromServer = await fetchTasks()
//     setTasks(tasksFromServer)
//   }

//   getTasks()
// }, [])

// Fetch Tasks from server
// const fetchTasks = async () => {
//   const res = await fetch('http://localhost:5000/tasks')
//   const data = await res.json()

//   return data
// }

// Fetch Task
// const fetchTask = async (id) => {
//   const res = await fetch(`http://localhost:5000/tasks/${id}`)
//   const data = await res.json()

//   return data
// }

//Add Task
// const addTask = async (task) => {
//   const res = await fetch('http://localhost:5000/tasks', {
//     method: 'POST',
//     headers: {
//       'Content-type': 'application/json',
//     },
//     body: JSON.stringify(task),
//   })

//   const data = await res.json()
//   setTasks([...tasks, data])
// }

// Delete Task
// const deleteTask = async (id) => {
//   await fetch(`http://localhost:5000/tasks/${id}`, { method: 'DELETE' })
//   setTasks(tasks.filter((task) => task.id !== id))
// }

// Toggle Reminder
//   const toggleReminder = async (id) => {
//     const taskToToggle = await fetchTask(id)
//     const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

//     const res = await fetch(`http://localhost:5000/tasks/${id}`, {
//       method: 'PUT',
//       headers: {
//         'Content-type': 'application/json',
//       },
//       body: JSON.stringify(updTask),
//     })

//     const data = await res.json()

//     setTasks(
//       tasks.map((task) =>
//         task.id === id ? { ...task, reminder: data.reminder } : task
//       )
//     )
//   }

//   return (
//     <Router>
//       <div className='container'>
//         <Header
//           onAdd={() => setShowAddTask(!showAddTask)}
//           showAdd={showAddTask}
//         />
//         <Route
//           path='/'
//           exact
//           render={(props) => (
//             <>
//               {showAddTask && <AddTask onAdd={addTask} />}
//               {tasks.length > 0 ? (
//                 <Tasks
//                   tasks={tasks}
//                   onDelete={deleteTask}
//                   onToggle={toggleReminder}
//                 />
//               ) : (
//                 'No Tasks To Show'
//               )}
//             </>
//           )}
//         />
//         <Route path='/about' component={About} />
//         <Footer />
//       </div>
//     </Router>
//   )
// }

export default App