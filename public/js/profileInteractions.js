const followBtn = document.getElementById("followBtn");

if (followBtn) {
  followBtn.addEventListener("click", async () => {
    const userId = followBtn.dataset.userId

    const response = await fetch(`/followers/${userId}/toggle`, {
      method: "POST",
    })

    const data = await response.json()

    if (!data.success) {
      showToast({
        message: data.message || "No se pudo actualizar el seguimiento",
        type: "error",
      });
      return
    }

    const followersCount = document.getElementById("followersCount")

    followersCount.textContent = data.followersCount

    if (data.following) {
      followBtn.textContent = "Dejar de seguir"
      followBtn.classList.remove("btn-fotaza")
      followBtn.classList.add("btn-fotaza-outline")
    } else {
      followBtn.textContent = "Seguir"
      followBtn.classList.remove("btn-fotaza-outline")
      followBtn.classList.add("btn-fotaza")
    }
  })
}