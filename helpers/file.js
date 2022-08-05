import fs  from 'fs';

const archivo = './db/data.json'

export const saveFile = data => {
    fs.writeFileSync(archivo,JSON.stringify(data));
}

export const readFile = () => {
    if(!fs.existsSync(archivo)){
        return null
    }
    return JSON.parse(fs.readFileSync(archivo,'utf8'));
}