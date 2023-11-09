import React, { useState, useEffect } from 'react';

const ToDoList = () => {
    const [entradaTarea, setEntradaTarea] = useState("");
    const [tareas, setTareas] = useState(getListaToDo());
    useEffect(() => {
        guardarListaToDo(tareas);
    }, [tareas]);
    function getListaToDo() {
        var listaGuardada = localStorage.getItem('localToDoList');
        if (listaGuardada == null) {
            return [];
        } else {
            return JSON.parse(listaGuardada);
        }
    }
    function guardarListaToDo(listaToDo) {
        localStorage.setItem('localToDoList', JSON.stringify(listaToDo));
    }
    function crearTarea(event) {
        event.preventDefault();
        setTareas((currentTasks) => [
            ...currentTasks,
            { id: crypto.randomUUID(), title: entradaTarea, completed: false },
        ]);
        setEntradaTarea("");
    }

    function marcarCompletacionTarea(id, completed) {
        setTareas(currentTasks => {
            return currentTasks.map(task => {
                if (task.id === id) {
                    task.completed = completed;
                    return { ...task, completed }
                }
                return task;
            })
        })
    }

    function eliminarTareasCompletadas() {
        setTareas(currentTasks => {
            return currentTasks.filter(task => !task.completed);
        })
    }

    function eliminarTodaTarea() {
        setTareas([]);
    }

    return (
        <div className="listaToDo">
            <h1>Lista de Tareas a Hacer</h1>
            <form onSubmit={crearTarea} className="entradas">
                <input type="text" placeholder="Ingrese su Tarea a Completar" value={entradaTarea} onChange={(event) => {
                    setEntradaTarea(event.target.value);
                }} />
                <br/>
                <br/>
                <button>Crear Tarea</button>
            </form>
            <br/>
            <br/>
            <div className="listadoCheckboxes">
                <ul className="listadoTareas">
                    {tareas.map(task => {
                        return (
                            <h4>
                                <li key={task.id}>
                                <label>
                                    <input type="checkbox" checked={task.completed} onChange={event => {
                                        marcarCompletacionTarea(task.id, event.target.checked)
                                    }}></input>
                                    {task.title}
                                </label>
                                </li>
                            </h4>
                            
                        )
                    })}
                </ul>
            </div>
            <div className="botonesEliminar">
                    <button className="btn" onClick={() => {
                        eliminarTareasCompletadas();
                    }}><h4>Eliminar Tareas completadas</h4></button>
                    <button className="btn" onClick={() => {
                        eliminarTodaTarea();
                    }}><h4>Eliminar Lista Completa</h4></button>
            </div>
        </div>
    );
};

export default ToDoList;