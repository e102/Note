const fs = require('fs');

let fetch_all_notes = () => {
    if (!fs.existsSync('notes-data.json')) {
        fs.writeFileSync('notes-data.json');
    }

    try {
        let all_notes_as_string = fs.readFileSync('notes-data.json');
        return JSON.parse(all_notes_as_string);
    } catch (e) {
        console.log("oops. Something went wrong. Could not read/parse file data");
        return [];
    }
};

let save_notes = (notes_array) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes_array));
};

let add = (title, body) => {
    let current_note = {
        title,
        body
    };

    let all_notes = fetch_all_notes();
    for (let i = 0; i < all_notes.length; i++) {
        if (current_note.title === all_notes[i].title) {
            throw "A note with that title already exists";
        }
    }

    all_notes.push(current_note);
    save_notes(all_notes);
    return current_note;

};

let remove = (title) => {
    let all_notes = fetch_all_notes();

    for (let i = 0; i <= all_notes.length; i++) {
        if (all_notes[i].title === title) {
            let deleted_node = all_notes[i];
            all_notes.splice(i, 1);
            save_notes(all_notes);
            return deleted_node;
        }
    }

    throw "No note with that title found";
};

let list = () => {
    let all_notes = fetch_all_notes();
    let notes_list = [];

    if (all_notes.length === 0) {
        notes_list.push("No notes found");
    }
    else {
        for (let i = 0; i < all_notes.length; i++) {
            notes_list.push(all_notes[i].title);
        }
    }

    return notes_list;
};

let read = (title = "untitled") => {
    return "Opening note with title:" + title;
};

let showHelp = () => {
    return `
    add title=something text=something: add a note
    remove title=something: delete a note
    read: open a note
    list: list all notes`;
};

module.exports = {
    add,
    remove,
    list,
    read,
    showHelp
};

