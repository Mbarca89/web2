import Follower from "../models/Follower.js"
import { toggleFollow } from "../services/followerService.js"

export async function toggleFollowController(req, res) {
    console.log("REQ USER:", req.user);
console.log("PARAMS:", req.params);
  try {
    const { userId } = req.params;

    const result = await toggleFollow({
      followerId: req.user.id,
      followingId: userId,
    })

    const followersCount = await Follower.count({
      where: {
        followingId: userId,
      },
    })

    return res.json({
      success: true,
      following: result.following,
      followersCount,
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}