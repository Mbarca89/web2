import { DataTypes } from "sequelize"
import sequelize from "../config/db/db.js"

const PostRating = sequelize.define("PostRating", {
  postId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "post_id",
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "user_id",
  },
  value: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
}, {
  tableName: "post_ratings",
  underscored: true,
  timestamps: true,
})

export default PostRating