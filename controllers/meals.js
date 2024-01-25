const Meal = require('../models/meal');

const getMeals = async (req, res, next) => {
    res.send("getMeals function called")
}

const addMeal = async (req, res, next) => {
    res.send("addMeal function called")
}

const getNewMealForm = async (req, res) => {
    res.send("getNewMealForm function called")
}

const editMeal = async (req, res, next) => {
    res.send("editMeal function called")
}

const updateMeal = async (req, res, next) => {
    res.send("updateMeal function called")
}

const deleteMeal = async (req, res, next) => {
    res.send("deleteMeal function called")
}

module.exports = {
    getMeals,
    addMeal,
    getNewMealForm,
    editMeal,
    updateMeal,
    deleteMeal
}