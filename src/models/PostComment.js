import { DataTypes } from "sequelize"
import sequelize from "../config/db/db.js"

const PostComment = sequelize.define("PostComment", {
  postId: {
    type: DataTypes.INTEGER,
    field: "post_id",
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    field: "user_id",
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: "post_comments",
  underscored: true,
  timestamps: true,
  updatedAt: false,
})

export default PostComment