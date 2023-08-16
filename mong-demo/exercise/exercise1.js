const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongo-exercises')
.then(() => console.log('Connected To MongoDB...'))
.catch(err => console.err('Could Not Connect To MongoDB...', err));



const courseSchema = new mongoose.Schema({
    _id: String,
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
                                            
const getPublishedByor15 = async () => await courses.find({isPublished: true})
                                                    .or([
                                                        {price: {$gte: 15}},
                                                        {name: /.*by.*/i}
                                                    ])
                                                    .select();

async function solution(database) {
    const result = await database();
    console.log(result);
}

async function updateCourse(id) {
    const course = await courses.findByIdAndUpdate(id, {
        author: 'Jackie Chan',
        isPublished: true
    }, {new: true});
    console.log(course);
}



//solution(getPublishedBackend);

//solution(getPublished);

//solution(getPublishedByor15);

updateCourse('5a68fdf95db93f6477053ddd');