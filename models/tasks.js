import { Task } from './task.js';

export class Tasks {


    get list(){
        const array = [];
        Object.keys(this._list).forEach(key => array.push(this._list[key]))
        return array;
    }

    constructor() {
        this._list = {};
    }

    addTask(desc) {
        const task = new Task(desc);
        this._list[task.id] = task;
        return task;
    }

    loadTasksFromArray(tasks=[]){
        tasks.forEach(task => {
            this._list[task.id] = task;
        })
    }

    listTasks() {
        
        if(Object.keys(this._list).length === 0){
            console.log('There are no tasks to list'.red)
            return;
        }
        console.log('\n')
        this.list.forEach((element, i) => {
            let idx = `${i + 1}.`.green;
            console.log(`${idx} ${element.desc} :: ${element.completedAt ? 'Completed'.green : 'Uncompleted'.red}`);
        })
    }

    listTasksByStatus(status) {
        console.log('\n')
        let idx = 1;
        this.list.forEach((element) => {
            if(status && element.completedAt){
                console.log(`${(idx+'.').green} ${element.desc} :: ${(element.completedAt+'').green}`);
                idx++;
            } else if(!status && !element.completedAt){
                console.log(`${(idx+'.').green} ${element.desc} :: ${'Uncompleted'.red}`);
                idx++;
            }
        })
    }

    deleteTask(id) {
        if(this._list[id]){
            delete this._list[id];
        }
    }

    completeTask(ids=[]) {

        this.list.forEach(task => {
            if(ids.includes(task.id)){
                task.completedAt = new Date().toISOString();
            } else {
                task.completedAt = null;
            }
        })
    }
}