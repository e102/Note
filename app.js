const lodash = require('lodash');
const yargs = require('yargs');

input_array = yargs.argv._;

let command = input_array[0];
let title = input_array[1];
let text = input_array[2];

parse_command(command, title, text);


function parse_command(command, title, text) {
    const notes = require('./notes');

    if (command === "help") {
        console.log(notes.showHelp());
    }

    else if (command === "add") {
        try {
            let new_note = notes.add(title, text);
            console.log(`Added note with title ${new_note.title}`);

        } catch (e) {
            console.log(e);
        }
    }

    else if (command === "read") {
        try {
            let target_note = notes.read(title);
            console.log(`
            Title: ${target_note.title}
            Text: ${target_note.text}
            `);
        }
        catch (e) {
            console.log(e);
        }
    }

    else if (command === "list") {
        try {
            let notes_list = notes.list();
            notes_list.forEach((note) => console.log(note.title));
        } catch (e) {
            console.log(e);
        }
    }

    else if (command === "remove") {
        try {
            let deleted_note = notes.remove(title);
            console.log(`Deleted note with title ${deleted_note.title}`);
        } catch (e) {
            console.log(e);
        }
    }
    else {
        console.log(`Command not recognized. Type help to see a list of commands`);
    }
}