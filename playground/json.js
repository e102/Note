// //object to json
// const object = {
//     name: 'Srdjan'
// };
//
// const myJSON = JSON.stringify(object);
// console.log(myJSON);
//
// //string to json
//
// let nameString = '{"name":"Srdjan","age":23}';
// let nameObject = JSON.parse(nameString);
// console.log(nameObject.name);
// console.log(nameObject.age);

const fs = require('fs');

const original_note = {
    title: "my first note",
    body: "I'm so proud!"
};
let original_note_string = JSON.stringify(original_note);
fs.writeFileSync("notes.json", original_note_string);

let file_as_string = fs.readFileSync("notes.json");
let file_as_JSON = JSON.parse(file_as_string);
console.log(file_as_JSON.title);
