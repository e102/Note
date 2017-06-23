const lodash = require('lodash');
const yargs = require('yargs');


const title_options = {
    describe: 'Title of the note',
    demand: true,
};

input_array = yargs.command('add', 'Add a new note', {
    title: title_options,
    body: {
        describe: 'The content of your note',
        demand: false    //title only notes such as 'buy milk' should be allowed
    }
})
    .command('list', 'List all notes')
    .command('read', 'Read a note', {
        title: title_options
    })
    .command('remove', 'Remove a note', {
        title: title_options
    })
    .help()
    .argv;

const command = input_array._[0];
const title = input_array._[1];
const text = input_array._[2];

parse_command(command, title, text);


function parse_command(command, title, text) {
    const notes = require('./notes');

    if (command === "add") {
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
        console.log(`Command not recognized. Type --help to see a list of commands`);
    }
}