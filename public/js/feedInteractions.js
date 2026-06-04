document.querySelectorAll(".like-btn").forEach((button) => {
  button.addEventListener("click", async () => {
    const postId = button.dataset.postId

    const response = await fetch(`/likes/${postId}/toggle`, {
      method: "POST",
    })

    const data = await response.json();

    if (!data.success) {
      showToast({
        message: data.message || "No se pudo actualizar el like",
        type: "error",
      })
      return
    }

    const icon = button.querySelector("i")
    const postActions = button.closest(".post-actions")
    const count = postActions.querySelector(".like-count")

    count.textContent = data.likesCount;

    icon.className = data.liked
      ? "bi bi-heart-fill text-danger fs-4"
      : "bi bi-heart text-dark fs-4"
  })
})

const ratingModal = document.getElementById("ratingModal")
const ratingPostId = document.getElementById("ratingPostId")
const submitRatingBtn = document.getElementById("submitRatingBtn")

if (ratingModal && ratingPostId && submitRatingBtn) {
  ratingModal.addEventListener("show.bs.modal", (event) => {
    const button = event.relatedTarget
    ratingPostId.value = button.dataset.postId
  })

  submitRatingBtn.addEventListener("click", async () => {
    const postId = ratingPostId.value
    const value = document.getElementById("ratingValue").value;

    const response = await fetch(`/ratings/${postId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ value }),
    })

    const data = await response.json();

    if (!data.success) {
      showToast({
        message: data.message || "No se pudo guardar la valoración",
        type: "error",
      })
      return
    }

    showToast({
      message: "Valoración guardada",
      type: "success",
    });

    setTimeout(() => {
      window.location.reload()
    }, 700)
  });
}