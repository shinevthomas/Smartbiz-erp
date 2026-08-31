import Settings from "../models/Settings.js";

// Get Settings
export const getSettings = async (req, res) => {
  try {
    const settings = await Settings.findOne();

    if (!settings) {
      return res.json({});
    }

    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Save Settings
export const saveSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();

    if (settings) {
      settings = await Settings.findByIdAndUpdate(
        settings._id,
        req.body,
        { new: true }
      );
    } else {
      settings = new Settings(req.body);
      await settings.save();
    }

    res.json({
      message: "Settings saved successfully",
      settings,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};