import Notification from "../models/Notification.js";

// =============================
// GET ALL NOTIFICATIONS
// =============================
export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({
      createdAt: -1,
    });

    res.json(notifications);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// =============================
// CREATE NOTIFICATION
// =============================
export const createNotification = async (req, res) => {

  try {

    const notification = await Notification.create({
      message: req.body.message,
      type: req.body.type || "info",
      read: false,
    });

    res.status(201).json(notification);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

// =============================
// MARK ONE AS READ
// =============================
export const markAsRead = async (req, res) => {

  try {

    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      {
        read: true,
      },
      {
        new: true,
      }
    );

    res.json(notification);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

// =============================
// MARK ALL AS READ
// =============================
export const markAllAsRead = async (req, res) => {

  try {

    await Notification.updateMany(
      {},
      {
        read: true,
      }
    );

    res.json({
      message: "All notifications marked as read",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

// =============================
// DELETE NOTIFICATION
// =============================
export const deleteNotification = async (req, res) => {

  try {

    await Notification.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Notification deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};