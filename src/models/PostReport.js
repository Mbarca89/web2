import { DataTypes } from "sequelize";
import sequelize from "../config/db/db.js";

const PostReport = sequelize.define("PostReport", {
  postId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "post_id",
  },
  reporterId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "reporter_id",
  },
  reason: {
    type: DataTypes.STRING(80),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
}, {
  tableName: "post_reports",
  underscored: true,
  timestamps: true,
  updatedAt: false,
});

export default PostReport;