import Notification from "../models/Notification.js"
import User from "../models/User.js"

export async function createNotification({
  userId,
  actorId,
  type,
  message,
  link = null,
}) {
  if (Number(userId) === Number(actorId)) {
    return null
  }

  return Notification.create({
    userId,
    actorId,
    type,
    message,
    link,
  })
}

export async function getNotificationsByUser(userId) {
  return Notification.findAll({
    where: {
      userId,
    },

    include: [
      {
        model: User,
        as: "Actor",
        attributes: ["id", "username"],
      },
    ],

    order: [["createdAt", "DESC"]],
  })
}

export async function getUnreadCount(userId) {
  return Notification.count({
    where: {
      userId,
      isRead: false,
    },
  })
}

export async function markAsRead(notificationId, userId) {
  const notification = await Notification.findOne({
    where: {
      id: notificationId,
      userId,
    },
  })

  if (!notification) {
    throw new Error("Notificación no encontrada")
  }

  notification.isRead = true

  await notification.save()

  return notification
}

export async function markAllAsRead(userId) {
  return Notification.update(
    {
      isRead: true,
    },
    {
      where: {
        userId,
        isRead: false,
      },
    }
  )
}