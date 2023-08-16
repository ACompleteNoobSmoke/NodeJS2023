const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongo-exercises')
.then(() => console.log('Connected To MongoDB...'))
.catch(err => console.err('Could Not Connect To MongoDB...', err));



const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network'],
        lowercase: true
    },
    author: String,
    tags: {
        type: Array,
        validate: {
            isAsync: true,
            validator: function(v){
               return new Promise(resolve => {
                setTimeout(() => {
                    const result = v && v.length > 0;
                    resolve(result);
                }, 1000);
               })
            },
            message: 'A Course Should Have At Least 1 Tag'
        }
    },
    date: Date,
    isPublished: Boolean,
    price: {
        type: Number,
        required: function() { return this.isPublished },
        min: 10,
        max: 200,
        get: v => Math.round(v),
        set: v => Math.round(v)
    }
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
    const course = new courses({
        name: 'The Shining of Java 3',
        isPublished: true,
        category: 'Web',
        author: 'Stephen King',
        tags: ['frontend'],
        price: 15.9
    });

    try{
        await course.validate();
        const result = await course.save();
        console.log(result);
    }catch(ex){
        for (field in ex.errors) console.log(ex.errors[field]);
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

async function findCourse (id) {
    const result = await courses.find({_id: id});
    console.log(result);
}



//solution(getPublishedBackend);

//solution(getPublished);

//solution(getPublishedByor15);

//updateCourse('5a68fdf95db93f6477053ddd');

//removeCourse('5a68fdf95db93f6477053ddd');

//createCourse();

findCourse('64dcf3fdd91bb33c8ddbdcb0');