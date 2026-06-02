import { DataTypes } from "sequelize"
import sequelize from "../config/db/db.js"

const PostLike = sequelize.define("PostLike", {
  postId: {
    type: DataTypes.INTEGER,
    field: "post_id",
  },
  userId: {
    type: DataTypes.INTEGER,
    field: "user_id",
  },
}, {
  tableName: "post_likes",
  timestamps: true,
  updatedAt: false,
  underscored: true,
})

export default PostLike