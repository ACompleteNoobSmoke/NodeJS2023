const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors:{
    type: [authorSchema],
    required: true
  }
}));

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor (courseID) {
  const course = await Course.updateOne({_id: courseID}, {
    $unset: {
      'author' : ''
    }
  })

  console.log(course);
}

async function addAuthor (courseID, author) {
  const course = await Course.findById(courseID);
  course.authors.push(author);
  course.save();
  console.log(course);
}

async function removeAuthor(courseID, authorID) {
  const course = await Course.findById(courseID);
  course.authors.remove({_id: authorID});
  course.save();
  console.log(course);
}

// createCourse('Node Course', [
//   new Author({ name: "Sean O'Malley" }),
//   new Author({ name: 'Aljaman Sterling'})
// ]);

// updateAuthor('64e22a107bb54042d3ce1c62');

// addAuthor('64e22dff15ab21833f8ef869', new Author({name: 'Joanna Jedrzyck'}));

removeAuthor('64e22dff15ab21833f8ef869', '64e23182249533cbf54632a7');


