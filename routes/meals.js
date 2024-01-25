const express = require("express");
const router = express.Router();

const {
    getMeals,
    addMeal,
    getNewMealForm,
    editMeal,
    updateMeal,
    deleteMeal
} = require("../controllers/meals");

//GET display all the meal listings belonging to this user
//POST add a new meal listing
router.route("/meals")
    .get(getMeals)
    .post(addMeal);

//GET put up the form to create a new entry
router.route("/meals/new").get(getNewMealForm);

//GET get a particular entry and show it in the edit box
router.route("/meals/edit/:id").get(editMeal);

//POST update a particular entry
router.route("/meals/update/:id").post(updateMeal);

//POST delete an entry
router.route("/meals/delete/:id").post(deleteMeal);

module.exports = router;
