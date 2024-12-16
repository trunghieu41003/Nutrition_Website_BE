const foodmodel = require('../models/food.model');
const mealmodel = require('../models/meal.model');
const usermodel = require('../models/user.model');

const addFood = async (req, res) => {
    const {nameFood, fat, carbs, calories, protein, servingSize } = req.body;
    try {
        const newFood = ({
            nameFood, fat, carbs, calories, protein, servingSize
          });
        const success = await foodmodel.addFood(newFood);
        if(success) return res.status(200).json({ message: "Insert food thanh cong"});
        return res.status(500).json({ error: error.message });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
const updateFood = async (req, res) => {
    const {foodId, nameFood, fat, carbs, calories, protein, servingSize } = req.body;
    try {
        const newFood = ({
            foodId, nameFood, fat, carbs, calories, protein, servingSize
          });
        const success = await foodmodel.updateFood(newFood);
        if(success) return res.status(200).json({ message: "Update food thanh cong"});
        return res.status(500).json({ error: error.message });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
const deleteFood = async (req, res) => {
    const {foodId} = req.body;
    try {
        const success = await foodmodel.deleteFood(foodId);
        if(success) return res.status(200).json({ message: "Delete food thanh cong"});
        return res.status(500).json({ error: error.message });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
const findFoodByNameContaining = async (req, res) => {
    const {string} = req.body;
    try {
        const listResult = await foodmodel.findFoodByNameContaining(string);
        if(listResult) return res.status(200).json(listResult);
        return res.status(500).json({ error: error.message });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
const findAllMeal = async (req, res) => {
    try {
        const listResult = await mealmodel.findAllMeal();
        if(listResult) return res.status(200).json(listResult);
        return res.status(500).json({ error: error.message });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
const addMeal = async (req, res) => {
    const {name} = req.body;
    try {
        const newMeal = ({
            name
          });
        const success = await mealmodel.addMeal(newMeal);
        if(success) return res.status(200).json({ message: "Insert meal thanh cong"});
        return res.status(500).json({ error: error.message });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
const updateMeal = async (req, res) => {
    const {id,name} = req.body;
    try {
        const newMeal = ({
            id, name
          });
        const success = await mealmodel.updateMeal(newMeal);
        if(success) return res.status(200).json({ message: "Update meal thanh cong"});
        return res.status(500).json({ error: error.message });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
const deleteMeal = async (req, res) => {
    const {id} = req.body;
    try {
        const success = await mealmodel.deleteMeal(id);
        if(success) return res.status(200).json({ message: "Delete meal thanh cong"});
        return res.status(500).json({ error: error.message });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
const findMealByNameContaining = async (req, res) => {
    const {string} = req.body;
    try {
        const listResult = await mealmodel.findMealByNameContaining(string);
        if(listResult) return res.status(200).json(listResult);
        return res.status(500).json({ error: error.message });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
const findAllUser = async (req, res) => {
    try {
        const listResult = await usermodel.findAllUser();
        if(listResult) return res.status(200).json(listResult);
        return res.status(500).json({ error: error.message });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
const deleteUser = async (req, res) => {
    try {
        const listResult = await usermodel.deleteUser();
        if(listResult) return res.status(200).json("Delete user thanh cong");
        return res.status(500).json({ error: error.message });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
const findUserContaining = async (req, res) => {
    const {string} = req.body;
    try {
        const listResult = await usermodel.findUserContaining(string);
        if(listResult) return res.status(200).json(listResult);
        return res.status(500).json({ error: error.message });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
module.exports = {
    addFood,
    updateFood,
    deleteFood,
    findFoodByNameContaining,
    findAllMeal,
    addMeal,
    updateMeal,
    deleteMeal,
    findMealByNameContaining,
    findAllUser,
    deleteUser,
    findUserContaining
};