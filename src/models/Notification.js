import { DataTypes } from "sequelize"
import sequelize from "../config/db/db.js"

const Notification = sequelize.define(
  "Notification",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "user_id",
    },

    actorId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "actor_id",
    },

    type: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },

    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    link: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    isRead: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: "is_read",
    },
  },
  {
    tableName: "notifications",
    underscored: true,
    timestamps: true,
    updatedAt: false,
  }
)

export default Notification