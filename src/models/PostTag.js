import { DataTypes } from "sequelize"
import sequelize from "../config/db/db.js"

const PostTag = sequelize.define("PostTag", {
  postId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    field: "post_id",
  },
  tagId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    field: "tag_id",
  },
}, {
  tableName: "post_tags",
  timestamps: false,
})

export default PostTag