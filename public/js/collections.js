const collectionModal = document.getElementById("collectionModal")
const collectionPostId = document.getElementById("collectionPostId")
const collectionSelect = document.getElementById("collectionSelect")
const newCollectionName = document.getElementById("newCollectionName")
const createCollectionBtn = document.getElementById("createCollectionBtn")
const saveToCollectionBtn = document.getElementById("saveToCollectionBtn")


async function loadCollections(selectedId = null) {
    try {
        const response = await fetch("/collections/list")
        const data = await response.json()

        if (!response.ok) {
            throw new Error(
                data.message || "No se pudieron cargar las colecciones"
            )
        }

        collectionSelect.innerHTML =
            '<option value="">Seleccioná una colección</option>'

        data.collections.forEach((collection) => {
            const option = document.createElement("option")

            option.value = collection.id
            option.textContent = collection.name

            if (String(collection.id) === String(selectedId)) {
                option.selected = true
            }

            collectionSelect.appendChild(option)
        })
    } catch (error) {
        showToast({
            message: error.message,
            type: "error",
        })
    }
}


document.querySelectorAll(".save-post-btn").forEach((button) => {
    button.addEventListener("click", async () => {
        if (!collectionPostId || !newCollectionName) return

        collectionPostId.value = button.dataset.postId
        newCollectionName.value = ""

        await loadCollections()
    })
})


if (createCollectionBtn) {
    createCollectionBtn.addEventListener("click", async () => {
        const name = newCollectionName.value.trim()

        if (!name) {
            showToast({
                message: "Ingresá un nombre para la colección",
                type: "error",
            })

            return
        }

        try {
            const response = await fetch("/collections", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(
                    data.message || "No se pudo crear la colección"
                )
            }

            newCollectionName.value = ""

            await loadCollections(data.collection.id)

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
}

if (saveToCollectionBtn) {
    saveToCollectionBtn.addEventListener("click", async () => {
        const collectionId = collectionSelect.value
        const postId = collectionPostId.value

        if (!collectionId) {
            showToast({
                message: "Seleccioná una colección",
                type: "error",
            })

            return
        }

        try {
            const response = await fetch(
                `/collections/${collectionId}/posts/${postId}`,
                {
                    method: "POST",
                }
            )

            const data = await response.json()

            if (!response.ok) {
                throw new Error(
                    data.message || "No se pudo guardar la publicación"
                )
            }

            showToast({
                message: data.message,
                type: "success",
            })

            const modal = bootstrap.Modal.getInstance(collectionModal)

            if (modal) {
                modal.hide()
            }
        } catch (error) {
            showToast({
                message: error.message,
                type: "error",
            })
        }
    })
}

document
    .querySelectorAll(".remove-from-collection-btn")
    .forEach((button) => {
        button.addEventListener("click", async () => {
            const collectionId = button.dataset.collectionId
            const postId = button.dataset.postId

            try {
                const response = await fetch(
                    `/collections/${collectionId}/posts/${postId}`,
                    {
                        method: "DELETE",
                    }
                )

                const data = await response.json()

                if (!response.ok) {
                    throw new Error(
                        data.message || "No se pudo quitar la publicación"
                    )
                }

                showToast({
                    message: data.message,
                    type: "success",
                })
                const card = button.closest(".col-12")

                if (card) {
                    card.remove()
                }
            } catch (error) {
                showToast({
                    message: error.message,
                    type: "error",
                })
            }
        })
    })