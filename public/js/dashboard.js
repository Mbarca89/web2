document.querySelectorAll(".toggle-comments-btn").forEach((button) => {
  button.addEventListener("click", async () => {
    const postId = button.dataset.postId

    try {
      const response = await fetch(`/posts/${postId}/comments/toggle`, {
        method: "POST",
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "No se pudieron modificar los comentarios")
      }

      const icon = button.querySelector("i")
      const text = button.querySelector("span")

      if (data.commentsEnabled) {
        text.textContent = "Deshabilitar comentarios"
      } else {
        text.textContent = "Habilitar comentarios"
      }

      button.dataset.enabled = data.commentsEnabled

      showToast({
        message: data.message,
        type: "success",
      })

    } catch (error) {
      showToast({
        message: error.message,
        type: "error",
      })
    }
  })
})