import sequelize from "../config/db/db.js"

const Conversation = sequelize.define(
  "Conversation",
  {},
  {
    tableName: "conversations",
    underscored: true,
    timestamps: true,
    updatedAt: false,
  }
)

export default Conversation