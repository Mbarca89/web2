async function updateNotificationBadge() {
    try {
        const response = await fetch("/notifications/unread-count")

        if (!response.ok) {
            return
        }

        const data = await response.json()

        const badge = document.getElementById("notificationBadge")

        if (!badge) {
            return
        }

        if (data.count > 0) {
            badge.textContent = data.count
            badge.classList.remove("d-none")
        } else {
            badge.classList.add("d-none")
        }
    } catch (error) {
        console.error("Error al consultar notificaciones:", error)
    }
}

updateNotificationBadge()

setInterval(updateNotificationBadge, 15000)

document.querySelectorAll(".notification-item").forEach((item) => {
    item.addEventListener("click", async () => {
        const id = item.dataset.id

        try {
            await fetch(`/notifications/${id}/read`, {
                method: "POST",
            })
        } catch (error) {
            console.error("Error al marcar notificación:", error)
        }
    })
})

const markAllButton = document.getElementById("markAllRead")

if (markAllButton) {
    markAllButton.addEventListener("click", async () => {
        try {
            const response = await fetch("/notifications/read-all", {
                method: "POST",
            })

            if (!response.ok) {
                return
            }

            document.querySelectorAll(".notification-item").forEach((item) => {
                item.classList.remove("fw-semibold", "bg-light")
            })

            const badge = document.getElementById("notificationBadge")

            if (badge) {
                badge.classList.add("d-none")
            }
        } catch (error) {
            console.error("Error al marcar notificaciones:", error)
        }
    })
}