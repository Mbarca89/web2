import Follower from "../models/Follower.js"

export async function toggleFollow({ followerId, followingId }) {
    console.log("TOGGLE FOLLOW - followerId:", followerId, "followingId:", followingId);
    if (Number(followerId) === Number(followingId)) {
        throw new Error("No podes seguirte a vos mismo")
    }

    const existingFollow = await Follower.findOne({
        where: {
            followerId,
            followingId,
        },
    })

    if (existingFollow) {
        await existingFollow.destroy();

        return {
            following: false,
        }
    }

    await Follower.create({
        followerId,
        followingId,
    })

    return {
        following: true,
    }
}