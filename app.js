const fs = require('fs');
const chalk = require('chalk');
const notes = require('./notes');
const yargs = require('yargs');
const { argv } = require('process');

//customize yargs version
yargs.version('1.1.0')

//create add command 
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string',
        },
        body:{
            describe: 'Note body',
            demandOption: true,
            type: 'string',
        }
    },
    handler(argv){
        notes.addNote(argv.title, argv.body)
    }
})

//Create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string',
        }
    },
    handler(argv){
        notes.removeNote(argv.title)
    }
})

//Create list command
yargs.command({
    command: 'list',
    describe: 'list all notes',
    handler(){
        notes.getNotes();
    }
})

//Create list command
yargs.command({
    command: 'read',
    describe: 'Reading a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string',
        }
    },
    handler(argv){
        notes.readNote(argv.title);
    }
})

yargs.parse();
