import inquirer from 'inquirer';
import colors from 'colors';

const questions = [
    {
        type: 'list',
        name: 'menu',
        message: 'What would you like to do?',
        choices: [
            { value: 1, name: `${'1.'.yellow} Create Task` },
            { value: 2, name: `${'2.'.yellow} List Tasks` },
            { value: 3, name: `${'3.'.yellow} List completed tasks` },
            { value: 4, name: `${'4.'.yellow} List uncompleted tasks` },
            { value: 5, name: `${'5.'.yellow} Mark task as complete` },
            { value: 6, name: `${'6.'.yellow} Remove task` },
            { value: 7, name: `${'7.'.yellow} Exit` } 

        ]
    }
]

export const inquirerMenu = async () => {
    console.clear()
    const answer = await inquirer.prompt(questions)
    return answer.menu
}

export const pause = () => {
    const question = {
        type: 'input',
        name: 'enter',
        message: `Press ${'enter'.green} to continue...`
    }

    return inquirer.prompt(question)

}

export const inputRead = async (message) => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ) {
                if ( value.length === 0){
                    return `Please enter a description for your task`
                }
                return true
            }
        }
    ]

    const { desc } = await inquirer.prompt(question)
    return desc;
}

export const listTaskToDelete = async (tasks) => {
    const choices = tasks.map((task, i) => {
        const idx = `${i + 1}.`.green;
        return {
            value: task.id,
            name: `${idx} ${task.desc}`
        }
    })
    choices.unshift({ value: 0, name: `${'0.'.green} None` })
    const question = [
        {
            type: 'list',
            name: 'task',
            message: 'Select a task to delete:',
            choices
        }
    ]
  
    const { task } = await inquirer.prompt(question)
    return task;
}

export const listTaskToComplete = async (tasks) => {
    const choices = tasks.map((task, i) => {
        const idx = `${i + 1}.`.green;
        return {
            value: task.id,
            name: `${idx} ${task.desc}`,
            checked: task.completedAt ? true : false
        }
    })
    const question = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Select a task to complete:',
            choices
        }
    ]

    const { ids } = await inquirer.prompt(question)
    return ids;
}


export const confirm = async (message) => {
    const question = [
        {
            type: 'confirm',
            name: 'confirm',
            message
        }
    ]

    const { confirm } = await inquirer.prompt(question)
    return confirm;
}
