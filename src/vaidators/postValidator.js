export function validateCreatePost({
    title,
    files,
    licenseType,
    isForSale,
    price,
}) {
    const errors = {};

    if (!title?.trim()) {
        errors.title = "El titulo es obligatorio"
    }

    if (!files || files.length === 0) {
        errors.images = "Debes subir al menos una imagen"
    }

    if (files && files.length > 5) {
        errors.images = "Podes subir hasta 5 imagenes"
    }

    if (
        licenseType &&
        !["FREE", "COPYRIGHT"].includes(licenseType)
    ) {
        errors.licenseType = "Licencia invalida"
    }

    if (isForSale === "on") {
        if (!price) {
            errors.price = "Debes indicar un precio"
        } else if (Number(price) <= 0) {
            errors.price = "El precio debe ser mayor a cero"
        }
    }

    return errors
}