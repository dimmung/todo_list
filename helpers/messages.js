require('colors')

const displayMenu = () => {

    return new Promise((resolve, reject) => {
        console.clear()
        console.log('TODO LIST'.green)
        console.log('1. Add task'.green)
        console.log('2. List tasks'.green)
        console.log('3. List completed tasks'.green)
        console.log('4. List uncompleted tasks'.green)
        console.log('5. Complete tasks'.green)
        console.log('6. Delete task'.green)
        console.log('0. Exit'.green)

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })

        readline.question(`\nSelect an option: `, (answer) => {
            resolve(answer)
            readline.close()
        })
    })
}

const pause = () => {
    return new Promise((resolve, reject) => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })

        readline.question(`\nPress ${'ENTER'.green} to continue`, (answer) => {  
            readline.close()
            resolve()
        })
    })
}

module.exports = {
    displayMenu,
    pause
}