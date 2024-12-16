const foodmodel = require('../models/food.model');

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
module.exports = {
    addFood,
    updateFood,
    deleteFood,
    findFoodByNameContaining
};