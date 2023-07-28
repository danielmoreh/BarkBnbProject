const mongoose = require('mongoose');

const dogSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A nameless dog'],
        trim: true,
        maxlength: [30 , 'The name is too long'],
    },
    fromDate: {
        type: Date,
        required: [true, 'You must enter a start date'],
    },
    dogBreed: {
        type: String,
        trim: true,
    },
    address: {
        type: String,
        trim: true,
    },
    duration: {
        type: String,
        required: [true, 'You must enter a duration'],
    },
    revenue: {
        type: Number,
        required: [true, 'You must enter a revenue'],
    },
    notes : {
        type: String,
        trim: true,
    },
});

const Dog = mongoose.model('dog', dogSchema);
module.exports = Dog;