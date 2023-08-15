const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongo-exercises')
.then(() => console.log('Connected To MongoDB...'))
.catch(err => console.err('Could Not Connect To MongoDB...', err));



const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: Date,
    isPublished: Boolean,
    price: Number
});

const courses = mongoose.model('courses', courseSchema);

const getPublishedBackend = async () => await courses.find({isPublished: true, tags: 'backend'})
                                                     .sort({name: 1})
                                                     .select({name: 1, author: 1, _id: 0});

const getPublished = async () => await courses.find({isPublished: true})
                                              .sort({price : -1})
                                              .select({name: 1, author: 1, _id: 0});

async function solution(database) {
    const result = await database();
    console.log(result);
}

//solution(getPublishedBackend);

solution(getPublished);