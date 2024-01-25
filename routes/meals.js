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

//GET /jobs (display all the job listings belonging to this user)
//POST /jobs (Add a new job listing)
router.route("/meals")
    .get(getMeals)
    .post(addMeal);

//GET /jobs/new (Put up the form to create a new entry)
router.route("/meals/new").get(getNewMealForm);

//GET /jobs/edit/:id (Get a particular entry and show it in the edit box)
router.route("/edit/:id").get(editMeal);

//POST /jobs/update/:id (Update a particular entry)
router.route("/update/:id").post(updateMeal);

//POST /jobs/delete/:id (Delete an entry)
router.route("/delete/:id").post(deleteMeal);

module.exports = router;
