import Inventory from "../models/inventory.model.js";

export const getInventory = async (req, res) => {
    try {
        const data = await Inventory.find(); 
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const addInventoryItem = async (req, res) => {
    try {
        const newItem = new Inventory(req.body); 
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};