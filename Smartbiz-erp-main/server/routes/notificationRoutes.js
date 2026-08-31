import express from "express";

import {
  getNotifications,
  createNotification,
  markAsRead,
  markAllAsRead,
  deleteNotification,
} from "../controllers/notificationController.js";

const router = express.Router();

// Get all notifications
router.get("/", getNotifications);

// Create notification
router.post("/", createNotification);

// Mark notification as read
router.put("/:id/read", markAsRead);

// Mark all notifications as read
router.put("/read-all", markAllAsRead);

// Delete notification
router.delete("/:id", deleteNotification);

export default router;