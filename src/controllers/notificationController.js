import {
    getNotificationsByUser,
    getUnreadCount,
    markAsRead,
    markAllAsRead,
} from "../services/notificationService.js"

export async function showNotifications(req, res) {
    try {
        const notifications = await getNotificationsByUser(req.user.id)

        res.render("notifications", { notifications, })
    } catch (error) {
        console.error(error)

        res.redirect("/feed")
    }
}

export async function unreadCount(req, res) {
    try {
        const count = await getUnreadCount(req.user.id)

        res.json({
            count,
        })
    } catch (error) {
        console.error(error)

        res.status(500).json({
            error: "Error al obtener notificaciones",
        })
    }
}

export async function readNotification(req, res) {
    try {
        await markAsRead(req.params.id, req.user.id)

        res.json({
            success: true,
        })
    } catch (error) {
        console.error(error)

        res.status(404).json({
            error: error.message,
        })
    }
}

export async function readAllNotifications(req, res) {
    try {
        await markAllAsRead(req.user.id)

        res.json({
            success: true,
        })
    } catch (error) {
        console.error(error)

        res.status(500).json({
            error: "Error al actualizar notificaciones",
        })
    }
}