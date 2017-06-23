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

let add = (title, text) => {
    let new_note = {
        title,
        text
    };

    let all_notes = fetch_all_notes();
    for (let i = 0; i < all_notes.length; i++) {
        if (new_note.title === all_notes[i].title) {
            throw "A note with that title already exists";
        }
    }

    all_notes.push(new_note);
    save_notes(all_notes);
    return new_note;
};

let remove = (title) => {
    let all_notes = fetch_all_notes();
    let filtered_notes = all_notes.filter(note => note.title !== title);

    if (all_notes.length === filtered_notes.length) {
        throw "No note with this title found";
    }

    else {
        save_notes(filtered_notes);
        return {
            title: title
        };
    }
};

let list = () => {
    let all_notes = fetch_all_notes();

    if (all_notes.length === 0) {
        throw "No notes found";
    }
    else {
        return all_notes;
    }
};

let read = (title) => {
    let all_notes = fetch_all_notes();
    let target_notes = all_notes.filter(note => note.title === title);

    if (target_notes.length === 1) {
        return target_notes[0];
    }
    else if (target_notes.length === 0) {
        throw `No note with title ${title} found.`;
    }
    else if (target_notes.length > 1) {
        throw `Multiple notes with that name found`;
    }
    else {
        throw `Unexpected error`;
    }
};

module.exports = {
    add,
    remove,
    list,
    read,
};

