import { DataTypes } from "sequelize"
import sequelize from "../config/db/db.js"

const PostImage = sequelize.define("PostImage", {
  imageData: {
    type: DataTypes.TEXT,
    allowNull: false,
    field: "image_data",
  },
  watermarkUrl: {
    type: DataTypes.STRING(255),
    field: "watermark_url",
  },
  licenseType: {
    type: DataTypes.STRING(20),
    allowNull: false,
    field: "license_type",
  },
  watermarkText: {
    type: DataTypes.STRING(120),
    field: "watermark_text",
  },
  isForSale: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: "is_for_sale",
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
  },
}, {
  tableName: "post_images",
  underscored: true,
  timestamps: true,
  updatedAt: false,
})

export default PostImage