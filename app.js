import colors from 'colors';
import { readFile, saveFile } from './helpers/file.js';
import { inquirerMenu, pause, inputRead, listTaskToDelete, confirm, listTaskToComplete } from './helpers/inquirer.js';
import { Tasks } from './models/tasks.js';
const main = async () => {
    const tasks = new Tasks();

    const tasksDB = readFile();
    if (tasksDB) {
        tasks.loadTasksFromArray(tasksDB);
    }
    let answer = ''
    while (answer !== 7) {
        answer = await inquirerMenu()
        switch (answer) {
            case 1:
                const desc = await inputRead('Enter a description for your task:')
                tasks.addTask(desc)
                break
            case 2:
                tasks.listTasks()
                break
            case 3:
                tasks.listTasksByStatus(true)
                break
            case 4:
                tasks.listTasksByStatus(false)
                break
            case 5:
                const tasksToComplete = await listTaskToComplete(tasks.list)
                tasks.completeTask(tasksToComplete)
                break
            case 6:
                const task = await listTaskToDelete(tasks.list)
                if (task === 0) {
                    break
                }
                const response = await confirm(`Are you sure you want to delete the task?`)
                if (response) {
                    tasks.deleteTask(task)
                    console.log(`Task deleted`.red)
                } else {
                    console.log(`Task not deleted`.green)
                }
                break
        }

        saveFile(tasks.list);
        if(answer!==7){
            console.log('\n')
            await pause()
        }
    }
}

main()