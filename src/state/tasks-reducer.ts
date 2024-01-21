import {TasksStateType} from '../App';
import {v1, v4} from 'uuid';

type RemoveTaskAT = {
    type: 'REMOVE_TASK'
    taskId: string
    todoID: string
}

type AddTaskAT = {
    type: 'ADD_TASK',
    newTitle: string,
    todoID: string

}

type ChangeTaskStatusAT = {
    type: 'CHANGE_TASK_STATUS'
    taskId: string
    newStatus: boolean
    todoID: string

}

type ActionsType = RemoveTaskAT | AddTaskAT | ChangeTaskStatusAT
export const tasksReducer = (state: TasksStateType, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE_TASK':
            const tasks = state[action.todoID]
            const newTasks = tasks.filter((el) => {return el.id !== action.taskId})
            state[action.todoID] = newTasks
            return {...state}
        case "ADD_TASK":
            const newTask = {id:v4(),title:action.newTitle, isDone:false}
            state[action.todoID].unshift(newTask)
            return{...state}
        case "CHANGE_TASK_STATUS": {
            const tasks = state[action.todoID]
            const foundTask = tasks.find((el) => el.id === action.taskId)
            if(foundTask){
                foundTask.isDone = action.newStatus
            }
            return {...state}
        }
        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (taskId: string, todoID: string):RemoveTaskAT => {
return {type: 'REMOVE_TASK', taskId: taskId, todoID: todoID}
}
 export const addTaskAC = (newTitle:string, todoID:string) => {
    return{type: 'ADD_TASK' as const ,newTitle,todoID}
 }

 export const changeTaskStatusAC = (taskId: string,newStatus:boolean,todoID:string) => {
    return{type: 'CHANGE_TASK_STATUS' as const, taskId, newStatus,todoID}
 }
