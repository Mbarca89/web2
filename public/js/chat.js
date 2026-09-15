const chatMessages = document.getElementById("chatMessages")
const messageForm = document.getElementById("messageForm")
const messageInput = document.getElementById("messageInput")

const conversationId = chatMessages.dataset.conversationId
const currentUserId = Number(chatMessages.dataset.currentUserId)

let lastRenderedContent = null


async function loadMessages() {
  try {
    const response = await fetch(
      `/messages/${conversationId}/messages`
    )

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message)
    }

    const serialized = JSON.stringify(data.messages)

    if (serialized === lastRenderedContent) {
      return
    }

    lastRenderedContent = serialized

    chatMessages.innerHTML = ""

    data.messages.forEach(message => {
      const mine =
        Number(message.senderId) === currentUserId

      const wrapper = document.createElement("div")

      wrapper.className =
        `d-flex mb-3 ${
          mine ? "justify-content-end" : "justify-content-start"
        }`

      const bubble = document.createElement("div")

      bubble.className =
        mine
          ? "bg-dark text-white rounded-4 px-3 py-2"
          : "bg-light rounded-4 px-3 py-2"

      bubble.style.maxWidth = "75%"

      const content = document.createElement("div")
      content.textContent = message.content

      const date = document.createElement("small")
      date.className =
        mine
          ? "d-block text-white-50 mt-1"
          : "d-block text-muted mt-1"

      date.textContent =
        new Date(message.createdAt)
          .toLocaleTimeString("es-AR", {
            hour: "2-digit",
            minute: "2-digit",
          })

      bubble.appendChild(content)
      bubble.appendChild(date)

      wrapper.appendChild(bubble)
      chatMessages.appendChild(wrapper)
    })

    chatMessages.scrollTop =
      chatMessages.scrollHeight

  } catch (error) {
    console.error(
      "Error al cargar mensajes:",
      error
    )
  }
}


messageForm.addEventListener("submit", async event => {
  event.preventDefault()

  const content = messageInput.value.trim()

  if (!content) {
    return
  }

  try {
    const response = await fetch(
      `/messages/${conversationId}/messages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content,
        }),
      }
    )

    const data = await response.json()

    if (!response.ok) {
      throw new Error(
        data.message || "No se pudo enviar el mensaje"
      )
    }

    messageInput.value = ""

    await loadMessages()

  } catch (error) {
    showToast({
      message: error.message,
      type: "error",
    })
  }
})

loadMessages()

setInterval(loadMessages, 3000)