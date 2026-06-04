window.showToast = ({
  message,
  type = "success",
  duration = 3000,
}) => {
  const background =
    type === "error"
      ? "#dc3545"
      : "#198754"

  Toastify({
    text: message,
    duration,
    gravity: "top",
    position: "center",
    style: {
      background,
    },
  }).showToast()
}