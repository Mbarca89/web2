import User from "./User.js"
import Post from "./Post.js"
import PostImage from "./PostImage.js"
import Tag from "./Tag.js"
import PostTag from "./PostTag.js"

User.hasMany(Post, {
  foreignKey: "user_id",
})

Post.belongsTo(User, {
  foreignKey: "user_id",
})

Post.hasMany(PostImage, {
  foreignKey: "post_id",
})

PostImage.belongsTo(Post, {
  foreignKey: "post_id",
})

Post.belongsToMany(Tag, {
  through: PostTag,
  foreignKey: "post_id",
  otherKey: "tag_id",
})

Tag.belongsToMany(Post, {
  through: PostTag,
  foreignKey: "tag_id",
  otherKey: "post_id",
})