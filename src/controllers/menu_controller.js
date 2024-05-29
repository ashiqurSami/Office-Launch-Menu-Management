const Menu = require("../models/Menu");

exports.addMenu = async (req, res) => {
  const { date, options } = req.body;
  try {
    const menu = new Menu({ date, options });
    await menu.save();
    res.status(201).json({ message: "Menu added successfully" });
  } catch (err) {
    res.status(500).json({ message: err.toString() });
  }
};

exports.getMenu = async (req, res) => {
  try {
    const date = req.params;
    const newDate = new Date(date.date);
    const menu = await Menu.findOne({ date: newDate });
    res.status(201).json({ menu, message: "Menu added successfully" });
  } catch (err) {
    res.status(500).json({ message: err.toString() });
  }
};

exports.addOrUpdateSelection = async (req, res) => {
  try {
    const { date, option } = req.body;
    const userId = req.user;
    const menu = await Menu.findOne({ date });

    if (!menu) {
      res.status(500).json({ message: "Menu not found" });
    }

    const userSelectionIndex = menu.choices.findIndex(
      (choice) => choice.userId.toString() === userId.toString()
    );

    if (userSelectionIndex !== -1) {
      // Update existing choice
      menu.choices[userSelectionIndex].option = option;
    } else {
      // Add new choice
      menu.choices.push({ userId, option });
    }

    await menu.save();
    res.status(201).json({ message: "Selection added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllMenuSelections = async (req, res) => {
  try {
    const menus = await Menu.find().populate("choices.userId", "name email");
    res.status(201).json(menus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
