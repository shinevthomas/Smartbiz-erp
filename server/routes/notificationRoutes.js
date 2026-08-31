import express from "express";

import {
  getNotifications,
  createNotification,
  markAsRead,
  markAllAsRead,
  deleteNotification,
} from "../controllers/notificationController.js";

const router = express.Router();

// GET all notifications
router.get("/", getNotifications);

// CREATE notification
router.post("/", createNotification);

// MARK ALL notifications as read
router.put("/read-all", markAllAsRead);

// MARK ONE notification as read
router.put("/:id/read", markAsRead);

// DELETE notification
router.delete("/:id", deleteNotification);

export default router;