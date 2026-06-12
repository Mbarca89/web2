//LIKE
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

//RATING
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

//COMMENTS
document.querySelectorAll(".comment-form").forEach((form) => {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const postId = form.dataset.postId;
    const input = form.querySelector("input[name='content']");
    const content = input.value.trim();

    if (!content) {
      showToast({
        message: "El comentario no puede estar vacío",
        type: "error",
      });
      return;
    }

    const response = await fetch(`/comments/${postId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    });

    const data = await response.json();

    if (!data.success) {
      showToast({
        message: data.message || "No se pudo crear el comentario",
        type: "error",
      });
      return;
    }

    const postCard = form.closest(".post-card");

    let commentsSection = postCard.querySelector(".comments-section");

    if (!commentsSection) {
      commentsSection = document.createElement("div");
      commentsSection.className = "mt-3 border-top pt-3 comments-section";

      const commentsList = document.createElement("div");
      commentsList.className = "comments-list border rounded-3 p-2 mb-3";

      commentsSection.appendChild(commentsList);

      form.parentNode.insertBefore(commentsSection, form);
    }

    const commentsList = commentsSection.querySelector(".comments-list");

    const commentElement = document.createElement("div");
    commentElement.className = "mb-2";
    commentElement.innerHTML = `
      <strong>${data.comment.username}</strong>
      <span class="ms-2 text-muted">${data.comment.content}</span>
    `;

    commentsList.appendChild(commentElement);

    input.value = "";

    showToast({
      message: "Comentario agregado",
      type: "success",
    });
  });
});

//REPORT
const reportModal = document.getElementById("reportModal")
const reportPostId = document.getElementById("reportPostId")
const submitReportBtn = document.getElementById("submitReportBtn")

if (reportModal && reportPostId && submitReportBtn) {
  reportModal.addEventListener("show.bs.modal", (event) => {
    const button = event.relatedTarget
    reportPostId.value = button.dataset.postId
  })

  submitReportBtn.addEventListener("click", async () => {
    const postId = reportPostId.value
    const reason = document.getElementById("reportReason").value
    const description = document.getElementById("reportDescription").value

    const response = await fetch(`/reports/${postId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ reason, description }),
    })

    const data = await response.json();

    if (!data.success) {
      showToast({
        message: data.message || "No se pudo registrar la denuncia",
        type: "error",
      })
      return
    }

    showToast({
      message: "Denuncia registrada correctamente",
      type: "success",
    });

    const modalInstance = bootstrap.Modal.getInstance(reportModal)
    modalInstance.hide()

    document.getElementById("reportDescription").value = ""
  })
}