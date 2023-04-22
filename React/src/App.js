import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'
import { useState , useEffect } from 'react'
import {BrowserRouter as Router ,Routes,Route} from 'react-router-dom'

function App() {
  const [showAddTask , setshowAddTask] = useState(false)

  const [tasks , setTask] = useState([])

useEffect(() =>{
  const getTasks = async()=>{
    const tasksFromServer = await fetchTasks()
    setTask(tasksFromServer)
  }
  getTasks()
},[])

//Fetch Tasks
const fetchTasks = async () => {
  const res  = await fetch('http://127.0.0.1:8000/tasks/')
  const data = await res.json()
  console.log(data)
  return data 
}
 
//Add Task
const addTask = async (task)=>{
  const res = await fetch('http://127.0.0.1:8000/tasks/',
  {
    method : 'POST',
    headers : {
      'Content-type': 'application/json'
    },
    body :JSON.stringify(task)
  })
  const data = res.json()
  setTask([...tasks,data])
}

//Delete Task
const deleteTask = async (id) => {
  await fetch(`http://127.0.0.1:8000/tasks/${id}`,{method : 'DELETE'})

  setTask(tasks.filter((task) => task.id !== id
  ))
}

//Toggle Reminder
const Reminder =  async (id) => {
  const taskToToggle = await fetchTask(id)
  const updateTask = {...taskToToggle,reminder:!taskToToggle.reminder}
  
  const res = await fetch(`http://127.0.0.1:8000/tasks/${id}`,{
    method :'PUT',
    headers : {'Content-Type': 'application/json'},
    body : JSON.stringify(updateTask)
})
const data = await res.json()
  setTask(
    tasks.map((task) => 
    task.id === id ? { ...task , reminder : data.reminder}:task
    )
  )
}

const fetchTask = async (id) => {
  const res  = await fetch(`http://127.0.0.1:8000/tasks/${id}`)
  const data = await res.json()
  return data 
}

const app_name = 'ToDoList'
  return (
    <Router>
      <div className="container">
        <Header app_name = 'TaskTracker' onAdd= {()=> setshowAddTask(!showAddTask)} showAdd = {showAddTask}/>
        
        <Routes>
          <Route path = '/' element = {
            <>
            {showAddTask && <AddTask onAdd = {addTask}/>}
            {tasks.length > 0 ? (<Tasks tasks = {tasks} onDelete = {deleteTask} onToggle = {Reminder}/>) : ("No Task Left")}
            </>
          }/>
          <Route path = '/about' element = {<About />} />
          </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
