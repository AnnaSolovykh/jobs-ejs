const Meal = require("../models/meal");
const handleErrors = require("../utils/parseErrors");

// GET all meals for the current user
const getMeals = async (req, res, next) => {
    try {
        const meals = await Meal.find({ createdBy: req.user._id });
        res.render('meals', { meals });
    } catch (error) {
        handleErrors(error, req, res);
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
        handleErrors(error, req, res);
    }
};

// GET the form for adding a new meal
const getNewMealForm = async (req, res) => {
    try {
        res.render('newMealForm', {}); 
    } catch (error) {
        handleErrors(error, req, res);
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
        handleErrors(error, req, res); 
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
        handleErrors(error, req, res, '/meals/edit/' + req.params.id);
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
        handleErrors(error, req, res); 
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