import { DataTypes } from "sequelize"
import sequelize from "../config/db/db.js"

const Follower = sequelize.define("Follower", {
  followerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "follower_id",
  },
  followingId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "following_id",
  },
}, {
  tableName: "followers",
  underscored: true,
  timestamps: true,
  updatedAt: false,
})

export default Follower