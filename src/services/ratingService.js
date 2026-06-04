import PostRating from "../models/PostRating.js"
import Post from "../models/Post.js"

export async function ratePost({ postId, userId, value }) {

    const existingRating = await PostRating.findOne({
        where: { postId, userId },
    })

    if (existingRating) {
        throw new Error("Ya valoraste esta publicación")
    }

    const post = await Post.findByPk(postId)

    if (post.user_id === userId || post.userId === userId) {
        throw new Error("No podés valorar tu propia publicación")
    }

    const ratingValue = Number(value)

    if (!ratingValue || ratingValue < 1 || ratingValue > 5) {
        throw new Error("La valoración debe estar entre 1 y 5")
    }

    const [rating] = await PostRating.findOrCreate({
        where: { postId, userId },
        defaults: { value: ratingValue },
    })

    if (rating.value !== ratingValue) {
        rating.value = ratingValue
        await rating.save()
    }

    const ratings = await PostRating.findAll({
        where: { postId },
    })

    const ratingAvg =
        ratings.reduce((acc, item) => acc + item.value, 0) / ratings.length

    return {
        ratingAvg: Number(ratingAvg.toFixed(1)),
        ratingsCount: ratings.length,
        userRating: ratingValue,
    }
}