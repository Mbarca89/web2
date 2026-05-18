export function validateLogin({ username, password }) {
  const errors = {}

  if (!username?.trim()) {
    errors.username = "El usuario es obligatorio"
  }

  if (!password) {
    errors.password = "La contraseña es obligatoria"
  }

  return errors
}