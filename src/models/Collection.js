import { DataTypes } from "sequelize"
import sequelize from "../config/db/db.js"

const Collection = sequelize.define(
  "Collection",
  {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    tableName: "collections",
    underscored: true,
    timestamps: true,
    updatedAt: false,
  }
)

export default Collection