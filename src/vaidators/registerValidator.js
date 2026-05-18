export function validateRegister({ username, email, password, confirmPassword }) {
  const errors = {}

  if (!username?.trim()) {
    errors.username = "El usuario es obligatorio"
  }

  if (!email?.trim()) {
    errors.email = "El email es obligatorio"
  }

  if (!password) {
    errors.password = "La contraseña es obligatoria"
  } else if (password.length < 6) {
    errors.password = "La contraseña debe tener al menos 6 caracteres"
  }

  if (!confirmPassword) {
    errors.confirmPassword = "Tenés que confirmar la contraseña"
  } else if (password && password !== confirmPassword) {
    errors.confirmPassword = "Las contraseñas no coinciden"
  }

  return errors
}