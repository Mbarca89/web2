import { DataTypes } from "sequelize"
import sequelize from "../config/db/db.js"

const Post = sequelize.define("Post", {
  title: {
    type: DataTypes.STRING(120),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  commentsEnabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: "comments_enabled",
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: "is_active",
  },
}, {
  tableName: "posts",
  underscored: true,
  timestamps: true,
})

export default Post