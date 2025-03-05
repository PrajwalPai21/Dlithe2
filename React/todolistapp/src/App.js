import React from "react";
import { useState } from "react";

function App(){
    const [tasksArr,setTasks] = useState([]);
    const [input, setInput] = useState('')

    const addTaskFunc = () =>{
        if(input.trim()){
                // ... tasks creates a seperate array
            setTasks([...tasksArr,{text:input, completed: false}]);
            setInput('');
        }
    }

    const completeTaskFunc = (index) =>{
        setTasks(tasksArr.map((task,i) =>{
            if(i === index)
                if(task.completed)
                    return {...task,completed:false};
                else 
                    return{...task,completed:true};
            else
                return task;
        }))
    }

    const checkTaskFunc = (index) => {
        const newTasks = tasksArr.map((task,i) =>{
                if(i === index) 
                                                //true becomes false and vice versa
                    return {...task,completed: !task.completed}
                else 
                    return task;
            }
        );
        setTasks(newTasks); //state update
    }

    const deleteTaskFunc = (index) =>{
        const newTasks =  tasksArr.filter((_,i) => i !== index);
        setTasks(newTasks);
    };

    return (
      <>
      <div className="input-container">
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Add a New Task"></input>
        <button onClick={addTaskFunc}>Submit</button>
      </div>

      <ul className="tasksList">
        {tasksArr.map((task,index) => (
            <li key={index} className={task.completed ? 'task completed' : 'task'}>
            <div onClick={() => checkTaskFunc(index)}>{task.text}</div>
            <button className="completeButton" onClick={() => completeTaskFunc(index)}>Completed</button>
            <button className="completedButton" onClick={() => deleteTaskFunc(index)}>Delete Task</button>
        </li>        
            ))}
      </ul>
      </>  
    );
};


export default App;