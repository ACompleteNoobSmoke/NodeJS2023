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

async function solution() {
    const result = await courses.find({isPublished: true, tags: 'backend'}, {_id: 0, name: 1, author: 1})
                                .sort({"author": 1});
    console.log(result);
            
}

solution();