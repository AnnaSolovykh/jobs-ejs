
const mongoose = require('mongoose');

const MealSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: [true, 'name must be provided'],
        trim: true,
        maxlength: [40, 'the name of the meal should not be longer than 40 characters']
    },
    type: {
        type: String,
        enum: [
            'breakfast',
            'snack',
            'lunch',
            'dinner',
        ],
        required: [true, 'type of the meal must be provided'],
    },
    isFavorite: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide a user']
    }
    }, 
    { timestamps: true }
);

module.exports = mongoose.model('Meal', MealSchema);