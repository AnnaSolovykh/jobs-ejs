const Meal = require("../models/meal");
const parseValidationErrors = require("../utils/parseValidationErrs");

// GET all meals for the current user
const getMeals = async (req, res, next) => {
    try {
        const meals = await Meal.find({ createdBy: req.user._id });
        res.render('meals', { meals });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = parseValidationErrors(error);
            req.flash('error', errors);
        } else {
            res.status(500);
            req.flash('error', 'An internal server error occurred.');
        }
    }
};

// POST a new meal
const addMeal = async (req, res, next) => {
    // Convert 'isFavorite' from 'on'/'undefined' to true/false
    req.body.isFavorite = req.body.isFavorite === 'on';
    try {
        const newMeal = await Meal.create({ ...req.body, createdBy: req.user._id });
        res.redirect('/meals'); 
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = parseValidationErrors(error);
            req.flash('error', errors);
        } else {
            res.status(500);
            req.flash('error', 'An internal server error occurred.');
            res.redirect('/meals');
        }
    }
};

// GET the form for adding a new meal
const getNewMealForm = async (req, res) => {
    try {
        res.render('newMealForm', {}); 
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = parseValidationErrors(error);
            req.flash('error', errors);
            res.redirect('/meals');
        } else {
            res.status(500);
            req.flash('error', 'An internal server error occurred.');
            res.redirect('/meals');
        }
    }
};


// GET a specific meal for editing
const editMeal = async (req, res, next) => {
    try {
        const meal = await Meal.findOne({ _id: req.params.id, createdBy: req.user._id });
        if (!meal) {
            res.status(404);
            req.flash('error', 'Meal not found');
            return;
        }
        res.render('meal', { meal }); 
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = parseValidationErrors(error);
            req.flash('error', errors);
            res.redirect('/meals');
        } else {
            res.status(500);
            req.flash('error', 'An internal server error occurred.');
            res.redirect('/meals');
        }
    }
};

// POST an updated meal
const updateMeal = async (req, res, next) => {
    // Convert 'isFavorite' from 'on'/'undefined' to true/false
    req.body.isFavorite = req.body.isFavorite === 'on';
    try {
        const updatedMeal = await Meal.findOneAndUpdate(
            { _id: req.params.id, createdBy: req.user._id },
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedMeal) {
            res.status(404);
            req.flash('error', 'Meal not found');
            return;
        }
        res.redirect('/meals');
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = parseValidationErrors(error);
            req.flash('error', errors);
            res.redirect('/meals/edit/' + req.params.id);
        } else {
            res.status(500);
            req.flash('error', 'An internal server error occurred.');
        }
    }
};

// POST to delete a meal
const deleteMeal = async (req, res, next) => {
    try {
        const deletedMeal = await Meal.findOneAndDelete({ _id: req.params.id, createdBy: req.user._id });
        if (!deletedMeal) {
            res.status(404);
            req.flash('error', 'Meal not found');
            return res.redirect('/meals'); 
        }
        req.flash('success', 'Meal was deleted');
        res.redirect('/meals');
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = parseValidationErrors(error);
            req.flash('error', errors);
            res.redirect('/meals/edit/' + req.params.id);
        } else {
            res.status(500);
            req.flash('error', 'An internal server error occurred.');
            return res.redirect('/meals');
        }
    }
};

module.exports = {
    getMeals,
    addMeal,
    getNewMealForm,
    editMeal,
    updateMeal,
    deleteMeal
}