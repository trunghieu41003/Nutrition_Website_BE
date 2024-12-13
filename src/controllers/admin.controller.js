const foodmodel = require('../models/food.model');

const addFood = async (req, res) => {
    const {nameFood, fat, carbs, calories, protein, servingSize } = req.body;
    try {
        const newFood = ({
            nameFood, fat, carbs, calories, protein, servingSize
          });
        const success = await foodmodel.addFood(newFood);
        if(success) return res.status(200).json({ message: "Insert food thanh cong"});
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
module.exports = {
    addFood
};