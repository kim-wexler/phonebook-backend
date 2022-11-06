const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);
const password = process.argv[2];
const url = `mongodb+srv://fullstack:${password}@cluster0.pqhp1up.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

if (process.argv.length < 4) {
  mongoose
    .connect(url)
    .then(() => {
      console.log("connected");
      Person.find({}).then((result) => {
        result.forEach((person) => {
          console.log(person);
        });
        mongoose.connection.close();
      });
    })
    .catch((err) => console.log(err));
} else {
  const name = process.argv[3];
  const number = process.argv[4];

  mongoose
    .connect(url)
    .then(() => {
      console.log("connected");
      const person = new Person({
        name,
        number,
      });

      return person.save();
    })
    .then(() => {
      console.log("note saved!");
      return mongoose.connection.close();
    })
    .catch((err) => console.log(err));
}
