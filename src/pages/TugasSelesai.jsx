import React, { useState } from 'react'
import Sidebar from '../components/Sidebar.jsx';
import '../styles/TugasSelesai.css'

function TugasSelesai() {
    const [tasks, setTasks] = useState([
        { id: 1, name: 'Mengerjakan Research', date: '2024-11-09', time: '17:50', completed: false },
        { id: 2, name: 'Mengerjakan Low Fidelity', date: '2024-11-09', time: '17:50', completed: false },
        { id: 3, name: 'Mengerjakan High Fidelity', date: '2024-11-09', time: '17:50', completed: false }
    ])

    const [showPopup, setShowPopup] = useState(false);
    const [newTask, setNewTask] = useState({ name: '', date: '', time: '' });

    const addNewTask = () => {
        if (newTask.name && newTask.date && newTask.time) {
            setTasks(prevTasks => [
                ...prevTasks,
                { ...newTask, id: tasks.length + 1, completed: false, time: formatTimeToAMPM(newTask.time) }
            ]);
            closePopup();
        }
    };

    const removeTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const markAsCompleted = (id) => {
        setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    const formatTimeToAMPM = (time) => {
        const [hours, minutes] = time.split(':');
        const hoursInt = parseInt(hours, 10);
        const isPM = hoursInt >= 12;
        const hours12 = hoursInt % 12 || 12;
        const ampm = isPM ? 'PM' : 'AM';
        return `${hours12}:${minutes} ${ampm}`;
    };

    return (
        <>
           <Sidebar />
            <div className="content">
                <h1>Semua Tugas</h1>
                <div className="task-container">
                    <div className="task-list">
                        {tasks.map(task => (
                            <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                                <div className="task-title">
                                    <input type="checkbox" checked={task.completed} onChange={() => markAsCompleted(task.id)} />
                                    {task.name}
                                </div>
                                <div className="task-time">
                                    {task.date}, {task.time} <i className="fas fa-times remove-task" onClick={() => removeTask(task.id)}></i>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Add Task */}
                    <div className="add-task" onClick={() => setShowPopup(true)}>
                        + Tambah tugas
                    </div>
                </div>
            </div>

            {/* Popup Calendar */}
            {showPopup && (
                <div className="popup-calendar">
                    <div className="popup-content">
                        <h2>Tambah Tugas</h2>
                        <label htmlFor="taskName">Nama Tugas:</label>
                        <input type="text" id="taskName" value={newTask.name} onChange={e => setNewTask({...newTask, name: e.target.value})} />

                        <label htmlFor="taskDate">Tanggal:</label>
                        <input type="date" id="taskDate" value={newTask.date} onChange={e => setNewTask({...newTask, date: e.target.value})} />

                        <label htmlFor="taskTime">Waktu:</label>
                        <input type="time" id="taskTime" value={newTask.time} onChange={e => setNewTask({...newTask, time: e.target.value})} />

                        <div className="buttons">
                            <button className="cancel" onClick={closePopup}>Batal</button>
                            <button className="ok" onClick={addNewTask}>OK</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default TugasSelesai;
