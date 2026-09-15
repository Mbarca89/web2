document.querySelectorAll(".interest-btn").forEach(button => {
  button.addEventListener("click", async () => {
    const postId = button.dataset.postId

    try {
      const response = await fetch(
        `/messages/interest/${postId}`,
        {
          method: "POST",
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message || "No se pudo iniciar la conversación"
        )
      }

      window.location.href =
        `/messages/${data.conversationId}`

    } catch (error) {
      showToast({
        message: error.message,
        type: "error",
      })
    }
  })
})