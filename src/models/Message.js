import { DataTypes } from "sequelize"
import sequelize from "../config/db/db.js"

const Message = sequelize.define(
  "Message",
  {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "messages",
    underscored: true,
    timestamps: true,
    updatedAt: false,
  }
)

export default Message