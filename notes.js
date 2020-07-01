const fs = require('fs')
const chalk = require('chalk')


const getNotes = () => {
    console.log(chalk.green.inverse('Your notes!'))
    const notes = loadNotes();
    notes.forEach((note) => console.log(note.title));
    // console.log(notes);
}

const addNote = (title, body) => {
    const notes = loadNotes();
    // const duplicateNotes = notes.filter((note) => note.title === title)
    const duplicateNote = notes.find((note) => note.title === title)

    if(!duplicateNote){
        notes.push({
            title: title,
            body: body
        })
    
        saveNotes(notes);
        console.log(chalk.green.inverse('New note added!'))

    } else {
        console.log(chalk.red.inverse('Note Title Taken!'));
    } 
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);

    } catch (e) {
        return []
    }
    
}

const removeNote = (title) => {
    const notes = loadNotes();
    const clearNotes = notes.filter((note) => note.title !== title)

    if(notes.length > clearNotes.length){
        saveNotes(clearNotes);
        console.log(chalk.green.inverse('Note removed!'))
    } else{
        console.log(chalk.red.inverse('Note doesn\'t exist'))
    }
}

const readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find((note) => note.title === title);
    
    if(note){
        console.log(chalk.green.inverse(note.title));
        console.log(note.body);
    }else{
        console.log(chalk.red.inverse("Note doesn't exist!"))
    }


}


module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    readNote: readNote
};