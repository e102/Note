const file_system = require('fs');
const lodash = require('lodash');
const yargs = require('yargs');

const notes = require('./notes');

const yargs_argv = yargs.argv;
input_array = yargs_argv._;

let command = input_array[0];
let title = input_array[1];
let text = input_array[2];


if (command === "add") {
    try {
        let new_note = notes.add(title, text);
        console.log(`Added note with title ${new_note.title}`);

    } catch (e) {
        console.log(e);
    }
}
else if (command === "list") {
    notes_list = notes.list();
    for (let i = 0; i < notes_list.length; i++) {
        console.log(notes_list[i]);
    }
}
else if (command === "read") {
    console.log(notes.read(title));
}
else if (command === "remove") {
    try {
        let deleted_note = notes.remove(title);
        console.log(`Deleted note with title ${deleted_note.title}`);
    } catch (e) {
        console.log(e);
    }
}
else if (command === "help") {
    console.log(notes.showHelp());
}
else {
    console.log(`Command not recognized. Type help to see a list of commands`);
}
