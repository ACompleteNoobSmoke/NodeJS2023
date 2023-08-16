const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongo-exercises')
.then(() => console.log('Connected To MongoDB...'))
.catch(err => console.err('Could Not Connect To MongoDB...', err));



const courseSchema = new mongoose.Schema({
    name: {type: String, required: true},
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

async function createCourse () {
    courses.init();

    const course = new courses({
        //name: 'The Shining of Java',
        isPublished: false,
        author: 'Stephen King',
        tags: ['java', 'backend'],
        price: 15
    });

    try{
        await course.validate();
        // const result = await course.save();
        // console.log(result);
    }catch(ex){
        console.log(ex.message);
    }
    
}

async function updateCourse(id) {
    const course = await courses.findByIdAndUpdate(id, {
        author: 'Jackie Chan',
        isPublished: true
    }, {new: true});
    console.log(course);
}

async function removeCourse (id) {
    const result = await courses.findByIdAndRemove(id);
    console.log(result);
}



//solution(getPublishedBackend);

//solution(getPublished);

//solution(getPublishedByor15);

//updateCourse('5a68fdf95db93f6477053ddd');

//removeCourse('5a68fdf95db93f6477053ddd');

createCourse();